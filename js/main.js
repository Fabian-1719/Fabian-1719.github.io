/* Fabian Aragón Arce · portfolio
   Scroll drives the pixel world: the camera walks it and the day runs out. */
(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

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
    "p.rev.who": "Proyecto de equipo · 3 personas · Azure",
    "p.rev.desc": "Una plataforma de revisión de código entre compañeros para proyectos grupales de la universidad. Se conecta al repositorio de cada equipo, exige que cada cambio lo revise un compañero antes de fusionarse, mide el aporte real de cada estudiante y le prepara retroalimentación al profesor.",
    "p.rev.f1": "3 microservicios detrás de Azure API Management",
    "p.rev.f2": "Spring Boot con arquitectura hexagonal",
    "p.rev.f3": "Notificaciones en tiempo real con Azure Web PubSub",
    "p.gc.who": "Proyecto de equipo · 2 personas · 2 repositorios",
    "p.gc.desc": "Una consola de juegos multijugador donde juegas contra una IA escrita en Prolog. Las partidas corren en tiempo real por WebSockets y cada jugada se envía a una plataforma de analítica aparte: un servicio en Go valida los eventos y uno en Scala los convierte en estadísticas y patrones de los jugadores.",
    "p.gc.f1": "Minimax con poda alfa-beta en Prolog",
    "p.gc.f2": "Flujo de eventos: TypeScript → Go → Scala",
    "p.gc.f3": "Imágenes Docker y CI con GitHub Actions",
    "p.cp.who": "Proyecto de equipo · 4 personas · quien más aportó",
    "p.cp.desc": "Una plataforma web para una pastelería que combina una tienda en línea y una academia de repostería con cursos y matrículas. Un monorepo con una app web en React y una API REST documentada con Swagger.",
    "p.cp.f1": "Tienda, carrito y matrícula de cursos en una sola app",
    "p.cp.f2": "API en Express sobre Firebase, probada con Vitest",
    "p.nx.who": "Proyecto de equipo · web scraping",
    "p.nx.desc": "Un rastreador de precios de videojuegos. Extrae datos de tiendas digitales y de consolas, reúne fechas de lanzamiento, géneros y portadas, y lo sirve todo con una API REST que se actualiza sola cada 24 horas.",
    "p.nx.f1": "Más de 20 tiendas",
    "p.nx.f2": "80 workers concurrentes: procesos, hilos y E/S asíncrona",
    "p.nx.f3": "Sincronización con Firebase y respaldo local en JSON",
    "p.si.who": "Proyecto individual · Python",
    "p.si.desc": "Un shooter arcade al estilo del clásico, hecho con Pygame: power-ups, nave misteriosa, perfiles de jugador, historial de partidas y un top 5 que se guarda entre sesiones.",
    live: "Sitio en vivo",
    code: "Código",
    private: "Repositorio privado",
    "stack.title": "Con qué construyo",
    "stack.lang": "Lenguajes",
    "stack.fw": "Frameworks",
    "stack.tools": "Nube y herramientas",
    "contact.lede": "¿Quieres hablar de un proyecto, una clase o una idea? Escríbeme.",
    "footer.made": "Cada pixel del mundo está dibujado en código. Sin frameworks ni imágenes."
  };
  const CLOCK = {
    en: ["morning", "afternoon", "sunset", "dusk", "night"],
    es: ["mañana", "tarde", "atardecer", "anochecer", "noche"]
  };

  const nodes = $$("[data-i18n]");
  const EN = {};
  nodes.forEach((n) => { EN[n.dataset.i18n] = n.innerHTML; });
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage blocked: the switch still works for this visit */ } }
  };
  let lang = store.get("lang") || ((navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en");
  const langBtn = $("#lang");
  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    const dict = lang === "es" ? ES : EN;
    nodes.forEach((n) => { const v = dict[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
    langBtn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
    document.title = lang === "es" ? "Fabian Aragón Arce · Estudiante de Ingeniería en Computación" : "Fabian Aragón Arce · Computer Engineering student";
    lastClock = "";
    update();
  }
  langBtn.addEventListener("click", () => { const n = lang === "en" ? "es" : "en"; store.set("lang", n); applyLang(n); });

  /* ---------------- World + clock ---------------- */
  PixelWorld.init($("#world"), { reduce: reduceMotion });
  const clockTime = $("#clockTime"), clockLabel = $("#clockLabel");
  let lastClock = "", ticking = false;
  function update() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? clamp(scrollY / max) : 0;
    PixelWorld.setProgress(p);
    const minutes = Math.round(420 + p * 900); // 07:00 → 22:00
    const t = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
    const hrs = minutes / 60;
    const idx = hrs < 12 ? 0 : hrs < 17 ? 1 : hrs < 18.5 ? 2 : hrs < 20 ? 3 : 4;
    const key = `${t}|${idx}|${lang}`;
    if (key !== lastClock) { clockTime.textContent = t; clockLabel.textContent = CLOCK[lang][idx]; lastClock = key; }
  }
  // Each section brings its own place into view: on wide screens beside the panel,
  // on phones in the open stretch of world below each panel.
  function anchors() {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max <= 0) return;
    const P = PixelWorld.places, phone = innerWidth < 860;
    const at = (el, k) => clamp((el.getBoundingClientRect().top + scrollY + k) / max);
    const sec = (id) => document.getElementById(id);
    const panelEnd = (id) => { const pn = sec(id).querySelector(".panel"); return at(pn, pn.offsetHeight - innerHeight * 0.35); };
    const list = phone
      ? [[0, P.tower], [panelEnd("about"), P.falls], [panelEnd("projects"), P.sword], [panelEnd("stack"), P.village], [1, P.fire]]
      : [[0, P.tower], [at(sec("about"), -innerHeight * 0.2), P.falls], [at(sec("projects"), 0), P.sword], [at(sec("stack"), -innerHeight * 0.5), P.bridge], [at(sec("stack"), 0), P.village], [1, P.fire]];
    for (let i = 1; i < list.length; i++) list[i][0] = Math.max(list[i][0], list[i - 1][0] + 0.01);
    PixelWorld.setAnchors(list, phone ? 0.5 : 0.66);
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", () => { anchors(); update(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { anchors(); update(); });
  anchors();

  /* ---------------- The fairy: a 9×8 sprite that follows the pointer on a spring ---------------- */
  const fairy = $("#fairy");
  if (finePointer && !reduceMotion) {
    const fx = fairy.getContext("2d");
    const frames = [
      [".WW...WW.", "WWWW.WWWW", ".WWWbWWW.", "...bLb...", "..bLLLb..", "...bLb...", "....b....", "........."],
      ["........", ".WW...WW.", "WWWWbWWWW", "...bLb...", "..bLLLb..", "...bLb...", "....b....", "........."]
    ];
    const col = { W: "#e0f2fe", b: "#38bdf8", L: "#f0fbff" };
    let frame = 0, tx = innerWidth * 0.7, ty = innerHeight * 0.3, x = tx, y = ty, vx = 0, vy = 0, running = false, idle = 0, lastFlap = 0;
    const draw = () => {
      fx.clearRect(0, 0, 9, 8);
      frames[frame].forEach((row, j) => [...row].forEach((c, i) => { if (col[c]) { fx.fillStyle = col[c]; fx.fillRect(i, j, 1, 1); } }));
    };
    const size = () => { const s = PixelWorld.scale; fairy.style.width = 9 * s + "px"; fairy.style.height = 8 * s + "px"; };
    size(); addEventListener("resize", size); draw();
    const step = (now) => {
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

  applyLang(lang);
})();
