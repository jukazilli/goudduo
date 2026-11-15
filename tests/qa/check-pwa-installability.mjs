// Chromium protocol validation, not proof of installation on a physical device.
import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser=await chromium.launch({args:['--no-sandbox']});
const report={browser:browser.version(),origin:'http://127.0.0.1:4197',physicalInstallation:false,remotePreview:false,checks:[]};
for(const width of [320,375,390,414,430]) {
  const context=await browser.newContext({viewport:{width,height:844},hasTouch:true});
  const page=await context.newPage();await page.goto(report.origin);
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
  const cdp=await context.newCDPSession(page);
  const manifest=await cdp.send('Page.getAppManifest');
  const installability=await cdp.send('Page.getInstallabilityErrors');
  expect(manifest.errors).toEqual([]);expect(installability.installabilityErrors).toEqual([]);
  report.checks.push({width,manifestUrl:manifest.url,manifestErrors:manifest.errors,installabilityErrors:installability.installabilityErrors});
  await context.close();
}
await browser.close();await mkdir('docs/pwa-preview/evidence',{recursive:true});
await writeFile('docs/pwa-preview/evidence/chromium-installability.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
