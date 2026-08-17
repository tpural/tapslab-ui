/**
 * Fails the build if any theme breaks the contrast rules.
 *
 * This is the guardrail that lets the theme library grow without the palette
 * quietly drifting into unreadable territory. Every rule states WHY it exists,
 * so a failure tells you which real situation is broken rather than just
 * printing a number.
 *
 * Run with:  node --experimental-strip-types scripts/check-contrast.ts
 */
import { themes } from "../src/themes/index";
import { checkTokens, RULES, type Violation } from "./contrast";

const violations: Violation[] = [];

for (const theme of themes) {
  violations.push(...checkTokens(theme.id, "light", theme.light));
  violations.push(...checkTokens(theme.id, "dark", theme.dark));
}

const checked = themes.length * RULES.length * 2;

if (violations.length === 0) {
  console.log(`Contrast OK -- ${checked} pairs across ${themes.length} themes.`);
  process.exit(0);
}

console.error(`\nContrast failures (${violations.length} of ${checked} pairs):\n`);
for (const v of violations) {
  console.error(
    `  ${v.theme}/${v.mode}: ${v.fg} on ${v.bg} = ${v.actual.toFixed(2)}:1 ` +
      `(need ${v.min.toFixed(1)}:1)\n    → ${v.why}`,
  );
}
console.error("\nAdjust the tokens in src/themes/, then re-run.\n");
process.exit(1);
