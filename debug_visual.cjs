const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  
  // Wait for the Spline canvas to load
  await page.waitForTimeout(5000);
  
  await page.screenshot({ path: 'artifacts/screenshot_debug_1.png' });
  
  // Let's remove the section::before
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = 'section::before { display: none !important; }';
    document.head.appendChild(style);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'artifacts/screenshot_debug_2_no_section_before.png' });
  
  // Let's remove the right column's background / fade-in
  await page.evaluate(() => {
    const el = document.querySelector('.animate-fade-in');
    if (el) {
      el.classList.remove('animate-fade-in');
    }
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'artifacts/screenshot_debug_3_no_fade_in.png' });

  // Let's remove the global atmosphere
  await page.evaluate(() => {
    const el = document.querySelector('.fixed.inset-0.pointer-events-none');
    if (el) el.style.display = 'none';
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'artifacts/screenshot_debug_4_no_global.png' });
  
  await browser.close();
})();
