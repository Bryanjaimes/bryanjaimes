# Bryan Jaimes — Project Hub

A portfolio hub for projects, career work, and AI-assisted experiments. The site keeps the existing Next.js app and travel route, with a new server-rendered homepage and individual project pages.

The visual theme uses floating glass panels, white and blue accents, and a lightweight SVG/CSS space background. Homepage copy is kept to project summaries, career results, and contact actions. Reduced-motion and backdrop-filter fallbacks are included.

## Run the hub preview (no installation)

```sh
node tools/preview.mjs
```

Open http://127.0.0.1:4173. This server renders the same HTML and uses the same CSS and browser script as the Next.js hub routes. The preview sends the Travel link to the existing live travel page. It does not compile Next.js, exercise its metadata routes, or validate the Google Maps integration.

## Run the full app

With the repository dependencies installed:

```sh
npm ci
npm run dev
npm run build
npm run lint
```

The existing `.npmrc` retains the project's legacy peer-dependency configuration. No new packages were added for the hub.

## Update the content

Edit `src/lib/portfolio.mjs`:

- `profile`: public contact links.
- `projects`: the single catalog for cards, search, filters, project pages, and sitemap entries.
- `career`: roles, dates, accomplishments, and skills.

A project needs a unique `slug`, title, category, kind, description, tags, visual, overview, problem, approach array, and scope. Optional fields are `source`, `demo`, and `attribution`. Only add a demo URL when it actually works. The catalog includes Selected, AI & ML, Platforms, Vibe lab, and Archive groupings; Selected includes all non-archive entries. Filter counts derive from the catalog.

Use `/projects/<slug>` to share a project and `/?category=Vibe%20lab#projects` to share the playground. Search and filter selections are reflected in the URL. Press `/` or Ctrl/Cmd+K to focus search.

## Implementation

- `src/lib/hub-render.mjs`: shared semantic HTML rendering with escaped content.
- `public/hub/hub.css`: responsive hub styles, scoped away from legacy pages.
- `public/hub/stars.svg`: local starfield asset for the glass theme.
- `public/hub/hub.js`: progressive enhancement for search, filtering, mobile navigation, and copy-email feedback.
- `src/app/page.tsx` and `src/app/projects/[slug]/page.tsx`: Next.js server routes.
- `src/app/opengraph-image.tsx`, `sitemap.ts`, and `robots.ts`: search and sharing support.
- `public/demos/pupuseria`: the existing workspace prototype, copied into this project with a return link and a fix for empty initial filter labels.

The homepage does not load a globe, external fonts, animation libraries, or a live GitHub API. It renders useful content before the small enhancement script runs. The project catalog is curated and does not automatically synchronize with GitHub. The old `/opendeploy` route permanently redirects to `/projects/opendeploy`.

## Content provenance and follow-up

The initial catalog combines the existing portfolio, its public GitHub repository links, and the local PupuserIA prototype. Career metrics are retained from the existing portfolio; confirm they remain current before publication. Older repositories have intentionally limited descriptions rather than invented outcomes. Forks carry upstream attribution.

The A-eye link from the old site is not in the observed public repository list. Its page uses a contact action until a current source or demo URL is supplied. The separate public `sasha` repository is listed separately; confirm whether these should be consolidated.

There was no `public/resume.pdf` in the source, so the new hub offers a resume request by email. Add an up-to-date PDF and change the action when available. The OpenDeploy page no longer presents localhost as a public hosted app. Add a real deployed URL to its catalog entry when one is available.

The PupuserIA demo has sample property inventory and rule-based behavior. It makes no network AI calls and is labeled as a prototype. The original workspace prototype is unchanged.

## Validation

```sh
node tools/check-hub.mjs
# With the preview server running:
node tools/check-hub.mjs --http
```

Checks cover unique project paths, primary headings, content escaping, public link schemes, missing resume/localhost links, all 12 project routes, static demo assets, the legacy redirect, and unknown-project 404s.

Browser checks completed: desktop, tablet (768 px), mobile (390 px and 320 px), search and category filtering, no-results reset, mobile menu, project navigation, and the playable demo preset.

The full Next.js production build passes, including TypeScript validation and generation of all 12 project pages. ESLint excludes generated build output; the remaining warnings concern unused declarations in the existing GlobeScene and Hero components.
