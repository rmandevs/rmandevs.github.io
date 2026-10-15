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

`static/brand/rmn-cube.svg` is the original R / M / N isometric cube; `rmn-devs.svg` includes the wordmark. The shared template is `layouts/_partials/cube.html`. Fonts are served locally with their open font licences in `static/fonts/`.

The site supports English and Spanish, native keyboard navigation, visible focus, and reduced-motion preferences. Project content and existing article URLs are preserved from the previous portfolio.
