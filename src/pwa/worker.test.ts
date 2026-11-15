import { readFileSync } from 'node:fs';
import { createHash, webcrypto } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';
function harness() {
  let now = 1000;
  const body = '<html>static shell</html>', prefix = 'goudduo-static-', key = prefix+'test';
  const handlers = new Map<string, (event: any) => void>(), stores = new Map<string, Map<string, Response>>();
  const normalize = (url: string) => new URL(url,'https://app.test').href;
  const storage = {
    keys: async () => [...stores.keys()], delete: async (name: string) => stores.delete(name),
    open: async (name: string) => {
      if (!stores.has(name)) stores.set(name,new Map());
      const data = stores.get(name)!;
      return { put: async (url: string, response: Response) => { data.set(normalize(url),response.clone()); }, match: async (url: string) => data.get(normalize(url))?.clone(), delete: async (url: string) => data.delete(normalize(url)) };
    },
  };
  const fetch = vi.fn(async () => new Response(body,{headers:{'Content-Type':'text/html','X-Private-Identity':'must not cache'}}));
  const claim = vi.fn();
  const asset = {url:'/index.html',type:'text/html',sha256:createHash('sha256').update(body).digest('hex')};
  runInNewContext(readFileSync('scripts/pwa/worker.js','utf8'),{
    BUILD:{version:'test',assets:[asset]},self:{location:{origin:'https://app.test'},clients:{claim},addEventListener:(type:string,callback:any)=>handlers.set(type,callback)},
    caches:storage,fetch,Response,Headers,URL,crypto:webcrypto,Date:class extends Date {static now(){return now;}},
  });
  const lifecycle=(type:string)=>{let task:Promise<void>|undefined;handlers.get(type)!({waitUntil:(p:Promise<void>)=>{task=p;}});return task!;};
  const request=(path:string, options:Record<string,string>={})=>{
    let task:Promise<Response>|undefined;handlers.get('fetch')!({request:{url:normalize(path),method:'GET',mode:'same-origin',...options},respondWith:(p:Promise<Response>)=>{task=p;}});return task;
  };
  return {now:(value:number)=>{now=value;},fetch,storage,stores,claim,lifecycle,request,key,body};
}
describe('own static-only PWA worker',()=>{
  it('installs verified static bytes and does not retain identity headers',async()=>{const h=harness();await h.lifecycle('install');const r=await(await h.storage.open(h.key)).match('/index.html');expect(await r!.text()).toBe(h.body);expect(r!.headers.has('X-Private-Identity')).toBe(false);});
  it.each(['changed bytes','login redirect'])('rejects %s atomically',async kind=>{const h=harness();h.fetch.mockImplementation(async()=>kind==='changed bytes'?new Response('login',{headers:{'Content-Type':'text/html'}}):Response.redirect('https://login.test'));await expect(h.lifecycle('install')).rejects.toThrow();expect(await h.storage.keys()).toEqual([]);});
  it.each([['/session-data','GET'],['/index.html?secret=1','GET'],['https://other.test/index.html','GET'],['/index.html','POST']])('does not handle or store %s %s',async(path,method)=>{const h=harness();expect(h.request(path!,{method:method!})).toBeUndefined();expect(await h.storage.keys()).toEqual([]);});
  it('returns online access denial instead of cached application',async()=>{const h=harness();await h.lifecycle('install');h.fetch.mockImplementation(async()=>new Response('Access denied',{status:403}));expect((await h.request('/historico',{mode:'navigate'}))!.status).toBe(403);});
  it('serves the static shell only after a network failure without saving the route',async()=>{const h=harness();await h.lifecycle('install');h.fetch.mockRejectedValue(new TypeError('offline'));const r=await h.request('/historico/opaque',{mode:'navigate'});expect(await r!.text()).toBe(h.body);expect([...h.stores.get(h.key)!.keys()]).toEqual(['https://app.test/index.html']);});
  it('expires offline HTML after seven days rather than serving old code indefinitely',async()=>{const h=harness();await h.lifecycle('install');h.now(1000+7*86400000);h.fetch.mockRejectedValue(new TypeError('offline'));expect((await h.request('/home/treinos',{mode:'navigate'}))!.status).toBe(503);});
  it('cleans only this applications old cache on activation',async()=>{const h=harness();await h.storage.open('unrelated');await h.storage.open('goudduo-static-old');await h.lifecycle('install');await h.lifecycle('activate');expect(await h.storage.keys()).toEqual(['unrelated',h.key]);expect(h.claim).toHaveBeenCalledOnce();});
});
