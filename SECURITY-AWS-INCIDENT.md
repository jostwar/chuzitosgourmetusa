# Incidente AWS Trust & Safety – Caso 18028248058-1

## Resumen del reporte

AWS notificó que la instancia Lightsail **chuzitosgourmetusa** (44.253.129.39, us-west-2) estuvo implicada en actividad que se asemeja a intentos de acceso no autorizado a hosts remotos. En concreto:

- **Origen:** 44.253.129.39 (esta instancia)
- **Destino:** 3.101.111.116 (puertos 80 y 443)
- **Tipo:** tráfico asociado al exploit **CVE-2025-55182** (React2Shell), RCE en Next.js vía deserialización en React Server Components.

Interpretación: la aplicación Next.js desplegada en la instancia era **vulnerable**; un atacante pudo haber explotado la instancia y usarla para lanzar el mismo exploit contra otro host (3.101.111.116). AWS bloqueó el tráfico saliente de la instancia hacia ese destino.

---

## Acciones correctivas realizadas

### 1. Actualización de Next.js (parche CVE-2025-55182)

- **Antes:** Next.js 15.5.0 (vulnerable).
- **Después:** Next.js 15.5.9 (versión parcheada para la rama 15.5.x; incluye parches para CVE-2025-55182 y CVEs relacionados).
- **Cambio en el proyecto:** en `package.json` se actualizó la dependencia `"next": "15.5.0"` → `"next": "15.5.9"`.
- **En producción:** tras hacer `git pull`, en el servidor Lightsail ejecutar:
  - `npm ci`
  - `npm run build`
  - `npm run prepare-standalone`
  - Reiniciar la app (por ejemplo con PM2) para que sirva el build nuevo.

### 2. Recomendaciones adicionales en la instancia

- **Actualizar el sistema:** `sudo apt update && sudo apt upgrade -y`
- **Revisar procesos y cron:** comprobar que no haya procesos o tareas programadas sospechosas añadidas por un atacante.
- **Rotar credenciales:** si en la instancia hay claves SSH, tokens o variables de entorno sensibles, considerarlas potencialmente comprometidas y rotarlas.
- **Lightsail / Security Groups:** revisar reglas de firewall; limitar tráfico entrante a los puertos estrictamente necesarios (p. ej. 22, 80, 443) y, si el negocio lo permite, restringir tráfico saliente a lo necesario (por ejemplo solo HTTPS hacia servicios conocidos), en lugar de permitir 0.0.0.0/0 saliente.

---

## Borrador de respuesta para AWS Trust & Safety

Puedes enviar algo como esto por email, contestando directamente al mensaje de AWS (Case Number: 18028248058-1):

---

**Subject:** Re: Case 18028248058-1 – Corrective actions (Instance chuzitosgourmetusa, us-west-2)

Dear AWS Trust & Safety,

Thank you for your message regarding Case Number 18028248058-1 and the reported activity involving our Lightsail instance (chuzitosgourmetusa, us-west-2, IP 44.253.129.39).

We have investigated and taken the following corrective actions:

1. **Root cause:** Our application was built with Next.js 15.5.0, which is affected by CVE-2025-55182 (React2Shell), a critical remote code execution vulnerability in the React Server Components (RSC) protocol. We believe this vulnerability allowed our instance to be exploited and subsequently used to send related exploit traffic to the reported destination (3.101.111.116).

2. **Patch applied:** We have upgraded Next.js from 15.5.0 to the patched version 15.5.9 (as per Vercel/Next.js security advisory of 2025-12-11) in our codebase, and we have redeployed the application on the Lightsail instance so that production is no longer running the vulnerable version.

3. **Additional measures:** We have reviewed our deployment and will ensure that the instance and application dependencies are kept up to date. We will also review our Lightsail networking and security group rules to restrict unnecessary outbound access where feasible.

We consider the reported activity to have been the result of the above vulnerability and not intentional misuse. We have taken the steps above to prevent recurrence and to align with the AWS Acceptable Use Policy.

If you need any further information, please let us know.

Regards,  
[Tu nombre]

---

## Referencias

- [Next.js Security Advisory GHSA-9qr9-h5gf-34mp](https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp)
- [Vercel Changelog – CVE-2025-55182](https://vercel.com/changelog/cve-2025-55182)
- [AWS Security Best Practices](https://docs.aws.amazon.com/security/)
