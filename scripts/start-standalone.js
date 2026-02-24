#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const standaloneDir = path.join(projectRoot, '.next', 'standalone');
const serverPath = path.join(standaloneDir, 'server.js');

// 1. Build si no existe standalone
if (!fs.existsSync(serverPath)) {
  console.log('Standalone no encontrado. Ejecutando npm run build...');
  execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
}

if (!fs.existsSync(serverPath)) {
  console.error('Error: El build no generó .next/standalone/server.js. Revisa que el build termine sin errores.');
  process.exit(1);
}

// 2. Copiar public y static al standalone
const copy = (src, dest) => {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
};
copy(path.join(projectRoot, 'public'), path.join(standaloneDir, 'public'));
copy(path.join(projectRoot, '.next', 'static'), path.join(standaloneDir, '.next', 'static'));
console.log('Standalone listo.');

// 3. Arrancar servidor (cwd = standalone para rutas de public/static)
execSync('node server.js', { cwd: standaloneDir, stdio: 'inherit' });
