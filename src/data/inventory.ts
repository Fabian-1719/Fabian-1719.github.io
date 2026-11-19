/* The stack, shown as an inventory. "Seen in" is derived from each project's own stack list,
   so it can never claim more than the project data says. */
import type { Text } from "../i18n";
import { projects } from "./projects";

export type Item = { name: string; glyph: string; color: string; seen: { slug?: string; title: Text | string }[] };
export type Bag = { id: string; label: Text; items: Item[]; slots: number };

const THIS_SITE: Text = { en: "this portfolio", es: "este portafolio" };
/** Tools this site itself is built and deployed with. */
const SITE_USES = new Set(["TypeScript", "Git", "GitHub Actions"]);

const item = (name: string, glyph: string, color: string): Item => {
  const seen: Item["seen"] = projects.filter((p) => p.stack.includes(name)).map((p) => ({ slug: p.slug, title: p.title }));
  if (SITE_USES.has(name)) seen.push({ title: THIS_SITE });
  return { name, glyph, color, seen };
};

export const bags: Bag[] = [
  {
    id: "lang", label: { en: "Languages", es: "Lenguajes" }, slots: 12, items: [
      item("Python", "PY", "#8fd18a"), item("Java", "JV", "#ff9b6b"), item("TypeScript", "TS", "#7fb2ff"),
      item("JavaScript", "JS", "#ffe36b"), item("Go", "GO", "#7fe0ff"), item("Scala", "SC", "#ff7a7a"),
      item("C++", "C++", "#9fb4ff"), item("Prolog", "PL", "#f0b8ff")
    ]
  },
  {
    id: "fw", label: { en: "Frameworks", es: "Frameworks" }, slots: 12, items: [
      item("React", "RE", "#7fe0ff"), item("Spring Boot", "SB", "#8fd18a"), item("FastAPI", "FA", "#5fd6b4"),
      item("Express", "EX", "#e6e1d4"), item("Fastify", "FY", "#ffe36b"), item("Flask", "FL", "#cfd6e6")
    ]
  },
  {
    id: "tools", label: { en: "Cloud & tools", es: "Nube y herramientas" }, slots: 6, items: [
      item("Azure", "AZ", "#7fb2ff"), item("Firebase", "FB", "#ffb86b"), item("Docker", "DK", "#7fe0ff"),
      item("Redis", "RD", "#ff7a7a"), item("Git", "GIT", "#ff9b6b"), item("GitHub Actions", "GA", "#c9cfdf")
    ]
  }
];
