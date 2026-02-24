# Desplegar Chuzitos Gourmet en AWS Lightsail

Guía paso a paso para subir esta web (Next.js) a una instancia Lightsail.

---

## Requisitos previos

- Cuenta AWS con Lightsail disponible.
- Tu proyecto en Git (GitHub, GitLab o Bitbucket) para clonar en el servidor, **o** posibilidad de subir archivos (rsync/scp).

---

## Parte 1: Crear y configurar la instancia en Lightsail

### 1. Crear instancia

1. Entra en **AWS Lightsail** → [lightsail.aws.amazon.com](https://lightsail.aws.amazon.com).
2. **Create instance**.
3. **Ubicación:** la que prefieras (ej. `us-east-1`).
4. **Plataforma:** Linux/Unix.
5. **Blueprint:** **OS Only** → **Ubuntu 22.04 LTS**.
6. **Plan:** al menos **$5** (512 MB RAM) para desarrollo; para producción mejor **$10** (1 GB) o más.
7. Nombre de instancia, ej: `chuzitos-web`.
8. **Create instance**.

### 2. Abrir puertos

1. En la instancia → pestaña **Networking**.
2. **IPv4 firewall:** asegúrate de tener:
   - **SSH (22)** – para conectarte.
   - **HTTP (80)** – tráfico web.
   - **Custom:** **3000** – si al inicio quieres probar Next.js en el puerto 3000.

(Después podrás usar Nginx en 80 y quitar 3000 si quieres.)

### 3. Conectarte por SSH

- En Lightsail, en tu instancia, clic en **Connect using SSH** (abre el navegador en una consola).
- O desde tu Mac, descarga la clave SSH que Lightsail te da (icono de engranaje de la instancia → **Account** → **SSH keys** → descargar para Lightsail default) y conéctate:

```bash
ssh -i /ruta/a/tu-clave-lightsail.pem ubuntu@TU_IP_PUBLICA
```

Sustituye `TU_IP_PUBLICA` por la IP que muestra Lightsail en la instancia.

---

## Parte 2: Instalar Node.js y dependencias en el servidor

En la sesión SSH (como usuario `ubuntu`):

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar
node -v   # v20.x.x
npm -v
```

---

## Parte 3: Subir o clonar el proyecto

### Opción A: Clonar desde Git (recomendado)

Si el código está en GitHub/GitLab:

```bash
# En el servidor
cd ~
sudo apt install -y git
git clone https://github.com/TU_USUARIO/TU_REPO.git chuzitosgourmetusa
cd chuzitosgourmetusa
```

Si el repo es privado, configura SSH o un token en lugar de HTTPS.

### Opción B: Subir con rsync desde tu Mac

En **tu Mac** (en la carpeta del proyecto):

```bash
cd /Users/jarrieta/Desktop/idprojects/apps/chuzitosgourmetusa

# Excluir node_modules y .next (se generan en el servidor)
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
  -e "ssh -i /RUTA/A/TU_CLAVE_LIGHTSAIL.pem" \
  . ubuntu@TU_IP_PUBLICA:~/chuzitosgourmetusa/
```

Sustituye `TU_IP_PUBLICA` y la ruta de la clave.

---

## Parte 4: Build y ejecución en el servidor (standalone)

En el servidor (SSH):

```bash
cd ~/chuzitosgourmetusa

# Instalar dependencias
npm ci

# Build (genera .next/standalone y .next/static)
npm run build

# Preparar standalone (copia public y .next/static) y arrancar en el puerto 3000
npm run start:standalone
```

Deberías poder abrir en el navegador: `http://TU_IP_PUBLICA:3000`.

(Para arrancar solo el servidor sin preparar de nuevo: `npm run prepare-standalone && node .next/standalone/server.js`).

---

## Parte 5: Dejar la app corriendo siempre (PM2)

```bash
# Instalar PM2
sudo npm install -g pm2

cd ~/chuzitosgourmetusa

# Crear script de arranque (opcional)
echo 'cd /home/ubuntu/chuzitosgourmetusa/.next/standalone && node server.js' > start.sh
chmod +x start.sh

# Preparar standalone y arrancar con PM2 (desde la raíz del proyecto)
npm run prepare-standalone
pm2 start server.js --name chuzitos -i 1 --cwd /home/ubuntu/chuzitosgourmetusa/.next/standalone

# Que arranque al reiniciar el servidor
pm2 startup
pm2 save
```

Comandos útiles:

- `pm2 status`
- `pm2 logs chuzitos`
- `pm2 restart chuzitos`

---

## Parte 6: Nginx como proxy (opcional, puerto 80)

Para usar **HTTP (80)** y/o HTTPS después:

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/chuzitos
```

Contenido mínimo:

```nginx
server {
    listen 80;
    server_name TU_IP_O_DOMINIO;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar y recargar Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/chuzitos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Cierra el puerto 3000 en el firewall de Lightsail si ya solo quieres usar el 80.

---

## Parte 7: Actualizar la web después de cambios

Si usas Git:

```bash
cd ~/chuzitosgourmetusa
git pull
npm ci
npm run build
cp -r public .next/standalone/ 2>/dev/null || true
cp -r .next/static .next/standalone/.next/ 2>/dev/null || true
pm2 restart chuzitos
```

Si subes con rsync, vuelve a ejecutar rsync, luego en el servidor: `npm ci`, `npm run build`, copias y `pm2 restart chuzitos`.

---

## Resumen rápido

| Paso | Acción |
|------|--------|
| 1 | Lightsail: crear instancia Ubuntu 22.04 |
| 2 | Abrir puertos 22, 80 y (opcional) 3000 |
| 3 | SSH a la instancia |
| 4 | Instalar Node 20 |
| 5 | Clonar repo o subir código con rsync |
| 6 | `npm ci` → `npm run build` |
| 7 | Copiar `public` y `.next/static` a `.next/standalone` si hace falta |
| 8 | Arrancar con PM2: `node .next/standalone/server.js` |
| 9 | (Opcional) Nginx en 80 apuntando a `localhost:3000` |

Si me dices si vas a usar **dominio propio** o solo **IP**, puedo ajustarte los pasos (DNS y HTTPS con Let's Encrypt en Nginx).
