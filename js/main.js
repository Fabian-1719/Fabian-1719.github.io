/* Fabian Aragón Arce · portfolio
   Scroll is time: the sky goes from midnight to noon as you read. */
(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------- i18n ---------------- */
  const ES = {
    skip: "Saltar al contenido",
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.stack": "Stack",
    "nav.contact": "Contacto",
    "hero.lede": "Estudiante de Ingeniería en Computación en el TEC, Costa Rica. Construyo sistemas de punta a punta, desde ensamblador x86 hasta microservicios en la nube.",
    "hero.cta": "Ver los proyectos",
    "about.title": "Me gusta entender cómo funciona un sistema, hasta el fondo.",
    "about.p1": "Soy estudiante de Ingeniería en Computación en el Instituto Tecnológico de Costa Rica. He escrito juegos en ensamblador x86 para un curso de organización de computadoras y he desplegado microservicios en Azure con mi equipo. Casi todo lo que construyo empieza como un proyecto de curso y termina siendo algo que sigo mejorando por mi cuenta.",
    "about.p2": "Últimamente he trabajado en sistemas distribuidos: servicios que se hablan entre sí, transmiten eventos y siguen en pie cuando algo falla. Ahora mismo estoy profundizando en dos cosas:",
    "focus.sec.t": "Ciberseguridad",
    "focus.sec.d": "Fundamentos de redes y seguridad web, y aprender a pensar como atacante para diseñar software más seguro.",
    "focus.arch.t": "Arquitectura de software",
    "focus.arch.d": "Arquitectura hexagonal, comunicación por eventos y microservicios, aplicados en proyectos reales de equipo y no solo en diagramas.",
    "projects.title": "El sendero hasta ahora",
    "projects.intro": "Cinco proyectos, del más reciente al más antiguo. Los de equipo lo dicen; cada cifra sale del código.",
    "p.rev.who": "Proyecto de equipo · 3 personas · Azure",
    "p.rev.desc": "Una plataforma de revisión de código entre compañeros para proyectos grupales de la universidad. Se conecta al repositorio de cada equipo, exige que cada cambio lo revise un compañero antes de fusionarse, mide el aporte real de cada estudiante y le prepara retroalimentación al profesor.",
    "p.rev.f1": "3 microservicios detrás de Azure API Management",
    "p.rev.f2": "Spring Boot con arquitectura hexagonal",
    "p.rev.f3": "Notificaciones en tiempo real con Azure Web PubSub",
    "p.gc.who": "Proyecto individual · 2 repositorios",
    "p.gc.desc": "Una consola de juegos multijugador donde juegas contra una IA escrita en Prolog. Las partidas corren en tiempo real por WebSockets y cada jugada se envía a una plataforma de analítica aparte: un servicio en Go valida los eventos y uno en Scala los convierte en estadísticas y patrones de los jugadores.",
    "p.gc.f1": "Minimax con poda alfa-beta en Prolog",
    "p.gc.f2": "Flujo de eventos: TypeScript → Go → Scala",
    "p.gc.f3": "Imágenes Docker y CI con GitHub Actions",
    "p.cp.who": "Proyecto de equipo · 4 personas · quien más aportó",
    "p.cp.desc": "Una plataforma web para una pastelería que combina una tienda en línea y una academia de repostería con cursos y matrículas. Un monorepo con una app web en React y una API REST documentada con Swagger.",
    "p.cp.f1": "Tienda, carrito y matrícula de cursos en una sola app",
    "p.cp.f2": "API en Express sobre Firebase, probada con Vitest",
    "p.nx.who": "Proyecto de equipo · web scraping",
    "p.nx.desc": "Un rastreador de precios de videojuegos. Extrae datos de tiendas digitales y de consolas, reúne fechas de lanzamiento, géneros y portadas, y lo sirve todo con una API REST que se actualiza sola cada 24 horas.",
    "p.nx.f1": "Más de 20 tiendas",
    "p.nx.f2": "80 workers concurrentes: procesos, hilos y E/S asíncrona",
    "p.nx.f3": "Sincronización con Firebase y respaldo local en JSON",
    "p.si.who": "Proyecto individual · Python",
    "p.si.desc": "Un shooter arcade al estilo del clásico, hecho con Pygame: power-ups, nave misteriosa, perfiles de jugador, historial de partidas y un top 5 que se guarda entre sesiones.",
    live: "Sitio en vivo",
    code: "Código",
    private: "Repositorio privado",
    "stack.title": "Con qué construyo",
    "stack.lang": "Lenguajes",
    "stack.fw": "Frameworks",
    "stack.tools": "Nube y herramientas",
    "contact.lede": "¿Quieres hablar de un proyecto, una clase o una idea? Escríbeme.",
    "footer.made": "HTML, CSS y JavaScript escritos a mano. Sin frameworks ni plantillas."
  };
  const CLOCK = {
    en: ["midnight", "late night", "dawn", "morning", "noon"],
    es: ["medianoche", "madrugada", "amanecer", "mañana", "mediodía"]
  };

  const nodes = $$("[data-i18n]");
  const EN = {};
  nodes.forEach((n) => { EN[n.dataset.i18n] = n.innerHTML; });

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage blocked: language still works for this visit */ } }
  };

  let lang = store.get("lang") || ((navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en");
  const langBtn = $("#lang");

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    const dict = lang === "es" ? ES : EN;
    nodes.forEach((n) => { const v = dict[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
    langBtn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
    document.title = lang === "es"
      ? "Fabian Aragón Arce · Estudiante de Ingeniería en Computación"
      : "Fabian Aragón Arce · Computer Engineering student";
    lastClockKey = "";
    update();
  }
  langBtn.addEventListener("click", () => {
    const next = lang === "en" ? "es" : "en";
    store.set("lang", next);
    applyLang(next);
  });

  /* ---------------- Generated sky details ---------------- */
  let seed = 1719;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const SVGNS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs) => { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

  const stars = $("#stars");
  stars.setAttribute("viewBox", "0 0 1000 600");
  for (let i = 0; i < 120; i++) {
    const c = el("circle", { cx: (rand() * 1000).toFixed(1), cy: (rand() * 600).toFixed(1), r: [0.7, 0.9, 1, 1.2, 1.5][Math.floor(rand() * 5)] });
    c.style.setProperty("--d", (2.2 + rand() * 3).toFixed(2) + "s");
    c.style.setProperty("--dl", (-rand() * 5).toFixed(2) + "s");
    stars.appendChild(c);
  }

  const flies = $("#fireflies");
  for (let i = 0; i < 22; i++) {
    const c = el("circle", { cx: (40 + rand() * 1360).toFixed(1), cy: (380 + rand() * 160).toFixed(1), r: "2.2" });
    c.style.setProperty("--d", (4 + rand() * 4).toFixed(2) + "s");
    c.style.setProperty("--dl", (-rand() * 8).toFixed(2) + "s");
    c.style.setProperty("--dx", ((rand() > 0.5 ? 1 : -1) * (8 + rand() * 14)).toFixed(0) + "px");
    flies.appendChild(c);
  }

  const bflies = $("#butterflies");
  const colors = ["#f59e0b", "#38bdf8", "#f472b6", "#2563eb"];
  for (let i = 0; i < 9; i++) {
    const x = 60 + rand() * 1320, y = 300 + rand() * 100, col = colors[Math.floor(rand() * colors.length)];
    const g = el("g", {});
    g.style.setProperty("--d", (5 + rand() * 4).toFixed(2) + "s");
    g.style.setProperty("--dl", (-rand() * 8).toFixed(2) + "s");
    g.style.setProperty("--dx", ((rand() > 0.5 ? 1 : -1) * (10 + rand() * 16)).toFixed(0) + "px");
    g.appendChild(el("ellipse", { cx: x - 3.4, cy: y, rx: 3.8, ry: 4.2, fill: col }));
    g.appendChild(el("ellipse", { cx: x + 3.4, cy: y, rx: 3.8, ry: 4.2, fill: col }));
    g.appendChild(el("rect", { x: x - 0.7, y: y - 3.5, width: 1.4, height: 7, fill: "#3b2a1a" }));
    bflies.appendChild(g);
  }

  /* ---------------- Trail path through the camps ---------------- */
  const trail = $(".trail");
  const trailSvg = $(".trail__path");
  const trailPath = $("#trailPath");
  function drawTrail() {
    const box = trail.getBoundingClientRect();
    trailSvg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    const pts = $$(".camp__mark", trail).map((m) => {
      const r = m.getBoundingClientRect();
      return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
    });
    if (!pts.length) return;
    let d = `M ${pts[0][0]} ${-80}`;
    let prev = [pts[0][0], -80];
    // Walk straight down under each marker, and only swing sideways in the gap
    // just above the next camp so the trail never crosses a project's text.
    for (const p of pts) {
      const bendTop = Math.max(prev[1], p[1] - 150);
      if (bendTop > prev[1]) d += ` L ${prev[0]} ${bendTop}`;
      const my = bendTop + (p[1] - bendTop) / 2;
      d += ` C ${prev[0]} ${my}, ${p[0]} ${my}, ${p[0]} ${p[1]}`;
      prev = p;
    }
    d += ` C ${prev[0]} ${prev[1] + 80}, ${prev[0] + 40} ${box.height}, ${prev[0] + 40} ${box.height + 60}`;
    trailPath.setAttribute("d", d);
  }

  /* ---------------- Scroll-driven sky ---------------- */
  const dawn = $(".sky__layer--dawn");
  const day = $(".sky__layer--day");
  const night = $(".sky__layer--night");
  const moon = $(".moon");
  const sun = $(".sun");
  const topbar = $(".topbar");
  const clock = $(".clock");
  const clockTime = $("#clockTime");
  const clockLabel = $("#clockLabel");
  const parallax = $$(".land--night g[data-depth]");
  const hero = $(".hero");
  const sections = { about: $("#about"), projects: $("#projects"), stack: $("#stack"), contact: $("#contact") };

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const lerp = (a, b, t) => a + (b - a) * t;

  let lastClockKey = "";
  let ticking = false;

  function progressAt(elm) {
    const max = document.documentElement.scrollHeight - innerHeight;
    return max > 0 ? clamp((elm.offsetTop - innerHeight * 0.5) / max) : 0;
  }
  let marks = {};
  // On narrow screens, frame the landscapes on the volcano instead of the empty middle
  const nightLand = $(".land--night");
  const dayLand = $(".land--day");
  function fitLand() {
    const small = innerWidth < 700;
    nightLand.setAttribute("viewBox", small ? "700 0 740 560" : "0 0 1440 560");
    dayLand.setAttribute("viewBox", small ? "260 0 1000 420" : "0 0 1440 420");
  }
  function measure() {
    fitLand();
    marks = {
      dawnStart: progressAt(sections.projects) - 0.12,
      dawnFull: progressAt(sections.projects) + 0.02,
      dayStart: progressAt(sections.stack) - 0.16,
      dayFull: progressAt(sections.stack) - 0.02
    };
    drawTrail();
  }

  function update() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? clamp(scrollY / max) : 0;
    const vw = innerWidth, vh = innerHeight;

    const dawnO = smooth(marks.dawnStart, marks.dawnFull, p);
    const dayO = smooth(marks.dayStart, marks.dayFull, p);
    dawn.style.opacity = (dawnO * (1 - dayO)).toFixed(3);
    day.style.opacity = dayO.toFixed(3);
    night.style.opacity = (1 - dayO).toFixed(3);

    const m = clamp(p / Math.max(marks.dawnFull, 0.01));
    moon.style.transform = `translate(${lerp(vw * 0.12, vw * 0.7, m)}px, ${lerp(vh * 0.1, vh * 0.55, m * m)}px)`;
    moon.style.opacity = (1 - smooth(marks.dawnStart, marks.dawnFull, p)).toFixed(3);

    const s = clamp((p - marks.dawnStart) / Math.max(1 - marks.dawnStart, 0.01));
    sun.style.transform = `translate(${lerp(vw * 0.06, vw * 0.62, s)}px, ${lerp(vh * 0.62, vh * 0.06, 1 - (1 - s) * (1 - s))}px)`;
    sun.style.opacity = smooth(marks.dawnStart, marks.dawnFull, p).toFixed(3);

    // Parallax on the night landscape while the hero is on screen
    if (!reduceMotion && scrollY < hero.offsetHeight) {
      for (const g of parallax) g.style.transform = `translateY(${(scrollY * parseFloat(g.dataset.depth)).toFixed(1)}px)`;
    }

    // Clock: 00:00 at the top, 12:00 at the bottom
    const minutes = Math.round(p * 720);
    const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mm = String(minutes % 60).padStart(2, "0");
    const idx = p < 0.12 ? 0 : p < marks.dawnStart ? 1 : p < marks.dayStart ? 2 : p < 0.94 ? 3 : 4;
    const key = `${hh}:${mm}|${idx}|${lang}`;
    if (key !== lastClockKey) {
      clockTime.textContent = `${hh}:${mm}`;
      clockLabel.textContent = CLOCK[lang][idx];
      lastClockKey = key;
    }

    // Tone of the fixed UI follows the ground under it
    const y = scrollY + 40;
    const inJungle = y >= sections.projects.offsetTop - 60 && y < sections.stack.offsetTop + 60;
    const inDay = y >= sections.stack.offsetTop + 60;
    const tone = inDay ? "day" : inJungle ? "jungle" : "night";
    if (topbar.dataset.tone !== tone) topbar.dataset.tone = tone;
    if (scrollY > 20) topbar.setAttribute("data-scrolled", ""); else topbar.removeAttribute("data-scrolled");
    const clockTone = (scrollY + innerHeight - 40) >= sections.stack.offsetTop + 100 ? "day" : "night";
    if (clock.dataset.tone !== clockTone) clock.dataset.tone = clockTone;
  }

  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", requestUpdate, { passive: true });
  addEventListener("resize", () => { measure(); requestUpdate(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); update(); });

  /* ---------------- Reveal on enter (opt-in; content visible without JS) ---------------- */
  const revealTargets = [
    ".about__title", ".about__body > *", ".projects__title", ".projects__intro",
    ".camp", ".stack__title", ".stack__group", ".contact__title", ".contact__lede", ".contact__links"
  ];
  if ("IntersectionObserver" in window) {
    const groups = new Map();
    revealTargets.forEach((sel) => $$(sel).forEach((n) => {
      n.setAttribute("data-reveal", "");
      const parent = n.parentElement;
      const i = groups.get(parent) || 0;
      n.style.setProperty("--rd", `${[0, 60, 110, 150, 180][Math.min(i, 4)]}ms`);
      groups.set(parent, i + 1);
    }));
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.setAttribute("data-in", ""); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -12% 0px" });
    $$("[data-reveal]").forEach((n) => io.observe(n));
  }

  /* ---------------- The fairy (decorative, follows the pointer with a spring) ---------------- */
  const fairy = $("#fairy");
  if (finePointer && !reduceMotion) {
    let tx = innerWidth * 0.8, ty = innerHeight * 0.3, x = tx, y = ty, vx = 0, vy = 0, running = false, idle = 0;
    const step = () => {
      const k = 0.06, damp = 0.78; // soft spring, slight lag
      vx = (vx + (tx - x) * k) * damp;
      vy = (vy + (ty - y) * k) * damp;
      x += vx; y += vy;
      const bob = Math.sin(performance.now() / 380) * 3;
      fairy.style.transform = `translate(${x.toFixed(1)}px, ${(y + bob).toFixed(1)}px)`;
      if (Math.abs(vx) + Math.abs(vy) < 0.02 && ++idle > 240) { running = false; return; }
      requestAnimationFrame(step);
    };
    addEventListener("pointermove", (e) => {
      tx = e.clientX + 18; ty = e.clientY - 26; idle = 0;
      fairy.setAttribute("data-on", "");
      if (!running) { running = true; requestAnimationFrame(step); }
    }, { passive: true });
    document.addEventListener("pointerleave", () => fairy.removeAttribute("data-on"));
  }

  /* ---------------- Init ---------------- */
  document.documentElement.classList.add("js-sky");
  measure();
  applyLang(lang);
})();
