# RMN Devs

Personal portfolio for [@rmandevs](https://github.com/rmandevs), built with Hugo.

**Live:** https://rmandevs.github.io/web/ · [Español](https://rmandevs.github.io/web/es/)

## Development

Install **Hugo 0.168.0** (standard edition is sufficient), then run:

```sh
hugo server --disableFastRender
```

Production build:

```sh
hugo --gc --minify --panicOnWarning
python3 scripts/check_site.py public
```

Content lives in `content/en/` and `content/es/`; project front matter supplies its title, summary, repository, language, licence and date. Edit both translations when changing a project. Shared templates live in `layouts/`, design in `assets/css/main.css`, and original vector artwork in `layouts/_partials/`.

## Publishing

Pushes to `main` build and deploy using `.github/workflows/pages.yml`. GitHub Pages must use **GitHub Actions** as its source. The workflow derives the deployment base URL from Pages settings, so project paths remain correct. No Node dependencies or third-party runtime services are needed.

## Identity

`static/brand/rmn-cube.svg` is the R / M / N isometric cube; `rmn-devs.svg` includes the Devs wordmark. Both use outlined Chango letters, licensed under SIL OFL 1.1. The cube and wordmark assets are retained for later use; the live portfolio currently has no cube, illustrations or top navigation bar. Their shared templates are `layouts/_partials/cube.html` and `layouts/_partials/logo.html`. Fonts are served locally with their open font licences in `static/fonts/`.

The homepage is a direct portfolio: a compact project index with text rows, a short bio and recent notes. No promotional hero, animated ticker or sales CTA.

The site supports English and Spanish, native keyboard navigation, visible focus, and reduced-motion preferences. Project content and existing article URLs are preserved from the previous portfolio.
