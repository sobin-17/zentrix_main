const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(5000); // Wait for spline to load

  const splineHtml = await page.evaluate(() => {
    const splineContainer = document.querySelector('.w-full.h-full.relative.z-10'); // the Spline className
    if (!splineContainer) return 'No spline container';
    
    // Check shadow DOM
    let shadowHtml = '';
    if (splineContainer.shadowRoot) {
      shadowHtml = splineContainer.shadowRoot.innerHTML;
    }
    return {
      innerHTML: splineContainer.innerHTML,
      shadowHTML: shadowHtml,
      parentHTML: splineContainer.parentElement.innerHTML
    };
  });

  console.log(JSON.stringify(splineHtml, null, 2));
  await browser.close();
})();
