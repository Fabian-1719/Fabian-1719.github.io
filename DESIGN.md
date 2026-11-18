---
name: Fabian Aragón Arce · Portfolio
description: A hand-built pixel world that lives a full day while you read, behind framed pixel panels.
colors:
  ink: "#151229"
  parchment-line: "#f1e6cc"
  dusk-line: "#6a5f8c"
  text: "#f4efe4"
  text-soft: "#cdc6df"
  leaf-meta: "#a4dc72"
  gold: "#ffcf5c"
  gold-hi: "#ffe08f"
  gold-ink: "#2a1a00"
  gold-edge: "#b8862a"
  sky-day: "#3a7bd5"
typography:
  display:
    fontFamily: "Pixelify Sans, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 1.6rem + 4.6vw, 5.2rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "0em"
  headline:
    fontFamily: "Pixelify Sans, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 1.2rem + 1.6vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0em"
  title:
    fontFamily: "Pixelify Sans, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 1.15rem + 1vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(1rem, .97rem + .15vw, 1.08rem)"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1rem + .4vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Pixelify Sans, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Pixelify Sans, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  none: "0px"
spacing:
  px: "4px"
  frame-inset: "8px"
  gutter: "clamp(16px, 4vw, 56px)"
  panel-pad: "clamp(22px, 2.4vw, 34px)"
  panel-gap: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: ".72em 1.1em"
  button-primary-hover:
    backgroundColor: "{colors.gold-hi}"
    textColor: "{colors.gold-ink}"
  button-primary-sm:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    padding: ".56em .9em"
  link:
    textColor: "{colors.gold}"
  link-hover:
    textColor: "{colors.gold-hi}"
  panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "{spacing.panel-pad}"
    width: "min(560px, 46vw)"
  panel-wide:
    backgroundColor: "{colors.ink}"
    width: "min(660px, 52vw)"
  top-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.text}"
    padding: "10px {spacing.gutter}"
  lang-toggle:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.text-soft}"
    rounded: "{rounded.none}"
  lang-toggle-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    padding: "4px 9px"
  clock-hud:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.parchment-line}"
    typography: "{typography.label}"
    padding: "6px 12px"
---

# Design System: Fabian Aragón Arce · Portfolio

## Overview

**Creative North Star: "The Day-Long Overworld"**

The page is a single hand-built pixel landscape, drawn in code at low resolution and scaled with nearest-neighbour, that lives one day while the visitor reads. Scroll is the clock: it walks the camera from a cliff-top tower at morning, past the lake and waterfall, through a forest clearing with a sword in a pedestal, across a sunset village, to a hill campfire under the stars, and it carries the time from 07:00 to 22:00. Everything in the world is an indexed palette role; time of day remaps the whole palette, and colour-cycle groups keep water, falls and fire alive.

Content never competes with the world for its own ground. It sits in dark framed windows that read like a game's dialogue box: ink fill, a parchment line between two dark rings, a thin dusk-violet inner rule. Inside them, Pixelify Sans carries names, headings and meta lines, and Atkinson Hyperlegible carries every sentence a visitor must read. Gold appears only on things you can click, so the eye learns the one rule in the first viewport.

The density is low and deliberate: one panel per section, long open stretches of world between panels, a frame rate held around 14 fps so cycling reads as pixel art rather than video. The rejected first world (a vector Night to Day landscape mirroring the GitHub banner) is the confirmed anti-reference: no smooth vector polygons, no CSS gradient skies.

**Key Characteristics:**
- Indexed-colour canvas world, about 190 logical pixels tall, integer-scaled (min 2x), `image-rendering: pixelated`.
- Five time keys (morning, day, golden, dusk, night) remap every palette role; scroll drives both camera and time.
- Ordered Bayer dithering and hashed stipple stand in for every gradient and haze.
- Framed ink panels with a stepped 4px double ring; square corners everywhere.
- Gold is reserved for clickables; leaf green for meta; parchment for headings and frame lines.
- Pixelify Sans for display and meta, Atkinson Hyperlegible for body.

## Colors

A night-ink interface laid over a full-spectrum, time-keyed pixel world; the UI palette is small and fixed, the world palette moves.

### Primary
- **Key-Cap Gold** (`gold`): the one interactive colour. Button fill, link text and underline, the active EN/ES option, the focus outline, text selection, the skip link. Its hover is **Lamplight Gold** (`gold-hi`); text on gold is **Burnt Umber Ink** (`gold-ink`); the button's stepped base is **Brass Edge** (`gold-edge`).

### Secondary
- **Leaf Meta Green** (`leaf-meta`): meta lines only. Project "who" lines, about-focus terms, inventory category labels, and the 6px square bullets in quest fact lists. Never clickable, never body text.

### Neutral
- **Night Ink** (`ink`): ground of every panel, the top bar, the footer, the clock and the scrollbar track. Also the `theme-color`.
- **Parchment Line** (`parchment-line`): the middle ring of every panel frame, all h1 to h3 headings, the handle, the clock time.
- **Dusk Line** (`dusk-line`): the panel's inner 2px rule, dashed 4px dividers, the bar's 4px under-edge, the footer's top edge, the lang toggle border, the scrollbar thumb.
- **Warm Paper Text** (`text`): lead paragraphs, the hero lede, inventory values.
- **Lavender Soft Text** (`text-soft`): secondary paragraphs, nav links at rest, the clock's word label, the "private repository" note.
- **Day Sky Blue** (`sky-day`): the `html` background behind the canvas, so overscroll and first paint match the day sky.

### The World Palette
The canvas owns its own palette in `js/world.js`, separate from the UI tokens. About 50 roles (far range lit/mid/haze/snow, hills, four leaf tones with outline, pine, trunk, grass, soil, path, rock, stone, roof, wood, glass, lamp, flowers, foam, tent, sword blade/hilt/gem, three cloud tones), each with explicit day, golden, dusk and night keys; morning is derived per role as 62% day + 38% golden. Five sky bands carry their own five-key ramp. Cycle groups: water (4 steps, 5 Hz), waterfall (4 steps, 11 Hz), fire (3 steps, 8 Hz). Window glass, lamps, fire and the ground around the fire brighten toward night rather than darken.

### Named Rules
**The Gold Means Click Rule.** Gold (and its hover, edge and ink) appears only on elements a visitor can activate, plus the focus ring and selection that serve them. A gold non-interactive element is a bug.

**The Palette Role Rule.** Every world pixel is a palette role index, never a literal colour. Time of day changes the palette, not the pixels.

## Typography

**Display Font:** Pixelify Sans (variable 400 to 700, with Atkinson Hyperlegible, system-ui fallback)
**Body Font:** Atkinson Hyperlegible (400, 700)

**Character:** A pixel face with game-UI cadence for anything named or labelled, and a legibility-first humanist sans for every sentence. The pixel face never sets running prose.

### Hierarchy
- **Display** (700, `clamp(2.8rem, 1.6rem + 4.6vw, 5.2rem)`, 0.95): the hero name only. The contact sign-off ("Pura vida.") uses a sibling size, `clamp(2.6rem, 1.6rem + 4vw, 4.6rem)`.
- **Headline** (700, `clamp(1.7rem, 1.2rem + 1.6vw, 2.5rem)`, 1.05): panel h2s, balanced wrap, parchment.
- **Title** (700, `clamp(1.45rem, 1.15rem + 1vw, 2rem)`, 1.05): quest (project) names.
- **Lede** (Atkinson 400, `clamp(1.08rem, 1rem + .4vw, 1.3rem)`): the hero positioning line.
- **Body** (Atkinson 400, `clamp(1rem, .97rem + .15vw, 1.08rem)`, 1.6): paragraphs, capped at 62ch inside panels, `text-wrap: pretty`. Inventory values use Atkinson 700 at 1.12rem, line-height 1.45.
- **Label** (Pixelify 400 to 700, 0.9 to 1.1rem): meta lines, stack lines, nav, lang toggle (700 .85rem), clock (700 .95rem, tabular numerals), focus terms (700 1.1rem).

### Named Rules
**The Two Voices Rule.** Pixelify Sans names and labels; Atkinson Hyperlegible explains. If a line is read as a sentence, it is Atkinson.

**The No Tracking Rule.** Pixelify sets at letter-spacing 0; it is a pixel grid and spacing it out breaks the grid.

## Layout

One full-viewport `.scene` per section, each holding a single framed panel in the left reading column (`min(560px, 46vw)`, wide variant `min(660px, 52vw)` for projects). Scenes start below the fixed bar (112px top padding) and leave large open stretches of world beneath each panel (24vh; 34vh after the long projects panel; the contact scene is 112svh tall) so the landscape is seen between reads. The hero panel is vertically centred. The side gutter is `clamp(16px, 4vw, 56px)` and the frame step `--px` is 4px; every frame ring, divider, focus outline and button base is a multiple of it.

The camera is section-anchored, not linear: `main.js` maps scroll progress to world places (tower, falls, sword, bridge, village, fire) so each section brings its own place into view beside the panel (focus 0.66 of the viewport on wide screens). Time is linear across the full scroll: 07:00 to 22:00; palette keys hold day to 42%, then golden at 60%, dusk at 76%, night from 90%.

**Responsive.** At 860px and below panels go full width, the hero panel anchors to the bottom of the first viewport (28px padding) so the tower shows above it, the open stretch after every panel grows to 50vh, and the camera anchors switch to "panel end" so each place centres (focus 0.5) in the open stretch below its panel. At 760px and below the section nav is hidden and the clock moves into the top bar, centred, frameless, time only.

## Elevation & Depth

Depth is pixel-UI depth: zero-blur, one-step solid offsets and stacked rings, never soft shadows. The world supplies atmospheric depth with three parallax layers (far range 0.25, hills 0.55, main walk 1.0) and a dithered mist band in front of the far range.

### Shadow Vocabulary
- **Panel frame** (`box-shadow: 0 0 0 4px ink, 0 0 0 8px parchment-line, 0 0 0 12px ink`): three concentric rings, every panel.
- **Key-cap base** (`box-shadow: 0 4px 0 gold-edge`): under gold buttons; collapses to 0 on press.
- **Bar edge** (`box-shadow: 0 4px 0 dusk-line`): under the top bar; mirrored as `0 -4px 0` above the footer.
- **HUD ring** (`box-shadow: 0 0 0 4px dusk-line`): the clock on wide screens.

### Named Rules
**The Stepped Depth Rule.** Every UI shadow has zero blur and offsets in whole `--px` steps. A blurred shadow is foreign to this world. (The detector's hard-offset-shadow rule is suppressed for `css/style.css` for exactly this reason.)

## Shapes

Square everywhere (0px radius). Frames are concentric rectangles; dividers are 4px dashed dusk lines; list bullets are 6px squares; the one icon (the down arrow in the hero button) is a 16-unit pixel path drawn with `shape-rendering: crispEdges`. Sprites (the fairy, 9x8) snap to the world's pixel grid so they never sit between pixels.

## Components

### Buttons
Tactile key-caps that press down.
- **Shape:** square (0px).
- **Primary:** gold fill, burnt-umber ink, Pixelify 700 1rem/1, padding .72em 1.1em, brass edge 4px below.
- **Hover:** fill lightens to lamplight gold (fine pointers only).
- **Active:** translates down 4px while the base collapses to 0, 120ms ease-out: the cap is physically pressed.
- **Small:** .92rem, padding .56em .9em, used for "Live site" in project entries.
- **Focus:** 4px gold outline, 2px offset (global `:focus-visible`).

### Links
- **Style:** gold Pixelify 600, 2px underline offset 5px; hover to lamplight gold. Always underlined, so gold text is never the only cue.

### Cards / Containers (Framed Panel)
- **Corner Style:** square.
- **Background:** night ink.
- **Shadow Strategy:** the panel frame rings (see Elevation).
- **Border:** an inner 2px dusk-line rule inset 8px.
- **Internal Padding:** `clamp(22px, 2.4vw, 34px)`, grid gap 1rem.
- **Entrance:** none. Panels are simply there; the world is what moves.

### Navigation (Top Bar)
- Fixed, ink, 10px vertical padding, 4px dusk under-edge. Handle in parchment Pixelify 700 left; section links in soft text, gold on hover; EN/ES toggle right.
- **EN/ES toggle:** one button, 4px dusk border, two Pixelify 700 .85rem options; the active language is a gold cell. Scales to .97 on press.
- **Mobile (760px and below):** links hidden; clock centred in the bar.

### Quest Entry
A project as a quest-log entry: Pixelify title in parchment, a leaf-green "who" line, an Atkinson description, square-bulleted facts in soft text, a Pixelify stack line, then actions (small gold button for live sites, gold underlined links for code, a plain "private repository" note when there is no link). Entries are separated by 4px dashed dusk dividers.

### Inventory Rows
The stack as an inventory: dashed-divider rows with a leaf-green Pixelify category and an Atkinson 700 value list in warm text. The about-section focus list uses the same row grammar.

### Clock HUD
A fixed game HUD, bottom-right on wide screens (never over the left reading column): ink fill, 4px dusk ring, parchment Pixelify 700 time with tabular numerals and a soft-text word for the time of day (morning, afternoon, sunset, dusk, night; localised). `aria-hidden`.

### Pointer Fairy
A 9x8 two-frame sprite (pale blue wings, cyan body) that follows the pointer on a damped spring, flaps every 140ms, bobs, snaps to the world pixel grid and sleeps when idle. Hover-and-fine-pointer devices only; removed under reduced motion.

### The World (signature)
`js/world.js` draws the far range, hills and main walk into indexed buffers 1200 logical pixels wide and 200 tall, bottom-aligned to the viewport; scale is `max(2, round(viewport height / 190))`. Sky is five bands dithered with a 4x4 Bayer matrix; mist and rock speckle use hashed stipple. The sun arcs across the first 82% of the scroll and sets warm; stars, a three-triangle constellation, fireflies and lit windows fade in with night; birds fly by day; embers rise from the campfire after 60%. The loop runs on requestAnimationFrame but renders at about 14 fps unless scroll marks it dirty.

**Known ceiling (shipped without, not rules):** the lake has no reflections, the sky bands are dithered but not colour-cycled, there is no chimney smoke in the village, panels use ring shadows rather than notched 9-slice pixel corners, and the valley mist reads more as grain than haze. These are open improvements, not part of the system to defend.

## Do's and Don'ts

### Do:
- **Do** reserve gold for clickable things, their focus ring and selection.
- **Do** build every frame, divider, outline and offset from the 4px `--px` step.
- **Do** set headings, labels and meta in Pixelify Sans and every sentence in Atkinson Hyperlegible.
- **Do** add world detail as palette roles with day, golden, dusk and night keys, and animate liquids and fire by cycling roles, not by moving pixels.
- **Do** dither (Bayer or hashed stipple) wherever a gradient or haze is wanted.
- **Do** keep world motion at the low ~14 fps cadence and keep scroll as the only clock.
- **Do** under reduced motion, freeze cycling, birds, twinkle and sprites and remove the fairy, but keep scroll-driven time and camera.
- **Do** keep Zelda allusions small and original: a sword in a pedestal, a three-triangle constellation, a pointer fairy, all drawn pixel by pixel in code.

### Don't:
- **Don't** add entrance animations to panels or content.
- **Don't** use rounded corners or blurred shadows anywhere in the UI.
- **Don't** use CSS gradients or smooth vector shapes for the world; the rejected vector Night to Day landscape is the anti-reference.
- **Don't** use gold for decoration, headings or meta.
- **Don't** set body paragraphs in Pixelify Sans or track it out.
- **Don't** copy game assets, logos, characters or music for the Zelda nods.
- **Don't** let the clock or any fixed HUD cover the left reading column on wide screens.
