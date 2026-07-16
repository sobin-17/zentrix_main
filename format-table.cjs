const { execSync } = require('child_process');
const output = execSync('node extract-spline.cjs', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const dump = JSON.parse(output);

const fs = require('fs');
let out = '| Object Name | Object Type | Material | Visible | Evidence | Confidence Level |\n|---|---|---|---|---|---|\n';

dump.forEach(obj => {
  if (obj.depth <= 2 || obj.name.includes('Rectangle')) {
    const evidence = 'Parsed from Spline runtime ' + obj.depth + ' levels deep inside ' + (obj.depth > 2 ? 'Bot group' : 'Scene');
    out += `| ${obj.name || 'Unnamed'} | ${obj.type} | ${obj.material} | ${obj.visible} | ${evidence} | High |\n`;
  }
});

fs.writeFileSync('table.md', out, 'utf8');
