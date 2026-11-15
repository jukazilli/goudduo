import { test, expect, type Page } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
async function ready(page: Page) {
  await expect.poll(()=>page.evaluate(async()=>Boolean((await navigator.serviceWorker.getRegistration('/'))?.active))).toBe(true);
  await expect.poll(()=>page.evaluate(()=>Boolean(navigator.serviceWorker.controller))).toBe(true);
}
test('PWA manifest, official raster sizes, MIME, scope and static-only inventory',async({page,request})=>{
  await page.goto('/'); await ready(page);
  const response=await request.get('/manifest.webmanifest');expect(response.headers()['content-type']).toContain('application/manifest+json');
  const manifest=await response.json();expect(manifest).toMatchObject({name:'goudduo',short_name:'goudduo',lang:'pt-BR',scope:'/',start_url:'/home/treinos',display:'standalone',theme_color:'#FFFFFF'});
  expect(manifest.icons).toHaveLength(4);
  for(const icon of [...manifest.icons,{src:'/pwa/apple-touch-icon.png',sizes:'180x180'}]){
    const asset=await request.get(icon.src);expect(asset.status()).toBe(200);expect(asset.headers()['content-type']).toContain('image/png');
    const bytes=await asset.body();expect(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`).toBe(icon.sizes);
  }
  expect((await request.get('/sw.js')).headers()['content-type']).toContain('javascript');
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('crossorigin','use-credentials');
  await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute('content','yes');
  const data=await page.evaluate(async()=>{
    const registration=await navigator.serviceWorker.getRegistration('/');
    const names=await caches.keys(),cache=await caches.open(names.find(name=>name.startsWith('goudduo-static-'))!);
    return {scope:registration!.scope,updateViaCache:registration!.updateViaCache,paths:(await cache.keys()).map(r=>new URL(r.url).pathname)};
  });
  expect(data.scope).toBe(new URL('/',page.url()).href);expect(data.updateViaCache).toBe('none');
  expect(data.paths).toContain('/index.html');expect(data.paths).toContain('/manifest.webmanifest');
  expect(data.paths.every(path=>/^\/assets\/[\w-]+\.(js|css|svg|woff2?)$/.test(path)||path==='/index.html'||path==='/manifest.webmanifest'||/^\/pwa\/[\w-]+\.png$/.test(path))).toBe(true);
  await page.goto('http://127.0.0.1:4175/');
  expect(await page.evaluate(async()=>(await navigator.serviceWorker.getRegistrations()).length)).toBe(0);
});
test('cached interface supports offline deep links but never recovers session records',async({page,context})=>{
  await page.goto('/home/treinos');await ready(page);
  await page.getByRole('button',{name:'Começar treino',exact:true}).click();
  const id=await page.locator('.session-core[data-session-id]').getAttribute('data-session-id');
  await page.getByLabel('Repetições realizadas',{exact:true}).fill('13');
  await page.getByLabel('Carga realizada (kg)',{exact:true}).fill('731.625');
  await page.locator('.session-core__footer').getByRole('button',{name:'Concluir série',exact:true}).click();
  await page.getByRole('button',{name:'Mais opções do treino',exact:true}).click();
  await page.getByRole('dialog',{name:'Opções',exact:true}).getByRole('button',{name:'Finalizar',exact:true}).click();
  await page.getByRole('button',{name:'Confirmar finalização',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Resumo da sessão',exact:true})).toBeVisible();
  await context.setOffline(true);
  await page.getByRole('link',{name:'Histórico',exact:true}).click();
  await expect(page.locator('.session-history__list > li')).toHaveCount(1);
  await page.reload();await expect(page.getByRole('heading',{name:'Nenhuma sessão finalizada',exact:true})).toBeVisible();
  await page.goto(`/historico/${id}`);await expect(page.getByRole('heading',{name:'Resultado indisponível',exact:true})).toBeVisible();
  await page.goto('/rotinas');await expect(page.getByRole('heading',{name:'Rotinas',exact:true})).toBeVisible();
  const cached=await page.evaluate(async()=>{
    const output=[];for(const name of await caches.keys()){const cache=await caches.open(name);for(const request of await cache.keys())output.push({url:request.url,body:await(await cache.match(request))!.text()});}return output;
  });
  expect(cached.some(entry=>entry.url.includes(id!))).toBe(false);expect(cached.some(entry=>entry.body.includes('731.625'))).toBe(false);
  expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
});
// Independent static test origin exercises two releases and denied access. No application store injection.
async function releaseServer() {
  const root=resolve('dist/app'), original=await readFile(`${root}/sw.js`,'utf8');
  const build=JSON.parse(original.match(/const BUILD = (.*);\n/)![1]!);
  let release=1,denyAsset=false;
  const mime:Record<string,string>={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.woff':'font/woff','.woff2':'font/woff2','.png':'image/png'};
  const server=createServer(async(req,res)=>{
    try {
      const url=new URL(req.url!,'http://localhost');
      if(url.pathname==='/restricted'){res.writeHead(403,{'Content-Type':'text/html'}).end('<h1>Acesso negado</h1>');return;}
      if(url.pathname==='/redirected'){res.writeHead(302,{Location:'/login'}).end();return;}
      if(url.pathname==='/login'){res.writeHead(200,{'Content-Type':'text/html'}).end('<h1>Login de acesso</h1>');return;}
      let path=url.pathname==='/'||!extname(url.pathname)?'/index.html':url.pathname;
      let body:Buffer|string=await readFile(resolve(root,`.${path}`));
      if(path==='/index.html' && release===2)body=body.toString()+'\n<!-- release 2 -->';
      if(path==='/sw.js'&&release===2){
        const index=Buffer.concat([await readFile(`${root}/index.html`),Buffer.from('\n<!-- release 2 -->')]);
        const next={...build,version:`test-release-2-${build.version}`,assets:build.assets.map((asset:{url:string})=>asset.url==='/index.html'?{...asset,sha256:createHash('sha256').update(index).digest('hex')}:asset)};
        body=original.replace(/const BUILD = .*;\n/,`const BUILD = ${JSON.stringify(next)};\n`);
      }
      if(denyAsset&&path==='/pwa/icon-192.png')body=Buffer.from('not an official icon');
      res.writeHead(200,{'Content-Type':mime[extname(path)]??'text/plain','Cache-Control':'no-store'}).end(body);
    }catch{res.writeHead(404).end();}
  });
  await new Promise<void>(done=>server.listen(0,'127.0.0.1',done));
  const address=server.address();if(!address||typeof address==='string')throw Error('Missing port');
  return {url:`http://127.0.0.1:${address.port}`,set:(version:number,bad=false)=>{release=version;denyAsset=bad;},version:build.version,close:()=>new Promise<void>((done,reject)=>server.close(error=>error?reject(error):done()))};
}
test('release update waits for existing clients; denied login never becomes offline content',async({page,context})=>{
  const server=await releaseServer();try{
    await page.goto(server.url);await ready(page);
    await page.evaluate(()=>{Object.assign(window,{__journey:'still in memory'});});
    await page.goto(`${server.url}/restricted`);await expect(page.getByRole('heading',{name:'Acesso negado'})).toBeVisible();
    await page.goto(`${server.url}/redirected`);await expect(page.getByRole('heading',{name:'Login de acesso'})).toBeVisible();
    await page.goto(server.url);await ready(page);
    await page.evaluate(()=>{Object.assign(window,{__journey:'still in memory'});});
    server.set(2);
    await page.evaluate(async()=>{await(await navigator.serviceWorker.getRegistration('/'))!.update();});
    await expect.poll(()=>page.evaluate(async()=>Boolean((await navigator.serviceWorker.getRegistration('/'))?.waiting))).toBe(true);
    expect(await page.evaluate(()=>Reflect.get(window,'__journey'))).toBe('still in memory');
    expect(await page.evaluate(()=>caches.keys())).toContain(`goudduo-static-${server.version}`);
    await page.close();const reopened=await context.newPage();await reopened.goto(server.url);await ready(reopened);
    await expect.poll(()=>reopened.evaluate(()=>caches.keys())).toEqual([`goudduo-static-test-release-2-${server.version}`]);
    await expect(reopened.getByRole('tab',{name:'Treinos',exact:true})).toBeVisible();
    await reopened.close();
  }finally{await server.close();}
});
test('changed unverified release cannot replace active offline resources',async({page})=>{
  const server=await releaseServer();try{
    await page.goto(server.url);await ready(page);server.set(2,true);
    const state=await page.evaluate(async()=>{
      const registration=(await navigator.serviceWorker.getRegistration('/'))!;
      const installed=new Promise<string>(resolve=>registration.addEventListener('updatefound',()=>{
        const candidate=registration.installing!;candidate.addEventListener('statechange',()=>{if(candidate.state==='redundant'||candidate.state==='installed')resolve(candidate.state);});
      },{once:true}));
      await registration.update();return installed;
    });
    expect(state).toBe('redundant');expect(await page.evaluate(()=>caches.keys())).toEqual([`goudduo-static-${server.version}`]);
    expect(await page.evaluate(async()=>Boolean((await navigator.serviceWorker.getRegistration('/'))?.waiting))).toBe(false);
  }finally{await server.close();}
});
