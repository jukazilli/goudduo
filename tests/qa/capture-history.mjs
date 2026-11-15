import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const out='docs/integration/p3s2/evidence'; await mkdir(out,{recursive:true});
const browser=await chromium.launch({args:['--no-sandbox']});
const report={browser:browser.version(),method:'Common React application; real demo execution and confirmed finish. No injected sessions, private captures or candidate HTML parity.',viewports:[]};
for(const width of [320,375,390,414,430]) {
  const context=await browser.newContext({viewport:{width,height:844},hasTouch:true,deviceScaleFactor:1});
  const page=await context.newPage(),row={width,states:[],errors:[]};page.on('pageerror',error=>row.errors.push(error.message));
  const footer=name=>page.locator('.session-core__footer').getByRole('button',{name,exact:true});
  async function capture(name) {
    console.log(JSON.stringify({width,state:name})); await page.evaluate(()=>document.fonts.ready);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    const axe=await new AxeBuilder({page}).analyze();expect(axe.violations).toEqual([]);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
    const file=`${name}-${width}.png`;await page.screenshot({path:`${out}/${file}`});
    const geometry=await page.evaluate(()=>Object.fromEntries(['.app-header','#main-content','.surface-footer','.session-history','.session-history__list'].map(selector=>{
      const e=document.querySelector(selector);return [selector,e?{box:e.getBoundingClientRect().toJSON(),scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,padding:getComputedStyle(e).padding}:null];
    })));
    row.states.push({name,file,sha256:createHash('sha256').update(await readFile(`${out}/${file}`)).digest('hex'),violations:axe.violations.length,geometry});
  }
  async function finish() {
    await page.getByRole('button',{name:'Mais opções do treino',exact:true}).click();
    const dialog=page.getByRole('dialog',{name:'Opções',exact:true});await expect(dialog).toHaveCSS('opacity','1');
    await dialog.getByRole('button',{name:'Finalizar',exact:true}).click();await page.getByRole('button',{name:'Confirmar finalização',exact:true}).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('heading',{name:'Resumo da sessão',exact:true})).toBeVisible();
  }
  async function history() {await page.getByRole('link',{name:'Histórico',exact:true}).click();await expect(page.getByRole('heading',{name:'Histórico',exact:true})).toBeVisible();}
  await page.goto('http://127.0.0.1:4193/historico');await capture('empty');
  await page.getByRole('button',{name:'Voltar',exact:true}).click();await page.getByRole('link',{name:'Home',exact:true}).click();await page.getByRole('button',{name:'Começar treino',exact:true}).click();
  const first=await page.locator('.session-core[data-session-id]').getAttribute('data-session-id');
  await page.getByLabel('Repetições realizadas',{exact:true}).fill('9');await page.getByLabel('Carga realizada (kg)',{exact:true}).fill('7.5');await footer('Concluir série').click();await finish();await capture('summary-complete');
  await history();await capture('list-one');await page.locator(`.session-history__list [data-session-id="${first}"] a`).click();await capture('detail-complete');
  await page.getByRole('button',{name:'Voltar',exact:true}).click();await page.getByRole('button',{name:'Voltar',exact:true}).click();await footer('Voltar à origem').click();
  await page.getByRole('button',{name:'Selecionar treino de quinta-feira',exact:true}).click();await page.getByRole('button',{name:'Começar treino',exact:true}).click();
  const second=await page.locator('.session-core[data-session-id]').getAttribute('data-session-id');
  await footer('Concluir série').click();await footer('Pular descanso').click();
  await page.getByRole('button',{name:'Mais opções do treino',exact:true}).click();await page.getByRole('dialog',{name:'Opções',exact:true}).getByRole('button',{name:'Pular',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);
  await finish();await capture('summary-partial');await history();await expect(page.locator('.session-history__list > li')).toHaveCount(2);await capture('list-two');
  await page.locator(`.session-history__list [data-session-id="${second}"] a`).click();await capture('detail-partial');
  await expect(page.getByText('2 séries não realizadas',{exact:true})).toBeVisible();
  await page.reload();await expect(page.getByRole('heading',{name:'Resultado indisponível',exact:true})).toBeVisible();await capture('reload-unavailable');
  expect(row.errors).toEqual([]);report.viewports.push(row);await context.close();
}
await browser.close();
const sources=['src/domain/session-result.ts','src/state/session-results.ts','src/app/navigation.ts','src/app/PrototypeApp.tsx','src/app/useTrainingSession.ts','src/state/session.ts','src/surfaces/history/ResultFacts.tsx','src/surfaces/history/SessionHistory.tsx','src/surfaces/history/SessionResult.tsx','src/surfaces/history/history.css','src/surfaces/session/TrainingSession.tsx','src/surfaces/session/session.css'];
report.sourcesSHA256=Object.fromEntries(await Promise.all(sources.map(async path=>[path,createHash('sha256').update(await readFile(path)).digest('hex')])));
await writeFile(`${out}/measurements.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({captures:40,axeScans:40,viewports:5,pageErrors:0}));
