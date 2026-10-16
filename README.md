# Armando / @rmandevs

Personal portfolio and notebook, built with Astro and deployed to [rmandevs.github.io](https://rmandevs.github.io/).

## Development

Use Node 22.22+ (CI uses Node 24) and pnpm 12.9.1.

```sh
pnpm install
pnpm dev
```

Before publishing:

```sh
pnpm check
pnpm build
pnpm test
```

## Content

- Projects: `src/content/projects/*.md`. Required properties: title, summary, date, repo (`owner/name`), language, license and category (`Tool`, `Agent skill`, `Design system`).
- Notebook: `src/content/blog/*.md`. Properties: title, summary, date, optional updated date, draft, type (`Note`, `Article`, `Experiment`) and tags. The default is **draft**; set `draft: false` to publish. Drafts are excluded from pages, RSS and the sitemap.
- Profile and social links: `src/config.ts`.
- Appearance: `src/styles/global.css`. Paper Mono is served locally under its included SIL OFL licence.

The original Hello, world article is retained as a draft because it had been removed from the Notion notebook. The public portfolio uses English only.

## GitHub Pages

The repository must be named **rmandevs.github.io** for the root URL. In Settings → Pages, choose **GitHub Actions** as the source. Pushes to main validate and deploy; pull requests run validation only. No paid hosting, runtime API keys or font secrets are needed.

Astro's `site` is `https://rmandevs.github.io`; no `/web` base path is configured. Project permalinks are `/projects/<slug>/`; notebook permalinks use `/blog/<slug>/`.

## Publication controls

Pull requests only validate the site. Artifact uploads and deployments require a push or manual run on `main` in this repository. Actions are pinned to commit SHAs; the build token has read-only contents access and checkout does not persist credentials. Only the deployment job receives Pages and OIDC write permissions.

`.github/CODEOWNERS` identifies `@rmandevs` as the reviewer for every file. It does **not** enforce approval on its own.

Repository settings still need to enforce a ruleset for `main`: require pull requests, owner review, the `build` check, dismissal of stale approvals, and resolved conversations; block force pushes and deletion. Allow an explicit administrator bypass so the sole owner can merge their own work. In the `github-pages` environment, restrict deployment branches to `main`. These administrative settings are not activated by committing files.
