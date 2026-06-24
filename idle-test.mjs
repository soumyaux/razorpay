import { chromium } from 'playwright-core';
const exe = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe, args: ['--ignore-certificate-errors'] });
const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto('https://localhost:5173/', { waitUntil: 'networkidle' });
const lvl1 = page.getByText('Image → Blade', { exact: false }).first();
if (await lvl1.count()) { await lvl1.click(); await page.waitForTimeout(500); }
const img = page.locator('img[alt="AI x Design Meetup"]').first();
await img.scrollIntoViewIfNeeded();

// Read the INNER float wrapper transform (parent of the img's Box) at 3 timepoints — NO mouse input
const getInner = () => page.evaluate(() => {
  const img = document.querySelector('img[alt="AI x Design Meetup"]');
  let el = img;
  const out = [];
  for (let i=0;i<6 && el;i++){ const t = getComputedStyle(el).transform; if (t && t!=='none') out.push(t); el = el.parentElement; }
  return out;
});
console.log('t=0ms  :', JSON.stringify(await getInner()));
await page.waitForTimeout(1500);
console.log('t=1500 :', JSON.stringify(await getInner()));
await page.waitForTimeout(1500);
console.log('t=3000 :', JSON.stringify(await getInner()));
await browser.close();
