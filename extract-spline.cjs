const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.error('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const fileUrl = 'file://' + path.resolve('spline-inspector.html').replace(/\\/g, '/');
  console.error('Navigating to ' + fileUrl);
  await page.goto(fileUrl);
  
  console.error('Waiting for Spline scene to load...');
  await page.waitForSelector('body[data-ready="true"]', { timeout: 30000 });
  
  console.error('Fetching object dump...');
  const dump = await page.evaluate(() => window.splineDump);
  
  console.log(JSON.stringify(dump, null, 2));
  
  await browser.close();
})();
