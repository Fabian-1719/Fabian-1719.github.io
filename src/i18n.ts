/* Page strings in both languages. English is rendered into the HTML; Spanish
   rides along in a data-es attribute and the language switch swaps them. */

export type Text = { en: string; es: string };

const NB = " ";

export const UI = {
  skip: { en: "Skip to content", es: "Saltar al contenido" },
  navAbout: { en: "About", es: "Sobre mí" },
  navProjects: { en: "Projects", es: "Proyectos" },
  navStack: { en: "Stack", es: "Stack" },
  navContact: { en: "Contact", es: "Contacto" },
  heroLede: {
    en: "Computer Engineering student at TEC, Costa Rica. I build systems end to end, from the interface to microservices in the cloud.",
    es: "Estudiante de Ingeniería en Computación en el TEC, Costa Rica. Construyo sistemas de punta a punta, desde la interfaz hasta microservicios en la nube."
  },
  heroCta: { en: "See the projects", es: "Ver los proyectos" },
  aboutTitle: { en: "I like to understand how a system works, all the way down.", es: "Me gusta entender cómo funciona un sistema, hasta el fondo." },
  aboutP1: {
    en: "I'm a Computer Engineering student at the Instituto Tecnológico de Costa Rica. I've shipped microservices to Azure with my team, and I've built a multiplayer game platform whose AI opponent is written in Prolog. Most of what I build starts as a class project and turns into something I keep improving on my own.",
    es: "Soy estudiante de Ingeniería en Computación en el Instituto Tecnológico de Costa Rica. He desplegado microservicios en Azure con mi equipo y he construido una plataforma de juegos multijugador cuyo oponente con IA está escrito en Prolog. Casi todo lo que construyo empieza como un proyecto de curso y termina siendo algo que sigo mejorando por mi cuenta."
  },
  aboutP2: {
    en: "Lately I've been working on distributed systems: services that talk to each other, stream events and stay up when something fails. Right now I'm going deeper into two things:",
    es: "Últimamente he trabajado en sistemas distribuidos: servicios que se hablan entre sí, transmiten eventos y siguen en pie cuando algo falla. Ahora mismo estoy profundizando en dos cosas:"
  },
  focusSecT: { en: "Cybersecurity", es: "Ciberseguridad" },
  focusSecD: {
    en: "Networking and web security fundamentals, and learning to think like an attacker so I design safer software.",
    es: "Fundamentos de redes y seguridad web, y aprender a pensar como atacante para diseñar software más seguro."
  },
  focusArchT: { en: "Software architecture", es: "Arquitectura de software" },
  focusArchD: {
    en: "Hexagonal architecture, event-driven communication and microservices, applied in real team projects instead of only diagrams.",
    es: "Arquitectura hexagonal, comunicación por eventos y microservicios, aplicados en proyectos reales de equipo y no solo en diagramas."
  },
  projectsTitle: { en: "The trail so far", es: "El sendero hasta ahora" },
  projectsIntro: {
    en: "Five projects, from the most recent. Team projects say so; every figure comes from the code.",
    es: "Cinco proyectos, del más reciente al más antiguo. Los de equipo lo dicen; cada cifra sale del código."
  },
  more: { en: `More${NB}about${NB}it`, es: `Ver${NB}más` },
  live: { en: "Live site", es: "Sitio en vivo" },
  code: { en: "Code", es: "Código" },
  private: { en: "Private repository", es: "Repositorio privado" },
  stackTitle: { en: "What I build with", es: "Con qué construyo" },
  stackLang: { en: "Languages", es: "Lenguajes" },
  stackFw: { en: "Frameworks", es: "Frameworks" },
  stackTools: { en: "Cloud & tools", es: "Nube y herramientas" },
  heroTalk: { en: "Hello, traveler", es: "Hola, viajero" },
  heroAbout: { en: "About me", es: "Sobre mí" },
  quest: { en: "Quest", es: "Misión" },
  prevQuest: { en: "Previous project", es: "Proyecto anterior" },
  nextQuest: { en: "Next project", es: "Siguiente proyecto" },
  invCount: { en: "items", es: "ítems" },
  seenIn: { en: "Seen in", es: "Visto en" },
  thisSite: { en: "this portfolio", es: "este portafolio" },
  invHint: { en: "Pick an item to see where I've used it.", es: "Elige un ítem para ver dónde lo he usado." },
  letterTo: { en: "To: whoever is reading", es: "Para: quien esté leyendo" },
  contactLede: { en: "Want to talk about a project, a class or an idea? Write me.", es: "¿Quieres hablar de un proyecto, una clase o una idea? Escríbeme." },
  footerMade: { en: "Every pixel of the world is drawn in code. No images.", es: "Cada pixel del mundo está dibujado en código. Sin imágenes." },
  back: { en: "All projects", es: "Todos los proyectos" },
  highlights: { en: "Highlights", es: "Lo más importante" },
  builtWith: { en: "Built with", es: "Hecho con" },
  links: { en: "Links", es: "Enlaces" },
  next: { en: "Next project", es: "Siguiente proyecto" },
  prev: { en: "Previous project", es: "Proyecto anterior" },
  gallery: { en: "Screenshots", es: "Capturas" }
} satisfies Record<string, Text>;

export const CLOCK = {
  en: ["morning", "afternoon", "sunset", "dusk", "night"],
  es: ["mañana", "tarde", "atardecer", "anochecer", "noche"]
};
