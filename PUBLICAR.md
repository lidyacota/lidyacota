# Cómo publicar y actualizar lidyacota.com

El sitio personal de Lidya Cota se publica con GitHub Pages. Tiene una portada y siete páginas de rubro en cada idioma. Las dos portadas, `index.html` y `en/index.html`, contienen el texto de todos los rubros y sirven de fuente para generar sus páginas.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Portada y contenido fuente en español |
| `en/index.html` | Portada y contenido fuente en inglés |
| `tools/generar-rubros.py` | Genera las catorce páginas de rubro a partir de las portadas |
| `<rubro>/index.html` y `en/<rubro>/index.html` | Páginas de rubro generadas, con título y dirección propios |
| `assets/site.css` | Estilos compartidos |
| `assets/site.js` | Navegación, compatibilidad con enlaces anteriores y acción Compartir |
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

1. Parte de la última versión de la rama `main` del repositorio [lidyacota/lidyacota](https://github.com/lidyacota/lidyacota). Edita el contenido en la portada del idioma correspondiente y actualiza la traducción si el cambio afecta a ambas. Si cambian los datos del perfil, actualiza también `README.md` y `llms.txt`.
2. Desde la raíz del repositorio, ejecuta `python3 tools/generar-rubros.py` y revisa las páginas generadas. Cada rubro tiene un título y una URL que se pueden abrir directamente, también sin JavaScript. Comprueba la navegación con el teclado, el cambio de idioma y que la acción Compartir corresponda a la página abierta. Por ejemplo, los dos enlaces de Emprendimientos son [la página en español](https://www.lidyacota.com/emprendimientos/) y [su versión en inglés](https://www.lidyacota.com/en/ventures/).
3. Conserva los identificadores anteriores de las secciones para quienes guardaron enlaces con fragmentos, como `/#emprendimientos` o `/en/#ventures`. Si cambia una ruta, conserva la correspondencia entre el identificador anterior y el rubro. En `sitemap.xml`, cada portada y cada rubro tienen su propia entrada y enlazan con la misma página en el otro idioma. Actualiza `lastmod` con la fecha de modificación significativa de cada página que haya cambiado.
4. Si reemplazas el retrato de la pestaña, exporta las tres versiones cuadradas y comprueba sus rutas desde `/` y `/en/`.
5. Al editar las páginas, conserva la carga de `assets/analytics.js` en ambos idiomas. El archivo limita la medición a `lidyacota.com` y `www.lidyacota.com` y respeta la desactivación explícita de la propiedad. La configuración de consentimiento permite el almacenamiento analítico y deniega el almacenamiento publicitario, el uso de datos para anuncios y la personalización de anuncios.
6. Publica en la rama `main` los cambios revisados, incluidas las páginas de rubro generadas, y comprueba el resultado en ambos idiomas.
