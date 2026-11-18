# Fabian Aragón Arce — Portfolio

Personal portfolio of a Computer Engineering student at Instituto Tecnológico de Costa Rica.

**Live:** https://fabian-1719.github.io

Scroll is time: the page opens at midnight over the Arenal volcano and ends at noon. A small clock in the corner follows you from 00:00 to 12:00.

## Built with

- Plain HTML, CSS and JavaScript — no frameworks, no build step
- Self-hosted fonts: Bricolage Grotesque and JetBrains Mono
- English and Spanish, switchable from the top bar
- Respects `prefers-reduced-motion`

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html        page content (English is the default text)
css/style.css     design tokens, layout and animation
js/main.js        scroll-driven sky, clock, language switch, fairy
assets/           fonts and favicon
```

Spanish text lives in the `ES` dictionary at the top of `js/main.js`.
