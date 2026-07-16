const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(6000);

  const tags = await page.evaluate(() => {
    function findElements(node, results = []) {
      if (!node) return results;
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.shadowRoot) {
          findElements(node.shadowRoot, results);
        }
        
        const tagName = node.tagName.toLowerCase();
        if (tagName === 'a' || node.className && typeof node.className === 'string' && node.className.includes('spline')) {
          results.push({
            tag: tagName,
            className: node.className,
            id: node.id,
            href: node.href || null,
            html: node.innerHTML.substring(0, 50)
          });
        }
      }
      
      for (const child of node.childNodes) {
        findElements(child, results);
      }
      return results;
    }
    
    return findElements(document.body);
  });

  console.log(JSON.stringify(tags, null, 2));
  await browser.close();
})();
