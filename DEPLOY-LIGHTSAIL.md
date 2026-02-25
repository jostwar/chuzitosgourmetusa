# Desplegar Chuzitos Gourmet en AWS Lightsail + Dominio GoDaddy + SSL/HTTPS

Guía paso a paso para subir esta web (Next.js) a Lightsail, conectar el dominio **chuzitosgourmetusa.com** (GoDaddy) y activar HTTPS con Let's Encrypt.

---

## Datos del proyecto

| Dato | Valor |
|------|--------|
| Repo Git | https://github.com/jostwar/chuzitosgourmetusa.git |
| IP Lightsail (Ubuntu) | **44.253.129.39** |
| Dominio | **chuzitosgourmetusa.com** |

---

## Parte 1: Configurar la instancia en Lightsail

### 1.1 Verificar puertos en el firewall

1. Entra en [AWS Lightsail](https://lightsail.aws.amazon.com) y abre tu instancia Ubuntu.
2. Pestaña **Networking** → **IPv4 firewall**.
3. Asegúrate de tener:
   - **SSH (22)** – para conectarte.
   - **HTTP (80)** – tráfico web y validación de Certbot.
   - **HTTPS (443)** – tráfico HTTPS.

### 1.2 Conectarte por SSH

- En Lightsail: clic en **Connect using SSH** (consola en el navegador),  
  **o** desde tu Mac:

```bash
ssh -i /ruta/a/tu-clave-lightsail.pem ubuntu@44.253.129.39
```

---

## Parte 2: Instalar Node.js y dependencias en el servidor

Dentro de la sesión SSH (usuario `ubuntu`):

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

## Parte 3: Clonar el proyecto y hacer el build

```bash
cd ~
sudo apt install -y git
git clone https://github.com/jostwar/chuzitosgourmetusa.git chuzitosgourmetusa
cd chuzitosgourmetusa

# Instalar dependencias y build
npm ci
npm run build

# Preparar standalone (copia public y .next/static)
npm run prepare-standalone
```

Comprobar que existe el servidor standalone:

```bash
ls -la .next/standalone/server.js
```

---

## Parte 4: Dejar la app corriendo con PM2

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

cd /home/ubuntu/chuzitosgourmetusa

# Arrancar la app desde el directorio standalone
pm2 start server.js --name chuzitos -i 1 --cwd /home/ubuntu/chuzitosgourmetusa/.next/standalone

# Que arranque al reiniciar el servidor
pm2 startup
# Ejecuta el comando que te muestre (sudo env PATH=...)
pm2 save
```

Comandos útiles:

- `pm2 status`
- `pm2 logs chuzitos`
- `pm2 restart chuzitos`

Prueba por IP (si el puerto 3000 está abierto): `http://44.253.129.39:3000`

---

## Parte 5: Configurar el dominio en GoDaddy (DNS)

Antes de instalar Nginx y SSL, apunta el dominio a la IP del servidor.

1. Entra en [GoDaddy](https://www.godaddy.com) → **Mis Productos** → dominio **chuzitosgourmetusa.com**.
2. **Administrar DNS** (o **DNS** / **Manage DNS**).
3. Crear o editar registros:

| Tipo | Nombre | Valor | TTL |
|------|--------|--------|-----|
| **A** | `@` | `44.253.129.39` | 600 (o 1 hora) |
| **CNAME** | `www` | `chuzitosgourmetusa.com` | 600 |

- **@** = dominio raíz (chuzitosgourmetusa.com).
- **www** = www.chuzitosgourmetusa.com (apunta al mismo sitio).

4. Guardar. La propagación DNS puede tardar unos minutos (hasta 24–48 h en casos raros). Puedes comprobar con:

```bash
dig chuzitosgourmetusa.com +short
dig www.chuzitosgourmetusa.com +short
```

Cuando devuelvan `44.253.129.39` (o el CNAME correspondiente), sigue.

---

## Parte 6: Nginx como proxy (puerto 80 y 443)

En el servidor (SSH). **Primero instala Nginx** (si no lo has hecho); sin esto, `nginx` y `nginx.service` no existirán:

```bash
sudo apt update
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/chuzitosgourmetusa
```

Pega esta configuración (solo HTTP por ahora; SSL se añade en la Parte 7):

```nginx
server {
    listen 80;
    server_name chuzitosgourmetusa.com www.chuzitosgourmetusa.com;

    # Estáticos de Next.js (CSS, JS): Nginx los sirve desde disco + caché largo para PageSpeed
    location /_next/static/ {
        alias /home/ubuntu/chuzitosgourmetusa/.next/standalone/.next/static/;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Si la app pide /next/static/ (sin guion bajo), reescribir a /_next/static/
    location /next/ {
        rewrite ^/next/(.*)$ /_next/$1 last;
    }

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

**Importante:** La ruta `/_next/static/` la sirve Nginx desde `/home/ubuntu/chuzitosgourmetusa/.next/standalone/.next/static/`. Esa carpeta debe existir y tener archivos. Si tras `npm run prepare-standalone` esa ruta no existe, créala a mano en el servidor:

```bash
cd /home/ubuntu/chuzitosgourmetusa
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/
ls -la .next/standalone/.next/static/
```

Activar el sitio y comprobar:

```bash
sudo ln -sf /etc/nginx/sites-available/chuzitosgourmetusa /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Prueba en el navegador: `http://chuzitosgourmetusa.com` (y `http://www.chuzitosgourmetusa.com`). Debe cargar la web.

---

## Parte 7: SSL/HTTPS con Let's Encrypt (Certbot)

En el servidor:

```bash
# Instalar Certbot y plugin Nginx
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado (Certbot configurará Nginx automáticamente)
sudo certbot --nginx -d chuzitosgourmetusa.com -d www.chuzitosgourmetusa.com
```

- Introduce un email para avisos de renovación.
- Acepta los términos si lo pide.
- Elige **redirect** para redirigir HTTP → HTTPS.

Comprobar que Nginx quedó con SSL:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Verificar renovación automática:

```bash
sudo certbot renew --dry-run
```

En el navegador: **https://chuzitosgourmetusa.com** y **https://www.chuzitosgourmetusa.com** deben abrir con candado (HTTPS).

---

## Parte 8: Resumen de comprobaciones

| Paso | Qué comprobar |
|------|----------------|
| 1 | SSH: `ssh ubuntu@44.253.129.39` |
| 2 | Node: `node -v` (v20.x) |
| 3 | App: `pm2 status` → chuzitos en “online” |
| 4 | DNS: `dig chuzitosgourmetusa.com +short` → 44.253.129.39 |
| 5 | HTTP: `http://chuzitosgourmetusa.com` carga la web |
| 6 | HTTPS: `https://chuzitosgourmetusa.com` con candado |

---

## Actualizar la web después de cambios en Git

En el servidor (SSH). Tras `npm run build` se ejecuta **postbuild** y se copian `public` y `.next/static` al standalone; luego reinicia PM2:

```bash
cd /home/ubuntu/chuzitosgourmetusa
git pull
npm ci
npm run build
pm2 restart chuzitos
```

(Si por algún motivo los estilos no se actualizan, ejecuta además `npm run prepare-standalone` y vuelve a `pm2 restart chuzitos`.)

---

## Resumen rápido

1. Lightsail: puertos 22, 80 y 443 abiertos.
2. Servidor: Node 20, clonar repo, `npm ci` → `npm run build` → `npm run prepare-standalone`.
3. PM2: `pm2 start server.js ...` desde `.next/standalone` y `pm2 startup` + `pm2 save`.
4. GoDaddy: A @ → 44.253.129.39, CNAME www → chuzitosgourmetusa.com.
5. Nginx: proxy en 80 (y luego 443) a `http://127.0.0.1:3000` con `server_name` chuzitosgourmetusa.com y www.
6. Certbot: `sudo certbot --nginx -d chuzitosgourmetusa.com -d www.chuzitosgourmetusa.com` y redirigir HTTP a HTTPS.

Si algo falla, revisa: `pm2 logs chuzitos`, `sudo tail -f /var/log/nginx/error.log` y que el dominio en GoDaddy apunte a **44.253.129.39**.

---

## La web se ve sin estilos (CSS no carga) / ChunkLoadError / 404 a estáticos

Si la página abre en blanco, sale “Application error” o en la consola del navegador (F12) ves **404** a archivos en `/next/static/` o `/_next/static/` y **ChunkLoadError**, es que los estáticos no se sirven bien. Dos causas habituales:

1. **Las peticiones van a `/next/static/` (sin guion bajo)**  
   Next.js sirve en `/_next/static/`. Si tu Nginx aún no tiene el rewrite, añade dentro de `server { ... }` (tanto en el bloque que escucha 80 como en el de 443):

   ```nginx
   location /next/ {
       rewrite ^/next/(.*)$ /_next/$1 last;
   }
   ```

   Luego: `sudo nginx -t && sudo systemctl reload nginx`.

2. **Los archivos no están en el standalone o PM2 arrancó con otro directorio**  
   Sigue los pasos siguientes.

### 1. Asegurar que standalone tiene los estáticos

Después de cada `npm run build`, Next.js no copia solo `public` y `.next/static` al directorio standalone; hay que copiarlos (o usar `postbuild`, que ya lo hace en este proyecto). Ejecuta:

```bash
cd /home/ubuntu/chuzitosgourmetusa
npm run prepare-standalone
```

Comprueba que existan carpetas y archivos:

```bash
ls -la .next/standalone/.next/static/
ls -la .next/standalone/public/
```

Tienen que verse archivos (chunks, CSS, etc.). Si están vacíos o no existen, el build o la copia fallaron.

### 2. Reiniciar PM2 con el directorio correcto

La app debe ejecutarse **desde** el directorio standalone para que encuentre `.next/static` y `public`:

```bash
cd /home/ubuntu/chuzitosgourmetusa
pm2 delete chuzitos
pm2 start server.js --name chuzitos -i 1 --cwd /home/ubuntu/chuzitosgourmetusa/.next/standalone
pm2 save
```

### 3. Verificar en el navegador

Abre la web y en “Inspeccionar” → pestaña **Red**: revisa si alguna petición a `/_next/static/...` devuelve **404**. Si es así, en el servidor vuelve a ejecutar los pasos 1 y 2.

### Resumen rápido (cuando la web se ve mal)

```bash
cd /home/ubuntu/chuzitosgourmetusa
git pull
npm ci
npm run build
npm run prepare-standalone
pm2 delete chuzitos
pm2 start server.js --name chuzitos -i 1 --cwd /home/ubuntu/chuzitosgourmetusa/.next/standalone
pm2 save
```

Luego recarga la URL (mejor con Ctrl+F5 para evitar caché).
