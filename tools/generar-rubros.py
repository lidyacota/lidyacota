"""Genera las páginas compartibles a partir de las portadas en español e inglés."""
import argparse
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://www.lidyacota.com"

# Las claves son los identificadores de los paneles y del menú en las dos portadas.
# Las descripciones se utilizan exclusivamente en buscadores y tarjetas al compartir.
SECTIONS = (
    ("sobre-mi", "about",
     "Soy Lidya Cota. He dirigido proyectos de inteligencia artificial y datos, he diseñado y operado un negocio en línea y realizo obras de literatura digital.",
     "I’m Lidya Cota. I have led artificial intelligence and data projects, built and run an online business and produced works of digital literature."),
    ("emprendimientos", "ventures",
     "Poescrítika, la escuela de literatura en línea que cofundé, y Sun Namaskar, la aplicación que programé para iPhone y iPad.",
     "Poescrítika, the online literature school I co-founded, and Sun Namaskar, the app I built for iPhone and iPad."),
    ("habilidades", "skills",
     "Mis habilidades en inteligencia artificial, análisis de datos, dirección de proyectos tecnológicos y operación de negocios digitales.",
     "My skills in artificial intelligence, data analysis, technology project management and running online businesses."),
    ("trayectoria", "experience",
     "Mi trayectoria profesional en innovación, dirección de proyectos de inteligencia artificial y datos, programación SAP y soporte técnico.",
     "My professional experience in innovation, leading artificial intelligence and data projects, SAP programming and technical support."),
    ("formacion", "education",
     "Mi formación en el Instituto Politécnico Nacional, mi investigación en redes semánticas naturales, mis certificaciones y mis idiomas.",
     "My studies at the Instituto Politécnico Nacional, research on natural semantic networks, certifications and languages."),
    ("literatura-digital", "digital-literature",
     "En mis obras de literatura digital, la programación, la animación, la voz y la música transforman la forma de leer y recorrer la poesía.",
     "In my digital literature works, code, animation, voice and music transform the way poetry is read and explored."),
    ("contacto", "contact",
     "Cómo escribirme para colaboraciones, presentaciones o consultas. Aquí encontrarás también mi ORCID y mi perfil profesional.",
     "Get in touch for collaborations, talks or inquiries. You can also find my ORCID and professional profile here."),
)

PANEL = re.compile(r'^    <section\b(?=[^>]*\bclass="panel")(?=[^>]*\bid="([^"]+)")[^>]*>.*?^    </section>\n', re.M | re.S)


def replace_one(source, pattern, replacement):
    result, count = re.subn(pattern, lambda _: replacement, source, flags=re.S)
    if count != 1:
        raise ValueError(f"Se esperaba una coincidencia de {pattern!r} y se encontraron {count}.")
    return result


def render(source, language, entry):
    es, en, desc_es, desc_en = entry
    paths = {"es": f"/{es}/", "en": f"/en/{en}/"}
    spanish = language == "es"
    slug = es if spanish else en
    other = "en" if spanish else "es"
    home = "/" if spanish else "/en/"
    url = ORIGIN + paths[language]
    description = desc_es if spanish else desc_en

    panels = {match[1]: match[0] for match in PANEL.finditer(source)}
    expected = {row[0 if spanish else 1] for row in SECTIONS}
    if panels.keys() != expected:
        raise ValueError("Los rubros de la portada no coinciden con los de SECTIONS.")
    panel = panels[slug]
    heading = re.search(r'<h2([^>]*)>([^<]+)</h2>', panel)
    name = heading[2]
    title = f"{name} | Lidya Cota"
    attrs = heading[1].replace(' class="visually-hidden"', '')
    primary = f'<h1{attrs}>{name}</h1>'
    if 'visually-hidden' in heading[1]:
        primary = f'<div class="banda">{primary}<span class="trazo" aria-hidden="true"></span></div>'
    panel = panel.replace(heading[0], primary, 1)

    page = PANEL.sub(lambda m: panel if m[1] == slug else '', source)
    page = replace_one(page, r'  <section class="hero"[^>]*>.*?</section>\s*', '')
    page = replace_one(page, r'<a class="brand" href="[^"]+">', f'<a class="brand" href="{home}">')
    page = replace_one(page, rf'<a href="[^"]+" hreflang="{other}"', f'<a href="{paths[other]}" hreflang="{other}"')
    page = replace_one(page, f'data-target="{slug}"', f'data-target="{slug}" aria-current="page"')

    page = replace_one(page, r'<title>.*?</title>', f'<title>{escape(title)}</title>')
    page = replace_one(page, r'<link rel="canonical" href="[^"]+">', f'<link rel="canonical" href="{url}">')
    for tag, path in {**paths, "x-default": paths["es"]}.items():
        prefix = f'<link rel="alternate" hreflang="{tag}" href="'
        page = replace_one(page, re.escape(prefix) + '[^"]+">', prefix + ORIGIN + path + '">')

    properties = {"og:type": "website", "og:url": url, "og:title": title, "og:description": description,
                  "twitter:title": title, "twitter:description": description, "description": description}
    for key, value in properties.items():
        attr = "property" if key.startswith("og:") else "name"
        prefix = f'<meta {attr}="{key}" content="'
        page = replace_one(page, re.escape(prefix) + '[^"]*">', prefix + escape(value, quote=True) + '">')
    page = re.sub(r'<meta property="profile:[^"]+"[^>]*>\n', '', page)

    schema_type = {"sobre-mi": "AboutPage", "contacto": "ContactPage"}.get(es, "WebPage")
    schema = {
        "@context": "https://schema.org", "@type": schema_type, "@id": url + "#page",
        "url": url, "name": title, "description": description, "inLanguage": language,
        "isPartOf": {"@id": ORIGIN + "/#sitio"}, "about": {"@id": ORIGIN + "/#persona"},
    }
    structured = json.dumps(schema, ensure_ascii=False, indent=2)
    return replace_one(page, r'<script type="application/ld\+json">.*?</script>',
                       f'<script type="application/ld+json">\n{structured}\n</script>')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Comprueba los archivos sin escribirlos.")
    args = parser.parse_args()
    stale = []
    for language, folder, slug_index in (("es", ROOT, 0), ("en", ROOT / "en", 1)):
        source = (folder / "index.html").read_text(encoding="utf-8")
        for entry in SECTIONS:
            output = folder / entry[slug_index] / "index.html"
            generated = render(source, language, entry)
            if output.is_file() and output.read_text(encoding="utf-8") == generated:
                continue
            if args.check:
                stale.append(str(output.relative_to(ROOT)))
            else:
                output.parent.mkdir(parents=True, exist_ok=True)
                output.write_text(generated, encoding="utf-8")
    if stale:
        raise SystemExit("Es necesario regenerar " + ", ".join(stale))


if __name__ == "__main__":
    main()
