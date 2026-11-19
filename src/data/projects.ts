/* Every project lives here. Adding one = adding an object: the list on the home
   page and its own page at /projects/<slug>/ are generated from it.
   Keep claims truthful: every figure must come from the project's code or repo. */

import type { Text } from "../i18n";

const NB = " ";
/** Meta lines bind words inside each item so lines only break after a separator. */
const meta = (...items: string[]) => items.map((i) => i.replaceAll(" ", NB)).join(`${NB}· `);

export type Place = "tower" | "falls" | "sword" | "bridge" | "village" | "fire";

/** Names of the world's places, shown on each project's quest card. */
export const PLACE_NAMES: Record<Place, Text> = {
  tower: { en: "Old Tower", es: "Torre vieja" },
  falls: { en: "The Falls", es: "La cascada" },
  sword: { en: "Sword Grove", es: "Bosque de la Espada" },
  bridge: { en: "River Bridge", es: "Puente del río" },
  village: { en: "The Village", es: "La aldea" },
  fire: { en: "Campfire", es: "La fogata" }
};

export type Project = {
  slug: string;
  title: string;
  /** Optional title with a muted joiner, e.g. "GameConsole + GameStats". */
  titleParts?: [string, string];
  who: Text;
  summary: Text;
  /** Longer write-up for the project page, one string per paragraph. */
  details: { en: string[]; es: string[] };
  facts: Text[];
  stack: string[];
  live?: string;
  code: { label?: string; href: string }[];
  private?: boolean;
  /** Screenshots for the project page, served from /public/projects/<slug>/. */
  images: { src: string; alt: Text }[];
  /** Where and when the pixel world stands on this project's page (0 = 07:00, 1 = 22:00). */
  world: { place: Place; time: number };
};

export const projects: Project[] = [
  {
    slug: "revisatec",
    title: "RevisaTEC",
    who: { en: meta("Team project", "3 people", "Azure"), es: meta("Proyecto de equipo", "3 personas", "Azure") },
    summary: {
      en: "A peer code-review platform for university team projects. It connects to each team's repository, requires every change to be reviewed by a teammate before it merges, measures each student's real contribution and drafts feedback for the professor.",
      es: "Una plataforma de revisión de código entre compañeros para proyectos grupales de la universidad. Se conecta al repositorio de cada equipo, exige que cada cambio lo revise un compañero antes de fusionarse, mide el aporte real de cada estudiante y le prepara retroalimentación al profesor."
    },
    details: {
      en: [
        "Professors usually only see the final state of a team repository: no view of whether anyone reviewed anyone else's code, or of how much each student really contributed. RevisaTEC makes peer review part of the workflow and turns the history of pull requests and commits into evidence the professor can grade with.",
        "The frontend is a React app on Azure Static Web Apps. It talks to three microservices published only through Azure API Management: academic management in Spring Boot with a hexagonal architecture, the rubric and reports service in Python with FastAPI, and a Node.js notifications service that pushes updates in real time through Azure Web PubSub.",
        "Sign-in works with the institutional email or Google, and the interface changes by role: professors configure rubrics, groups and milestones and review an estimated grade with evidence; students see their own contribution, published feedback and calendar."
      ],
      es: [
        "Normalmente el profesor solo ve el estado final del repositorio de un equipo: no sabe si alguien revisó el código de otro ni cuánto aportó realmente cada estudiante. RevisaTEC hace que la revisión entre compañeros sea parte del flujo de trabajo y convierte el historial de pull requests y commits en evidencia con la que el profesor puede calificar.",
        "El frontend es una app en React sobre Azure Static Web Apps. Habla con tres microservicios publicados solo a través de Azure API Management: gestión académica en Spring Boot con arquitectura hexagonal, el servicio de rúbricas y reportes en Python con FastAPI, y un servicio de notificaciones en Node.js que envía actualizaciones en tiempo real con Azure Web PubSub.",
        "El inicio de sesión funciona con el correo institucional o con Google, y la interfaz cambia según el rol: el profesor configura rúbricas, grupos e hitos y revisa una nota estimada con evidencia; el estudiante ve su propio aporte, la retroalimentación publicada y su calendario."
      ]
    },
    facts: [
      { en: "3 microservices behind Azure API Management", es: "3 microservicios detrás de Azure API Management" },
      { en: "Spring Boot with hexagonal architecture", es: "Spring Boot con arquitectura hexagonal" },
      { en: "Real-time notifications with Azure Web PubSub", es: "Notificaciones en tiempo real con Azure Web PubSub" }
    ],
    stack: ["React", "Spring Boot", "FastAPI", "Node.js", "Azure"],
    live: "https://green-ocean-067c41510.3.azurestaticapps.net",
    code: [{ href: "https://github.com/Crisaraya21/revisatec" }],
    images: [],
    world: { place: "tower", time: 0.08 }
  },
  {
    slug: "gameconsole",
    title: "GameConsole + GameStats",
    titleParts: ["GameConsole", "GameStats"],
    who: { en: meta("Team project", "2 people", "2 repos"), es: meta("Proyecto de equipo", "2 personas", "2 repositorios") },
    summary: {
      en: "A multiplayer game console where you play against an AI written in Prolog. Matches run in real time over WebSockets, and every move is streamed to a separate analytics platform: a Go service validates the events and a Scala service turns them into player stats and patterns.",
      es: "Una consola de juegos multijugador donde juegas contra una IA escrita en Prolog. Las partidas corren en tiempo real por WebSockets y cada jugada se envía a una plataforma de analítica aparte: un servicio en Go valida los eventos y uno en Scala los convierte en estadísticas y patrones de los jugadores."
    },
    details: {
      en: [
        "GameConsole is an object-oriented game server in TypeScript (Fastify and WebSockets) with a web console where you pick a game and play. The opponent is a reasoning engine in SWI-Prolog that plays with minimax and alpha-beta pruning, served over HTTP.",
        "Every match produces events. An event publisher with per-match queues, batching and a worker pool sends them to GameStats, a separate platform: a Go service ingests and validates them, and a Scala service computes statistics for five games, such as kills and accuracy in combat-arena, lap times in racing-circuit or the AI's decisions in connect-four.",
        "Both projects ship as Docker images with CI on GitHub Actions and run behind a Caddy reverse proxy."
      ],
      es: [
        "GameConsole es un servidor de juegos orientado a objetos en TypeScript (Fastify y WebSockets) con una consola web donde eliges un juego y juegas. El oponente es un motor de razonamiento en SWI-Prolog que juega con minimax y poda alfa-beta, servido por HTTP.",
        "Cada partida produce eventos. Un publicador con colas por partida, lotes y un pool de workers los envía a GameStats, una plataforma aparte: un servicio en Go los recibe y valida, y uno en Scala calcula estadísticas de cinco juegos, como bajas y precisión en combat-arena, tiempos de vuelta en racing-circuit o las decisiones de la IA en connect-four.",
        "Los dos proyectos se distribuyen como imágenes Docker con CI en GitHub Actions y corren detrás de un proxy inverso Caddy."
      ]
    },
    facts: [
      { en: "Minimax with alpha-beta pruning in Prolog", es: "Minimax con poda alfa-beta en Prolog" },
      { en: "Event pipeline: TypeScript → Go → Scala", es: "Flujo de eventos: TypeScript → Go → Scala" },
      { en: "Docker images and CI on GitHub Actions", es: "Imágenes Docker y CI con GitHub Actions" }
    ],
    stack: ["TypeScript", "Fastify", "Prolog", "Go", "Scala", "Docker"],
    code: [
      { label: "GameConsole", href: "https://github.com/Fabian-1719/GameConsole" },
      { label: "GameStats", href: "https://github.com/Fabian-1719/GameStats" }
    ],
    images: [],
    world: { place: "sword", time: 0.34 }
  },
  {
    slug: "ciudad-pastel",
    title: "Ciudad Pastel",
    who: { en: meta("Team project", "4 people", "Firebase"), es: meta("Proyecto de equipo", "4 personas", "Firebase") },
    summary: {
      en: "A web platform for a pastry business that combines an online store and a baking academy with courses and enrollments. A monorepo with a React web app and a REST API documented with Swagger.",
      es: "Una plataforma web para una pastelería que combina una tienda en línea y una academia de repostería con cursos y matrículas. Un monorepo con una app web en React y una API REST documentada con Swagger."
    },
    details: {
      en: [
        "Ciudad Pastel brings the business's two sides into one platform: a store where customers browse products and build a cart, and an academy where they find courses and enroll.",
        "It is a monorepo with two apps: a React web app built with Vite, and an Express API on Firebase with its endpoints documented in Swagger and tested with Vitest."
      ],
      es: [
        "Ciudad Pastel junta los dos lados del negocio en una sola plataforma: una tienda donde los clientes ven productos y arman un carrito, y una academia donde encuentran cursos y se matriculan.",
        "Es un monorepo con dos apps: una app web en React hecha con Vite, y una API en Express sobre Firebase con sus endpoints documentados en Swagger y probados con Vitest."
      ]
    },
    facts: [
      { en: "Store, cart and course enrollments in one app", es: "Tienda, carrito y matrícula de cursos en una sola app" },
      { en: "Express API on Firebase, tested with Vitest", es: "API en Express sobre Firebase, probada con Vitest" }
    ],
    stack: ["React", "Express", "Firebase", "Vitest"],
    code: [],
    private: true,
    images: [],
    world: { place: "village", time: 0.58 }
  },
  {
    slug: "nexus-arca",
    title: "NEXUS ARCA",
    who: { en: meta("Team project", "web scraping"), es: meta("Proyecto de equipo", "web scraping") },
    summary: {
      en: "A video game price tracker. It scrapes digital and console stores, collects release dates, genres and covers, and serves everything through a REST API that refreshes itself every 24 hours.",
      es: "Un rastreador de precios de videojuegos. Extrae datos de tiendas digitales y de consolas, reúne fechas de lanzamiento, géneros y portadas, y lo sirve todo con una API REST que se actualiza sola cada 24 horas."
    },
    details: {
      en: [
        "NEXUS ARCA compares prices for the same game across more than twenty digital stores, plus console stores, and adds the metadata a buyer cares about: release date, genre, cover art and review scores.",
        "The scraper runs on three levels of parallelism: independent processes, threads inside each process, and non-blocking HTTP with asyncio, for 80 concurrent workers in total. A Flask REST API exposes the results, refreshes them on a schedule every 24 hours and syncs them to Firebase Firestore, with a local JSON copy as a fallback."
      ],
      es: [
        "NEXUS ARCA compara el precio de un mismo juego en más de veinte tiendas digitales y tiendas de consolas, y agrega la información que le importa a quien compra: fecha de lanzamiento, género, portada y puntuaciones.",
        "El scraper trabaja en tres niveles de paralelismo: procesos independientes, hilos dentro de cada proceso y HTTP no bloqueante con asyncio, para 80 workers concurrentes en total. Una API REST en Flask expone los resultados, los actualiza automáticamente cada 24 horas y los sincroniza con Firebase Firestore, con una copia local en JSON como respaldo."
      ]
    },
    facts: [
      { en: "20+ stores scraped", es: "Más de 20 tiendas" },
      { en: "80 concurrent workers: processes, threads and async I/O", es: "80 workers concurrentes: procesos, hilos y E/S asíncrona" },
      { en: "Firebase sync with a local JSON fallback", es: "Sincronización con Firebase y respaldo local en JSON" }
    ],
    stack: ["Python", "Flask", "asyncio", "Firebase", "JavaScript"],
    live: "https://arquinex.netlify.app/",
    code: [{ href: "https://github.com/Fabian-1719/NEXUS-ARCA" }],
    images: [],
    world: { place: "bridge", time: 0.72 }
  },
  {
    slug: "space-invaders",
    title: "Space Invaders",
    who: { en: meta("Solo project", "Python"), es: meta("Proyecto individual", "Python") },
    summary: {
      en: "An arcade shooter in the style of the classic, built with Pygame: power-ups, a mystery ship, player profiles, match history and a top-5 leaderboard saved between sessions.",
      es: "Un shooter arcade al estilo del clásico, hecho con Pygame: power-ups, nave misteriosa, perfiles de jugador, historial de partidas y un top 5 que se guarda entre sesiones."
    },
    details: {
      en: [
        "My take on the arcade classic, written in Python with Pygame: waves of aliens, destructible shields, a mystery ship and power-ups for rapid fire, immunity and extra lives.",
        "Players create a profile when they start; every match is saved to that player's history and the best scores make a top-5 leaderboard that persists between sessions in JSON files."
      ],
      es: [
        "Mi versión del clásico arcade, escrita en Python con Pygame: oleadas de aliens, escudos que se destruyen, una nave misteriosa y power-ups de disparo rápido, inmunidad y vidas extra.",
        "Cada jugador crea un perfil al empezar; cada partida se guarda en su historial y los mejores puntajes forman un top 5 que se conserva entre sesiones en archivos JSON."
      ]
    },
    facts: [],
    stack: ["Python", "Pygame"],
    code: [{ href: "https://github.com/Fabian-1719/Space-Invaders" }],
    images: [],
    world: { place: "fire", time: 1 }
  }
];
