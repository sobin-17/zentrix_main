const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to localhost:5173...');
  await page.goto('http://localhost:5173');
  
  console.log('Waiting for Spline canvas...');
  await page.waitForSelector('canvas', { timeout: 10000 });
  
  // Wait a bit for Spline to render
  await page.waitForTimeout(3000);
  
  console.log('Inspecting DOM...');
  const result = await page.evaluate(() => {
    const parent = document.querySelector('.spline-wrapper') || document.querySelector('canvas').parentElement.parentElement;
    if (!parent) return 'No parent found';
    
    const elements = [];
    const walk = (node, depth) => {
      if (node.nodeType === 1) { // Element
        const computed = window.getComputedStyle(node);
        elements.push({
          depth,
          tagName: node.tagName,
          id: node.id,
          className: node.className,
          width: computed.width,
          height: computed.height,
          background: computed.background,
          backgroundColor: computed.backgroundColor,
          display: computed.display,
          opacity: computed.opacity,
          visibility: computed.visibility,
          zIndex: computed.zIndex
        });
        
        if (node.tagName === 'CANVAS') {
          const gl = node.getContext('webgl2') || node.getContext('webgl');
          if (gl) {
            const pixels = new Uint8Array(4);
            gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            elements[elements.length - 1].pixelColorTopLeft = `rgba(${pixels[0]}, ${pixels[1]}, ${pixels[2]}, ${pixels[3] / 255})`;
          }
        }
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i], depth + 1);
      }
    };
    
    walk(parent, 0);
    return elements;
  });
  
  console.log(JSON.stringify(result, null, 2));
  
  console.log('Taking screenshot...');
  await page.screenshot({ path: 'playwright-debug.png', fullPage: true });
  
  await browser.close();
})();
