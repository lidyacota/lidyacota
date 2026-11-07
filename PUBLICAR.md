# Cómo publicar y actualizar lidyacota.com

El sitio personal de Lidya Cota se publica con GitHub Pages. La página principal está en español (`index.html`) y la versión inglesa está en `en/index.html`.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Sitio en español |
| `en/index.html` | Sitio en inglés |
| `assets/site.css` | Estilos compartidos |
| `assets/site.js` | Navegación por pestañas y selección de la sección activa |
| `assets/analytics.js` | Medición de visitas en los dominios de producción |
| `assets/fonts/` | Tipografías alojadas en el propio sitio |
| `img/lidya-cota.webp` | Retrato (900 × 900 px) que se ve en la página |
| `img/lidya-cota.jpg` | El mismo retrato con fondo claro, para la vista previa al compartir el enlace |
| `favicon.ico`, `icon-192.png`, `apple-touch-icon.png` | Versiones cuadradas del retrato para la pestaña del navegador y los accesos directos del móvil |
| `robots.txt` | Permite indexar todo el sitio |
| `sitemap.xml` | Lista de páginas para Google, con sus dos idiomas |
| `llms.txt` | Resumen del sitio para modelos de lenguaje |
| `README.md` | Presentación pública del repositorio, con biografía y palabras clave |
| `CNAME` | Dominio propio: www.lidyacota.com |
| `.nojekyll` | Indica a GitHub Pages que publique los archivos tal cual |

## Publicar por primera vez

1. Sube todos los archivos a un repositorio de GitHub y activa GitHub Pages en *Settings → Pages* (rama `main`, carpeta raíz).
2. En tu proveedor de dominio, apunta `www.lidyacota.com` a GitHub Pages con un registro CNAME hacia `lidyacota.github.io`, y el dominio raíz con los registros A de GitHub Pages. Esto reemplaza a Google Sites.
3. Activa *Enforce HTTPS* en GitHub Pages.
4. Da de alta el sitio en Google Search Console y envía `https://www.lidyacota.com/sitemap.xml`.
5. En la página del repositorio en GitHub, agrega en *About* la descripción, el enlace a www.lidyacota.com y temas (*topics*) como `inteligencia-artificial`, `literatura-digital`, `electronic-literature` y `portfolio`.

## Actualizar

1. Parte de la última versión de la rama `main` del repositorio [lidyacota/lidyacota](https://github.com/lidyacota/lidyacota). Edita la página del idioma correspondiente y actualiza la traducción si el cambio afecta a ambas. Si cambian los datos del perfil, actualiza también `README.md` y `llms.txt`.
2. Mantén el texto de cada sección en el HTML y un enlace a su identificador en la navegación. Con JavaScript, las secciones se recorren mediante pestañas. Sin JavaScript, todas se pueden leer y sus enlaces llevan a la sección correspondiente. Comprueba ambos modos con el teclado, incluidos los enlaces directos a [Emprendimientos](https://www.lidyacota.com/#emprendimientos) y [Ventures](https://www.lidyacota.com/en/#ventures).
3. En `sitemap.xml`, actualiza `lastmod` con la fecha de la modificación significativa de cada página. Si cambió una sola versión, corresponde actualizar solo esa entrada. Los enlaces a secciones de una página utilizan fragmentos y forman parte de la misma URL del mapa.
4. Si reemplazas el retrato de la pestaña, exporta las tres versiones cuadradas y comprueba sus rutas desde `/` y `/en/`.
5. Al editar las páginas, conserva la carga de `assets/analytics.js` en ambos idiomas. El archivo limita la medición a `lidyacota.com` y `www.lidyacota.com` y respeta la desactivación explícita de la propiedad. La configuración de consentimiento permite el almacenamiento analítico y deniega el almacenamiento publicitario, el uso de datos para anuncios y la personalización de anuncios.
6. Publica los cambios revisados en la rama `main` y comprueba el resultado en ambos idiomas.
