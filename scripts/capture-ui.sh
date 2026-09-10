#!/usr/bin/env bash
set -euo pipefail
URL_JSON=$(node -p 'JSON.stringify(process.argv[1])' "${1:-http://127.0.0.1:5174}")
OUT_JSON=$(node -p 'JSON.stringify(process.cwd()+"/.impeccable/review/")')
ego-browser nodejs <<JS
await useOrCreateTaskSpace('BotWorkspace interaction regression')
await openOrReuseTab($URL_JSON, {wait:true})
await gotoAndWait($URL_JSON, {settle:0.2})
const fs = await import('node:fs/promises')
const root = $OUT_JSON
const records = []
async function viewport(width,height) {
  const base={width,height,deviceScaleFactor:1,mobile:false}
  await cdp('Emulation.setDeviceMetricsOverride',base)
  await wait(1)
  const ratio=width/(await pageInfo()).w
  const metrics={...base,width:Math.round(width*ratio),height:Math.round(height*ratio)}
  await cdp('Emulation.setDeviceMetricsOverride',metrics)
  await wait(1)
  const info=await pageInfo()
  if(Math.abs(info.w-width)>1) throw new Error('Unexpected CSS viewport '+JSON.stringify(info))
  return metrics
}
async function shot(name,metrics) {
  const info=await pageInfo()
  const result=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:metrics.width,height:metrics.height,scale:1}})
  await fs.writeFile(root+name+'.png',Buffer.from(result.data,'base64'))
  records.push({name,cssWidth:info.w,cssHeight:info.h,imageWidth:metrics.width,imageHeight:metrics.height})
}
let m=await viewport(1440,900)
await shot('desktop',m)
await js("document.querySelector('.theme-button').click()")
await wait(0.3)
await shot('soft-light',m)
await js("document.querySelector('.theme-button').click()")
m=await viewport(390,844)
await shot('mobile',m)
await click('#toggle-spaces',{label:'open mobile spaces'})
await wait(0.5)
if(!await js("document.querySelector('.spaces-panel').classList.contains('is-mobile-open')")) throw new Error('Mobile pointer did not open spaces')
await js('document.activeElement.blur()')
await shot('mobile-spaces',m)
await js("document.querySelector('.spaces-panel .mobile-close').click()")
await wait(0.2)
await click('#toggle-inspector',{label:'open mobile details'})
await wait(0.5)
if(!await js("document.querySelector('.inspector-panel').classList.contains('is-mobile-open')")) throw new Error('Mobile pointer did not open details')
await js('document.activeElement.blur()')
await shot('mobile-details',m)
await js("document.querySelector('.inspector-panel .mobile-close').click()")
await wait(0.2)
for (const [w,h] of [[1024,768],[320,640]]) {
  await viewport(w,h)
  const layout=await js("({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,composerBottom:document.querySelector('.composer-wrap').getBoundingClientRect().bottom})")
  if(layout.scrollWidth>layout.width || layout.scrollHeight>layout.height+1 || layout.composerBottom>layout.height+1) throw new Error('Layout overflow '+JSON.stringify(layout))
  records.push(layout)
}
await fillInput('textarea','ข้อความยาว '.repeat(300))
await js("document.querySelector('.composer').requestSubmit()")
await wait(0.5)
const longMessage=await js("(() => { const thread=document.querySelector('.thread-wrap'); return {noPageOverflow:document.documentElement.scrollWidth<=innerWidth && document.documentElement.scrollHeight<=innerHeight+1,threadScrolls:thread.scrollHeight>thread.clientHeight,latestVisible:Math.abs(thread.scrollHeight-thread.clientHeight-thread.scrollTop)<2}; })()")
if(!Object.values(longMessage).every(Boolean)) throw new Error('Long message layout failed '+JSON.stringify(longMessage))
records.push({longMessage})
await fs.writeFile(root+'viewports.json',JSON.stringify(records,null,2)+'\n')
cliLog(records)
JS

ego-browser nodejs <<'JS'
cliLog(await completeTaskSpace('BotWorkspace interaction regression', {keep:false}))
JS
