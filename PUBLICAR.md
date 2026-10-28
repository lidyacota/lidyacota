# Cómo publicar y actualizar lidyacota.com

Página única en español (`index.html`) y su versión en inglés (`en/index.html`), publicada con GitHub Pages.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Sitio en español |
| `en/index.html` | Sitio en inglés |
| `assets/site.css` | Estilos compartidos |
| `assets/site.js` | Movimiento suave al leer y menú activo |
| `assets/fonts/` | Tipografías Newsreader y Schibsted Grotesk, alojadas en el propio sitio |
| `img/lidya-cota.webp` | Retrato (900 × 900 px) que se ve en la página |
| `img/lidya-cota.jpg` | El mismo retrato con fondo claro, para la vista previa al compartir el enlace |
| `favicon.svg` | Ícono de la pestaña |
| `robots.txt` | Permite indexar todo el sitio |
| `sitemap.xml` | Lista de páginas para Google, con sus dos idiomas |
| `llms.txt` | Resumen del sitio para modelos de lenguaje |
| `README.md` | Presentación pública del repositorio, con biografía y palabras clave |
| `CNAME` | Dominio propio: www.lidyacota.com |
| `.nojekyll` | Indica a GitHub Pages que publique los archivos tal cual |

## Publicar

1. Sube todos los archivos a un repositorio de GitHub y activa GitHub Pages en *Settings → Pages* (rama `main`, carpeta raíz).
2. En tu proveedor de dominio, apunta `www.lidyacota.com` a GitHub Pages con un registro CNAME hacia `lidyacota.github.io`, y el dominio raíz con los registros A de GitHub Pages. Esto reemplaza a Google Sites.
3. Activa *Enforce HTTPS* en GitHub Pages.
4. Da de alta el sitio en Google Search Console y envía `https://www.lidyacota.com/sitemap.xml`.
5. En la página del repositorio en GitHub, agrega en *About* la descripción, el enlace a www.lidyacota.com y temas (*topics*) como `inteligencia-artificial`, `literatura-digital`, `electronic-literature` y `portfolio`.

## Actualizar

Cambia el texto en las dos versiones (`index.html` y `en/index.html`), en `README.md`, en `llms.txt` y en la fecha `lastmod` de `sitemap.xml`.
