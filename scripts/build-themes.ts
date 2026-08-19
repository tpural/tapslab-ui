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
/**
 * Depth, per mode, and the reason elevation is generated rather than left to
 * Tailwind's defaults: `shadow-lg` is 10% black, which over a near-black ground
 * is nothing at all. Dark mode gets a much heavier shadow plus a hairline of
 * light along the top edge, which is where the sense of lift actually comes
 * from once a drop shadow has stopped being visible.
 */
const ELEVATION = {
  light: {
    "--elevate-1": "0 1px 2px -1px oklch(0 0 0 / 0.08), 0 2px 6px -2px oklch(0 0 0 / 0.06)",
    "--elevate-2": "0 2px 4px -2px oklch(0 0 0 / 0.10), 0 8px 20px -6px oklch(0 0 0 / 0.10)",
    "--elevate-3": "0 4px 8px -4px oklch(0 0 0 / 0.12), 0 20px 44px -12px oklch(0 0 0 / 0.16)",
    "--edge-light": "transparent",
  },
  dark: {
    "--elevate-1": "0 1px 2px -1px oklch(0 0 0 / 0.55), 0 2px 8px -2px oklch(0 0 0 / 0.45)",
    "--elevate-2": "0 2px 6px -2px oklch(0 0 0 / 0.60), 0 10px 26px -6px oklch(0 0 0 / 0.55)",
    "--elevate-3": "0 6px 12px -6px oklch(0 0 0 / 0.65), 0 24px 56px -12px oklch(0 0 0 / 0.65)",
    "--edge-light": "oklch(1 0 0 / 0.07)",
  },
} as const;

/**
 * States derived from the palette rather than added as tokens. Every one of
 * these used to be either a hardcoded opacity or a colour a theme author had
 * to remember to pick; mixing against the tokens means a new theme gets them
 * all for free and they can never drift out of step with their base.
 */
const DERIVED = [
  "--primary-hover: color-mix(in oklab, var(--primary) 86%, var(--ink));",
  "--secondary-hover: color-mix(in oklab, var(--secondary) 86%, var(--ink));",
  "--danger-hover: color-mix(in oklab, var(--danger) 86%, var(--ink));",
  "--accent-hover: color-mix(in oklab, var(--accent) 88%, var(--ink));",
  "--surface-hover: color-mix(in oklab, var(--ink) 5%, var(--surface));",
  "--surface-raised-hover: color-mix(in oklab, var(--ink) 4%, var(--surface-raised));",
  "--primary-tint: color-mix(in oklab, var(--primary) 12%, var(--surface));",
  "--accent-tint: color-mix(in oklab, var(--accent) 16%, var(--surface));",
  "--success-tint: color-mix(in oklab, var(--success) 14%, var(--surface));",
  "--warn-tint: color-mix(in oklab, var(--warn) 18%, var(--surface));",
  "--danger-tint: color-mix(in oklab, var(--danger) 14%, var(--surface));",
  "--focus-tint: color-mix(in oklab, var(--focus) 22%, transparent);",
];

function renderTheme(id: string, light: ThemeTokens, dark: ThemeTokens): string {
  const decl = (tokens: ThemeTokens, indent: string, mode: "light" | "dark") =>
    [
      ...TOKEN_NAMES.map((n) => `${indent}${cssVarName(n)}: ${tokens[n]};`),
      "",
      ...Object.entries(ELEVATION[mode]).map(([k, v]) => `${indent}${k}: ${v};`),
      "",
      ...DERIVED.map((d) => `${indent}${d}`),
    ].join("\n");

  return `/* ---------------------------------------------------------------- ${id} */

[data-theme="${id}"] {
  color-scheme: light;
${decl(light, "  ", "light")}
}

@media (prefers-color-scheme: dark) {
  [data-theme="${id}"]:not([data-mode="light"]) {
    color-scheme: dark;
${decl(dark, "    ", "dark")}
  }
}

[data-theme="${id}"][data-mode="dark"] {
  color-scheme: dark;
${decl(dark, "  ", "dark")}
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
