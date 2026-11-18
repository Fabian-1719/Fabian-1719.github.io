// @ts-check
import { defineConfig } from "astro/config";

// User site on GitHub Pages: served from the domain root.
export default defineConfig({
  site: "https://fabian-1719.github.io",
  trailingSlash: "always",
  build: { format: "directory" }
});
