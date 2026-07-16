const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.error('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173');
  
  console.error('Waiting for Spline scene to load...');
  await page.waitForSelector('canvas', { timeout: 30000 });
  await page.waitForTimeout(2000); // Give it a moment to render
  
  console.error('Inspecting DOM for Hero section...');
  const result = await page.evaluate(() => {
    // Find the Hero container. We know Spline is in the right column
    const canvas = document.querySelector('canvas');
    if (!canvas) return 'No canvas found';
    
    // Go up to the Hero section
    let heroSection = canvas;
    while (heroSection && heroSection.tagName !== 'SECTION' && !(heroSection.getAttribute('class') || '').includes('min-h-screen')) {
      heroSection = heroSection.parentElement;
    }
    if (!heroSection) heroSection = document.body;
    
    const elements = [];
    const checkStyle = (node, pseudo) => {
      const computed = window.getComputedStyle(node, pseudo);
      if (!computed) return null;
      
      const hasBackground = computed.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
                            computed.backgroundImage !== 'none' ||
                            computed.background !== 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box';
                            
      const hasFilter = computed.filter !== 'none' || computed.backdropFilter !== 'none';
      const hasClip = computed.clipPath !== 'none';
      
      if (hasBackground || hasFilter || hasClip || pseudo) {
        return {
          pseudo: pseudo || 'none',
          backgroundColor: computed.backgroundColor,
          backgroundImage: computed.backgroundImage,
          opacity: computed.opacity,
          mixBlendMode: computed.mixBlendMode,
          filter: computed.filter,
          backdropFilter: computed.backdropFilter,
          transform: computed.transform,
          overflow: computed.overflow,
          zIndex: computed.zIndex,
          clipPath: computed.clipPath,
          boxShadow: computed.boxShadow,
          width: computed.width,
          height: computed.height,
          position: computed.position
        };
      }
      return null;
    };
    
    const walk = (node, depth, path) => {
      if (node.nodeType === 1) { // Element
        const cls = node.getAttribute('class') || '';
        const identifier = node.tagName + (node.id ? '#' + node.id : '') + (cls ? '.' + cls.split(' ').join('.') : '');
        const currentPath = path ? path + ' > ' + identifier : identifier;
        
        const mainStyle = checkStyle(node, null);
        const beforeStyle = checkStyle(node, '::before');
        const afterStyle = checkStyle(node, '::after');
        
        elements.push({
          depth,
          path: currentPath,
          tagName: node.tagName,
          className: cls,
          main: mainStyle,
          before: beforeStyle,
          after: afterStyle
        });
        
        for (let i = 0; i < node.childNodes.length; i++) {
          walk(node.childNodes[i], depth + 1, currentPath);
        }
      }
    };
    
    walk(heroSection, 0, '');
    
    // Filter to elements inside the right column
    return elements.filter(e => e.path.includes('w-full > lg:w-1/2') || e.path.includes('h-[300px]') || e.path.includes('lg:h-[600px]'));
  });
  
  require('fs').writeFileSync('hero-dom.json', JSON.stringify(result, null, 2), 'utf8');
  await page.screenshot({ path: 'hero-debug.png', fullPage: true });
  await browser.close();
})();
