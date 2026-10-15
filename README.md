# RMN Devs

Personal portfolio for [@rmandevs](https://github.com/rmandevs), built with Hugo.

**Live:** https://rmandevs.github.io/web/ · [Español](https://rmandevs.github.io/web/es/)

## Development

Install **Hugo 0.168.0** (standard edition is sufficient), then run:

```sh
python3 scripts/embed_fonts.py --font-dir /path/to/your/licensed/woff2/fonts
hugo server --disableFastRender
```

Production build:

```sh
python3 scripts/embed_fonts.py --font-dir /path/to/your/licensed/woff2/fonts
hugo --gc --minify --panicOnWarning
python3 scripts/check_site.py public
```

Content lives in `content/en/` and `content/es/`; project front matter supplies its title, summary, repository, language, licence and date. Edit both translations when changing a project. Shared templates live in `layouts/`, design in `assets/css/main.css`, and original vector artwork in `layouts/_partials/`.

## Publishing

Pushes to `main` build and deploy using `.github/workflows/pages.yml`. GitHub Pages must use **GitHub Actions** as its source. The workflow derives the deployment base URL from Pages settings, so project paths remain correct. No Node dependencies or third-party runtime services are needed.

## Typography and presentation

On the homepage, only the name uses Timeless Serif Book; all other headings and interface text use Paper Mono Regular and SemiBold. Blog titles use Timeless Serif Book, and article prose uses Timeless Serif Text Book (Text Bold for emphasis). The default theme is dark, with a compact project list, a short bio and recent notes. Project names remain identical in both languages. There are no illustrations, top navigation bar, project numbers or copyright labels.

Paper Mono is served locally; its SIL OFL licence is in `static/fonts/PaperMono-OFL.txt`. Timeless is embedded into the final stylesheet during the build. Its files and the generated `assets/css/embedded-fonts.css` are excluded from Git history. Obtain the fonts and their licence from https://timeless.co/type. For local builds, pass a directory containing `TimelessSerif-Book.woff2`, `TimelessSerif-TextBook.woff2` and `TimelessSerif-TextBold.woff2` to `scripts/embed_fonts.py`. Pages supplies their base64 payloads through the `TIMELESS_TITLE_WOFF2`, `TIMELESS_TEXT_WOFF2` and `TIMELESS_TEXT_BOLD_WOFF2` build secrets.

The earlier cube assets remain stored for later use, with their Chango OFL notice, and are not rendered on the live website.

The site supports English and Spanish, native keyboard navigation and visible focus. Existing article and project URLs are preserved.
