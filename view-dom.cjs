const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('hero-dom.json', 'utf16le'));
console.log(JSON.stringify(dump, null, 2));
