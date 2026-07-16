const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(6000); // Wait for spline and logo to fully load

  const allTexts = await page.evaluate(() => {
    function findInShadow(node, texts = []) {
      if (!node) return texts;
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.shadowRoot) {
          texts.push('SHADOW_ROOT_FOUND_ON: ' + node.tagName);
          findInShadow(node.shadowRoot, texts);
        }
        if (node.innerText && node.innerText.includes('Built with')) {
          texts.push({
            tag: node.tagName,
            className: node.className,
            id: node.id,
            text: node.innerText,
            style: node.getAttribute('style')
          });
        }
      }
      
      for (const child of node.childNodes) {
        findInShadow(child, texts);
      }
      return texts;
    }
    
    return findInShadow(document.body);
  });

  console.log(JSON.stringify(allTexts, null, 2));
  await browser.close();
})();
