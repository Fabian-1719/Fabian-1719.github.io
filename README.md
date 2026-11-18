# Fabian Aragón Arce — Portfolio

Personal portfolio of a Computer Engineering student at Instituto Tecnológico de Costa Rica.

**Live:** https://fabian-1719.github.io

A hand-built pixel world that lives a full day while you read: the camera walks from a cliff-top tower at morning to a campfire under the stars, and the water, waterfall and fire are animated with classic palette cycling. A small clock follows the day from 07:00 to 22:00.

## Built with

- Plain HTML, CSS and JavaScript — no frameworks, no build step
- The world is drawn pixel by pixel in `js/world.js` (indexed colours, dithering, colour cycling) — no images
- Self-hosted fonts: Pixelify Sans and Atkinson Hyperlegible
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
js/world.js       the pixel world renderer
js/main.js        scroll, clock, language switch, fairy
assets/           fonts and favicon
```

Spanish text lives in the `ES` dictionary at the top of `js/main.js`.
