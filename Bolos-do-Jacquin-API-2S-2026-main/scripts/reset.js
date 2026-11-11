const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
fs.copyFileSync(path.join(root, 'db.seed.json'), path.join(root, 'db.json'));
console.log('Banco restaurado a partir de db.seed.json.');
