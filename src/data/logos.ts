/* Official technology logos, served from /public/logos/. Most are Devicon v2.17.0 "original"
   (full-colour) marks. */

type Logo = { file: string; /** a black mark that needs lightening on dark backgrounds */ dark?: boolean };

const LOGOS: Record<string, Logo> = {
  Python: { file: "python" }, Java: { file: "java" }, TypeScript: { file: "typescript" }, JavaScript: { file: "javascript" },
  Go: { file: "go" }, Scala: { file: "scala" }, "C++": { file: "cplusplus" }, Prolog: { file: "prolog" },
  React: { file: "react" }, "Spring Boot": { file: "spring" }, FastAPI: { file: "fastapi" },
  Express: { file: "express", dark: true }, Fastify: { file: "fastify", dark: true }, Flask: { file: "flask", dark: true },
  Azure: { file: "azure" }, Firebase: { file: "firebase" }, Docker: { file: "docker" },
  Redis: { file: "redis" }, Git: { file: "git" }, "GitHub Actions": { file: "githubactions" }, Postman: { file: "postman" },
  GitHub: { file: "github", dark: true }, LinkedIn: { file: "linkedin" },
  "Node.js": { file: "nodejs" }, Vitest: { file: "vitest" }, asyncio: { file: "python" }
};

export const logoFor = (name: string): { src: string; dark: boolean } | undefined => {
  const l = LOGOS[name];
  return l && { src: `/logos/${l.file}.svg`, dark: !!l.dark };
};
