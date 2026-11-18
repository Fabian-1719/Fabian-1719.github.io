# Fabian Aragón Arce — Portfolio

Personal portfolio of a Computer Engineering student at Instituto Tecnológico de Costa Rica.

**Live:** https://fabian-1719.github.io

A hand-built pixel world that lives a full day while you read: the camera walks from a cliff-top tower at morning to a campfire under the stars, and the water, waterfall and fire are animated with classic palette cycling. Every project has its own page, set at its own place and hour of the world.

## Built with

- [Astro](https://astro.build) + TypeScript (strict), static output
- The world is drawn pixel by pixel in `src/scripts/world.ts` (indexed colours, dithering, colour cycling) — no images
- Self-hosted fonts: Pixelify Sans and Atkinson Hyperlegible
- English and Spanish, switchable from the top bar
- Respects `prefers-reduced-motion`
- Deployed by GitHub Actions on every push to `main`

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321. `npm run build` type-checks and builds to `dist/`.

## Add or edit a project

Projects live in `src/data/projects.ts`. Each entry generates its card on the home page and its own page at `/projects/<slug>/`:

- `summary`, `details`, `facts` — text in English and Spanish
- `stack`, `live`, `code`, `private` — tags and links
- `images` — screenshots; put the files in `public/projects/<slug>/` and list them as `{ src: "/projects/<slug>/shot.png", alt: { en, es } }`
- `world` — where and when the pixel world stands on that page (`place` and `time`, 0 = 07:00, 1 = 22:00)

## Structure

```
src/data/projects.ts       every project (typed)
src/i18n.ts                page strings in English and Spanish
src/layouts/Base.astro     shared page frame: world canvas, top bar, footer, clock
src/pages/index.astro      home
src/pages/projects/[slug].astro   one page per project
src/scripts/world.ts       the pixel world renderer
src/scripts/main.ts        scroll, clock, language switch, fairy
src/styles/global.css      design tokens and layout
public/                    fonts and favicon
```
