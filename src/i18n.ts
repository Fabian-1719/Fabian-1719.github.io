/* Page strings in both languages. English is rendered into the HTML; Spanish
   rides along in a data-es attribute and the language switch swaps them. */

export type Text = { en: string; es: string };

const NB = " ";

export const UI = {
  skip: { en: "Skip to content", es: "Saltar al contenido" },
  navAbout: { en: "About", es: "Sobre mí" },
  navProjects: { en: "Projects", es: "Proyectos" },
  navStack: { en: "Skills", es: "Habilidades" },
  navContact: { en: "Contact", es: "Contacto" },

  heroLabel: { en: "Computer Engineering · TEC", es: "Ingeniería en Computación · TEC" },
  heroLede: {
    en: "I build web apps and cloud services, focused on distributed systems and full-stack development, with a growing interest in cybersecurity, project management and software architecture.",
    es: "Desarrollo aplicaciones web y servicios en la nube, con enfoque en sistemas distribuidos y desarrollo full-stack, y un interés creciente en la ciberseguridad, la administración de proyectos y la arquitectura de software."
  },
  heroLede2: {
    en: "I like taking an idea from the interface all the way to the server; these are the projects I've built along the way.",
    es: "Me gusta llevar una idea desde la interfaz hasta el servidor; estos son los proyectos que he construido en el camino."
  },
  heroCta: { en: "See projects", es: "Ver proyectos" },
  cv: { en: "CV", es: "CV" },
  soon: { en: "soon", es: "pronto" },
  cvSoon: { en: "CV coming soon", es: "CV disponible pronto" },

  aboutLabel: { en: "About", es: "Sobre mí" },
  aboutTitle: { en: "I like to understand a system from start to finish.", es: "Me gusta entender un sistema de principio a fin." },
  aboutP: {
    en: "At university I've worked in teams on a microservices platform on Azure, a game console with a Prolog AI and analytics in Go and Scala, and a price tracker with concurrent scraping. Right now I'm going deeper into distributed systems, software architecture and cybersecurity.",
    es: "En la carrera he trabajado en equipo en una plataforma de microservicios en Azure, una consola de juegos con IA en Prolog y analítica en Go y Scala, y un rastreador de precios con scraping concurrente. Ahora profundizo en sistemas distribuidos, arquitectura de software y ciberseguridad."
  },
  factStudy: { en: "Studying", es: "Estudio" },
  factStudyV: { en: "Computer Engineering, TEC", es: "Ingeniería en Computación, TEC" },
  factFocus: { en: "Focus", es: "Enfoque" },
  factFocusV: { en: "Distributed systems and full-stack", es: "Sistemas distribuidos y full-stack" },
  factLang: { en: "Languages", es: "Idiomas" },
  factLangV: { en: "Spanish (native) · English (B1)", es: "Español nativo · Inglés B1" },

  projectsLabel: { en: "Projects", es: "Proyectos" },
  projectsTitle: { en: "What I've built", es: "Lo que he construido" },
  more: { en: `See${NB}project`, es: `Ver${NB}proyecto` },
  live: { en: "Live site", es: "Sitio en vivo" },
  code: { en: "Code", es: "Código" },
  private: { en: "Private repository", es: "Repositorio privado" },

  stackLabel: { en: "Skills", es: "Habilidades" },
  stackTitle: { en: "What I work with", es: "Con qué trabajo" },

  contactLabel: { en: "Contact", es: "Contacto" },
  contactTitle: { en: "Shall we talk about a project or an idea?", es: "¿Hablamos de un proyecto o una idea?" },
  contactLede: {
    en: "If something here caught your eye or you'd like to build something together, write to me.",
    es: "Si algo de lo que viste te interesa o quieres construir algo juntos, escríbeme."
  },

  hello: { en: "Hi!", es: "¡Hola!" },
  footBlurb: {
    en: "Computer Engineering student at TEC.",
    es: "Estudiante de Ingeniería en Computación en el TEC."
  },
  footSections: { en: "Sections", es: "Secciones" },
  footElsewhere: { en: "Elsewhere", es: "En otros lados" },
  footerMade: { en: "The world is drawn pixel by pixel in code", es: "El mundo está dibujado pixel a pixel en código" },
  backTop: { en: "Back to top", es: "Volver al inicio" },

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
