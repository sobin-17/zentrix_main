const fs = require('fs');
const data = require('./hero-dom.json');
const suspicious = data.filter(e => {
  const check = (s) => s && (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.backgroundImage !== 'none' || s.filter !== 'none' || s.backdropFilter !== 'none');
  return check(e.main) || check(e.before) || check(e.after);
});
fs.writeFileSync('suspicious.json', JSON.stringify(suspicious.map(e => ({ depth: e.depth, className: e.className, tagName: e.tagName, main: e.main, before: e.before, after: e.after })), null, 2));
