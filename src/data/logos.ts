/* Technology logos. Most come from Simple Icons (CC0, one 24×24 path each); the few it
   doesn't carry are drawn here as small pixel sprites in the same spirit. Used at build time only. */
import {
  siPython, siOpenjdk, siTypescript, siJavascript, siGo, siScala, siCplusplus, siReact, siSpringboot,
  siFastapi, siExpress, siFastify, siFlask, siFirebase, siDocker, siRedis, siGit, siGithubactions,
  siNodedotjs, siVitest
} from "simple-icons";

export type Logo =
  | { kind: "path"; path: string; color: string }
  | { kind: "sprite"; rows: string[]; colors: Record<string, string>; color: string; ink: string[] };

const icon = (s: { path: string; hex: string }, color = `#${s.hex}`): Logo => ({ kind: "path", path: s.path, color });

/** Brand colours that vanish on the night-blue slots get a light stand-in. */
const LIGHT = "#e6e1d4";

const LOGOS: Record<string, Logo> = {
  Python: icon(siPython, "#5a9fd4"),
  Java: icon(siOpenjdk, "#f89820"),
  TypeScript: icon(siTypescript),
  JavaScript: icon(siJavascript),
  Go: icon(siGo),
  Scala: icon(siScala),
  "C++": icon(siCplusplus, "#5b8fd8"),
  React: icon(siReact),
  "Spring Boot": icon(siSpringboot),
  FastAPI: icon(siFastapi, "#14b8a6"),
  Express: icon(siExpress, LIGHT),
  Fastify: icon(siFastify, LIGHT),
  Flask: icon(siFlask),
  Firebase: icon(siFirebase, "#ffa000"),
  Docker: icon(siDocker),
  Redis: icon(siRedis),
  Git: icon(siGit),
  "GitHub Actions": icon(siGithubactions),
  "Node.js": icon(siNodedotjs),
  Vitest: icon(siVitest, "#729b1b"),
  asyncio: icon(siPython, "#5a9fd4"),
  // Not in Simple Icons: pixel stand-ins
  Prolog: {
    kind: "sprite", color: "#c0573e", ink: ["O"],
    rows: ["O........O", "OO......OO", "OOOOOOOOOO", "OWWOOOOWWO", "OWBWOOWBWO", "OWWOOYOWWO", "OOOOYYYOOO", ".OOOOYOOOO", ".OOOOOOOO.", "..OO..OO.."],
    colors: { O: "#a3442f", W: "#f4efe4", B: "#151229", Y: "#ffcf5c" }
  },
  Pygame: {
    kind: "sprite", color: "#ffd43b", ink: ["B"],
    rows: ["...........", ".BBBBBBBBB.", "BBYBBBBBRBB", "BYYYBBBRBRB", "BBYBBBBBRBB", "BBBBBBBBBBB", "BBB.....BBB", ".B.......B."],
    colors: { B: "#3776ab", Y: "#ffd43b", R: "#ffd43b" }
  },
  Azure: {
    kind: "sprite", color: "#3ccbf4", ink: ["D", "L"],
    rows: ["....DD......", "...DDDL.....", "...DDLLL....", "..DDD.LLL...", "..DD...LLL..", ".DDD..LLLLL.", ".DD..LLLLLL.", "DDD........."],
    colors: { D: "#0a6fc2", L: "#3ccbf4" }
  }
};

export const logoFor = (name: string): Logo | undefined => LOGOS[name];
