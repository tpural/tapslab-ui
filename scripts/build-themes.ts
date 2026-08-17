/**
 * Generates src/themes/themes.css from the TypeScript theme definitions.
 *
 * The output is COMMITTED. Consumers import plain CSS and never run this --
 * the build step is the library author's problem, which is what keeps the
 * packages source-only and free of a bundler.
 *
 *   npm run themes:build     regenerate
 *   npm run themes:check     verify the committed file matches, and contrast
 *
 * Run with:  node --experimental-strip-types scripts/build-themes.ts
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { themes } from "../src/themes/index";
import { TOKEN_NAMES, cssVarName, type ThemeTokens } from "../src/themes/tokens";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "themes", "themes.css");

/**
 * Emitted per theme, in this order. The three-state mode handling is the
 * fiddly part and the reason this is generated rather than hand-written:
 *
 *   1. `[data-theme=x]`                     -- light, the default
 *   2. `@media (prefers-color-scheme: dark)`
 *      `[data-theme=x]:not([data-mode=light])` -- follow the OS, unless the
 *                                                 user explicitly chose light
 *   3. `[data-theme=x][data-mode=dark]`     -- explicit dark wins everywhere,
 *                                              including on a light-set OS
 *
 * Order matters: 3 must come after 2 so an explicit choice beats the media
 * query at equal specificity.
 */
function renderTheme(id: string, light: ThemeTokens, dark: ThemeTokens): string {
  const decl = (tokens: ThemeTokens, indent: string) =>
    TOKEN_NAMES.map((n) => `${indent}${cssVarName(n)}: ${tokens[n]};`).join("\n");

  return `/* ---------------------------------------------------------------- ${id} */

[data-theme="${id}"] {
  color-scheme: light;
${decl(light, "  ")}
}

@media (prefers-color-scheme: dark) {
  [data-theme="${id}"]:not([data-mode="light"]) {
    color-scheme: dark;
${decl(dark, "    ")}
  }
}

[data-theme="${id}"][data-mode="dark"] {
  color-scheme: dark;
${decl(dark, "  ")}
}
`;
}

const header = `/*
 * GENERATED FILE -- do not edit.
 *
 * Source of truth is src/themes/*.ts. Regenerate with \`npm run themes:build\`.
 * CI runs \`npm run themes:check\`, which fails if this file has drifted from
 * the TypeScript definitions or if any theme breaks the contrast rules in
 * scripts/contrast.ts.
 *
 * Themes: ${themes.map((t) => t.id).join(", ")}
 */
`;

const css = header + "\n" + themes.map((t) => renderTheme(t.id, t.light, t.dark)).join("\n");

const mode = process.argv[2];
if (mode === "--check") {
  if (!existsSync(OUT)) {
    console.error("themes.css is missing. Run: npm run themes:build");
    process.exit(1);
  }
  if (readFileSync(OUT, "utf8") !== css) {
    console.error(
      "themes.css is out of date with src/themes/*.ts.\nRun: npm run themes:build",
    );
    process.exit(1);
  }
  console.log("themes.css is up to date.");
} else {
  writeFileSync(OUT, css);
  console.log(`Wrote ${OUT} (${themes.length} themes)`);
}
