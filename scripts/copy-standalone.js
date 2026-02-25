#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const standaloneDir = path.join(projectRoot, '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.log('No existe .next/standalone. Ejecuta npm run build antes.');
  process.exit(1);
}

const copy = (src, dest) => {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log('Copiado:', path.relative(projectRoot, src), '->', path.relative(projectRoot, dest));
};

copy(path.join(projectRoot, 'public'), path.join(standaloneDir, 'public'));
copy(path.join(projectRoot, '.next', 'static'), path.join(standaloneDir, '.next', 'static'));

console.log('Standalone listo. Comprueba: ls -la', path.join(standaloneDir, '.next', 'static'));
