/* Fabian Aragón Arce · portfolio
   Scroll drives the pixel world: the camera walks it and the day runs out.
   Project pages pin the world to one place and hour instead. */
import { PixelWorld } from "./world";
import { CLOCK } from "../i18n";

type Lang = "en" | "es";
type Anchor = [number, number];

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* ---------------- Language: English in the HTML, Spanish in data-es ---------------- */
const texts = [...document.querySelectorAll<HTMLElement>("[data-es]")];
texts.forEach((el) => { el.dataset.en = el.textContent ?? ""; });
const alts = [...document.querySelectorAll<HTMLImageElement>("img[data-es-alt]")];
alts.forEach((img) => { img.dataset.enAlt = img.alt; });
const labels = [...document.querySelectorAll<HTMLElement>("[data-es-label]")];
labels.forEach((el) => { el.dataset.enLabel = el.getAttribute("aria-label") ?? ""; });

const store = {
  get(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* storage blocked: the switch still works for this visit */ } }
};
const saved = store.get("lang");
let lang: Lang = saved === "es" || saved === "en" ? saved : (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
const langBtn = $<HTMLButtonElement>("#lang")!;

function applyLang(next: Lang) {
  lang = next;
  document.documentElement.lang = lang;
  texts.forEach((el) => { const v = lang === "es" ? el.dataset.es : el.dataset.en; if (v != null) el.textContent = v; });
  alts.forEach((img) => { const v = lang === "es" ? img.dataset.esAlt : img.dataset.enAlt; if (v) img.alt = v; });
  labels.forEach((el) => { const v = lang === "es" ? el.dataset.esLabel : el.dataset.enLabel; if (v) el.setAttribute("aria-label", v); });
  langBtn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  lastClock = "";
  update();
}
langBtn.addEventListener("click", () => { const n: Lang = lang === "en" ? "es" : "en"; store.set("lang", n); applyLang(n); });

/* ---------------- World + clock ---------------- */
PixelWorld.init($<HTMLCanvasElement>("#world")!, { reduce: reduceMotion });
const pinned = document.body.dataset.worldPlace as keyof typeof PixelWorld.places | undefined;
const pinnedTime = Number(document.body.dataset.worldTime ?? NaN);
const clockTime = $("#clockTime")!, clockLabel = $("#clockLabel")!;
let lastClock = "", ticking = false;

// The footer would cover the ground at the very end, so the day (and the walk to the
// campfire) finishes just as the footer starts to rise.
function scrollMax(): number {
  const max = document.documentElement.scrollHeight - innerHeight;
  const foot = document.querySelector<HTMLElement>(".foot");
  return Math.max(1, max - (foot?.offsetHeight ?? 0));
}
function progress(): number {
  if (pinned) return clamp(pinnedTime);
  const max = scrollMax();
  return max > 0 ? clamp(scrollY / max) : 0;
}
function update() {
  ticking = false;
  const p = progress();
  PixelWorld.setProgress(p);
  const minutes = Math.round(420 + p * 900); // 07:00 → 22:00
  const t = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  const hrs = minutes / 60;
  const idx = hrs < 12 ? 0 : hrs < 17 ? 1 : hrs < 18.5 ? 2 : hrs < 20 ? 3 : 4;
  const key = `${t}|${idx}|${lang}`;
  if (key !== lastClock) { clockTime.textContent = t; clockLabel.textContent = CLOCK[lang][idx]; lastClock = key; }
  if (document.documentElement.dataset.hour !== String(idx)) document.documentElement.dataset.hour = String(idx);
}

// Each home section brings its own place into view: beside the panel on wide screens,
// in the open stretch of world below each panel on phones.
function anchors() {
  const P = PixelWorld.places, phone = innerWidth < 860;
  if (pinned) { PixelWorld.setAnchors([[0, P[pinned]], [1, P[pinned]]], phone ? 0.5 : 0.66); return; }
  const max = scrollMax();
  if (max <= 0) return;
  const at = (el: Element, k: number) => clamp((el.getBoundingClientRect().top + scrollY + k) / max);
  const sec = (id: string) => document.getElementById(id);
  const about = sec("about"), projectsSec = sec("projects"), stack = sec("stack");
  if (!about || !projectsSec || !stack) return;
  const panelEnd = (el: HTMLElement) => {
    const pn = el.querySelector<HTMLElement>(".panel")!;
    return at(pn, pn.offsetHeight - innerHeight * 0.35);
  };
  const list: Anchor[] = phone
    ? [[0, P.tower], [panelEnd(about), P.falls], [panelEnd(projectsSec), P.sword], [panelEnd(stack), P.village], [1, P.fire]]
    : [[0, P.tower], [at(about, -innerHeight * 0.2), P.falls], [at(projectsSec, 0), P.sword], [at(stack, -innerHeight * 0.5), P.bridge], [at(stack, 0), P.village], [1, P.fire]];
  for (let i = 1; i < list.length; i++) list[i][0] = Math.max(list[i][0], list[i - 1][0] + 0.01);
  PixelWorld.setAnchors(list, phone ? 0.5 : 0.66);
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
addEventListener("resize", () => { anchors(); update(); });
document.fonts?.ready.then(() => { anchors(); update(); });
anchors();

/* ---------------- The fairy: a 9×8 sprite that follows the pointer on a spring ---------------- */
const fairy = $<HTMLCanvasElement>("#fairy");
if (fairy && finePointer && !reduceMotion) {
  const fx = fairy.getContext("2d")!;
  const frames = [
    [".WW...WW.", "WWWW.WWWW", ".WWWbWWW.", "...bLb...", "..bLLLb..", "...bLb...", "....b....", "........."],
    ["........", ".WW...WW.", "WWWWbWWWW", "...bLb...", "..bLLLb..", "...bLb...", "....b....", "........."]
  ];
  const col: Record<string, string> = { W: "#e0f2fe", b: "#38bdf8", L: "#f0fbff" };
  let frame = 0, tx = innerWidth * 0.7, ty = innerHeight * 0.3, x = tx, y = ty, vx = 0, vy = 0, running = false, idle = 0, lastFlap = 0;
  const draw = () => {
    fx.clearRect(0, 0, 9, 8);
    frames[frame].forEach((row, j) => [...row].forEach((c, i) => { if (col[c]) { fx.fillStyle = col[c]; fx.fillRect(i, j, 1, 1); } }));
  };
  const size = () => { const s = PixelWorld.scale; fairy.style.width = 9 * s + "px"; fairy.style.height = 8 * s + "px"; };
  size(); addEventListener("resize", size); draw();
  const step = (now: number) => {
    vx = (vx + (tx - x) * 0.06) * 0.78;
    vy = (vy + (ty - y) * 0.06) * 0.78;
    x += vx; y += vy;
    if (now - lastFlap > 140) { frame ^= 1; draw(); lastFlap = now; }
    const s = PixelWorld.scale, bob = Math.round(Math.sin(now / 380) * 2) * s;
    // snap to the world's pixel grid so the sprite never sits between pixels
    fairy.style.transform = `translate(${Math.round(x / s) * s}px, ${Math.round(y / s) * s + bob}px)`;
    if (Math.abs(vx) + Math.abs(vy) < 0.02 && ++idle > 240) { running = false; return; }
    requestAnimationFrame(step);
  };
  addEventListener("pointermove", (e) => {
    tx = e.clientX + 18; ty = e.clientY - 30; idle = 0;
    fairy.setAttribute("data-on", "");
    if (!running) { running = true; requestAnimationFrame(step); }
  }, { passive: true });
  document.addEventListener("pointerleave", () => fairy.removeAttribute("data-on"));
}

/* ---------------- Top bar: clear over the opening sky, solid once you scroll; marks the section in view ---------------- */
const bar = $("#bar");
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>(".bar__nav a[data-sec]")];
function barState() {
  bar?.classList.toggle("is-solid", pinned !== undefined || scrollY > 24);
  if (pinned || !navLinks.length) return;
  let cur = "";
  for (const a of navLinks) {
    const sec = document.getElementById(a.dataset.sec!);
    if (sec && sec.getBoundingClientRect().top < innerHeight * 0.45) cur = a.dataset.sec!;
  }
  navLinks.forEach((a) => { const on = a.dataset.sec === cur; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
}
addEventListener("scroll", barState, { passive: true });

/* ---------------- At the campfire the walker says hello: a pixel speech bubble that types itself ---------------- */
const hello = $<HTMLElement>("#hello");
if (hello && !pinned) {
  let shown = false, typed = 0, nextAt = 0;
  const foot = document.querySelector<HTMLElement>(".foot");
  const text = () => (lang === "es" ? hello.dataset.esText : hello.dataset.en) ?? "";
  const tick = (now: number) => {
    requestAnimationFrame(tick);
    // only while he is actually in view: not once the footer has risen over the ground
    const w = PixelWorld.walker, footTop = foot ? foot.getBoundingClientRect().top : Infinity;
    const want = w.atFire && footTop > w.y + 30;
    if (want !== shown) { shown = want; hello.toggleAttribute("data-on", want); typed = reduceMotion ? 99 : 0; nextAt = now + 250; if (!want) hello.textContent = ""; }
    if (!shown) return;
    hello.style.transform = `translate(${Math.round(w.x)}px, ${Math.round(w.y)}px) translate(-50%, calc(-100% - 14px))`;
    const t = text();
    if (typed < t.length && now >= nextAt) { typed++; nextAt = now + 110; }
    const v = t.slice(0, typed);
    if (hello.textContent !== v) hello.textContent = v;
  };
  requestAnimationFrame(tick);
}

/* ---------------- Play: click Link to make him jump; find the hidden rupees ---------------- */
{
  const RKEY = "rupees";
  try { const got = JSON.parse(store.get(RKEY) || "[]"); if (Array.isArray(got)) PixelWorld.setCollected(got.filter((n) => typeof n === "number")); } catch { /* ignore a broken entry */ }
  const counter = $<HTMLElement>("#rupees");
  const showCount = () => {
    const n = PixelWorld.collected.length;
    if (counter) { counter.hidden = n === 0; counter.querySelector("b")!.textContent = `${n}/${PixelWorld.rupeeTotal}`; }
  };
  showCount();
  const blocked = (el: EventTarget | null) => el instanceof Element && !!el.closest(".panel, a, button, input, label, .bar, .foot");
  document.addEventListener("click", (e) => {
    if (blocked(e.target)) return;
    const hit = PixelWorld.hit(e.clientX, e.clientY);
    if (hit === "walker") PixelWorld.jump();
    else if (typeof hit === "number") { PixelWorld.collect(hit); store.set(RKEY, JSON.stringify(PixelWorld.collected)); showCount(); }
  });
  if (finePointer) document.addEventListener("pointermove", (e) => {
    document.body.style.cursor = !blocked(e.target) && PixelWorld.hit(e.clientX, e.clientY) !== null ? "pointer" : "";
  }, { passive: true });
}

applyLang(lang);
barState();
anchors();
