import type { ThemeTokens } from "../src/themes/tokens";

/** WCAG relative luminance. */
function luminance(hex: string): number {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) throw new Error(`Not a 6-digit hex colour: ${hex}`);
  const int = parseInt(m[1], 16);
  const channels = [(int >> 16) & 255, (int >> 8) & 255, int & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** WCAG contrast ratio, 1..21. */
export function contrast(a: string, b: string): number {
  const [la, lb] = [luminance(a), luminance(b)];
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

type Rule = {
  fg: keyof ThemeTokens;
  bg: keyof ThemeTokens;
  min: number;
  why: string;
};

/**
 * What every theme must satisfy, in both modes.
 *
 * 4.5 is AA for body text. 3.0 is AA for non-text: focus rings and any border
 * that carries meaning rather than decoration. Decorative `border` is
 * deliberately absent -- holding a hairline divider to 3:1 forces it dark
 * enough to look like a rule, and it communicates nothing on its own.
 */
export const RULES: Rule[] = [
  { fg: "ink", bg: "surface", min: 4.5, why: "body text on the page" },
  { fg: "ink", bg: "surfaceRaised", min: 4.5, why: "body text in cards" },
  { fg: "ink", bg: "surfaceSunken", min: 4.5, why: "body text in wells" },

  { fg: "inkMuted", bg: "surface", min: 4.5, why: "labels and captions" },
  { fg: "inkMuted", bg: "surfaceRaised", min: 4.5, why: "labels in cards" },
  { fg: "inkMuted", bg: "surfaceSunken", min: 4.5, why: "labels in wells" },

  // Subtle is placeholders and timestamps -- still real text a user must be
  // able to read, so it gets full body contrast rather than a large-text pass.
  { fg: "inkSubtle", bg: "surface", min: 4.5, why: "placeholder text" },
  { fg: "inkSubtle", bg: "surfaceRaised", min: 4.5, why: "placeholders in cards" },
  { fg: "inkSubtle", bg: "surfaceSunken", min: 4.5, why: "placeholders in inputs" },

  // The *Ink pair: text sitting on a filled swatch.
  { fg: "primaryInk", bg: "primary", min: 4.5, why: "label on a primary button" },
  { fg: "secondaryInk", bg: "secondary", min: 4.5, why: "label on a secondary fill" },
  { fg: "accentInk", bg: "accent", min: 4.5, why: "label on an accent fill" },
  { fg: "warnInk", bg: "warn", min: 4.5, why: "label on a warning fill" },
  { fg: "successInk", bg: "success", min: 4.5, why: "label on a success fill" },
  { fg: "dangerInk", bg: "danger", min: 4.5, why: "label on a destructive button" },

  // The *Text pair: the same hue used AS text on the page ground.
  { fg: "accentText", bg: "surface", min: 4.5, why: "accent-coloured text" },
  { fg: "accentText", bg: "surfaceRaised", min: 4.5, why: "accent text in cards" },
  { fg: "warnText", bg: "surface", min: 4.5, why: "warning text" },
  { fg: "warnText", bg: "surfaceRaised", min: 4.5, why: "warning text in cards" },
  { fg: "successText", bg: "surface", min: 4.5, why: "success text" },
  { fg: "successText", bg: "surfaceRaised", min: 4.5, why: "success text in cards" },
  { fg: "dangerText", bg: "surface", min: 4.5, why: "error text under a field" },
  { fg: "dangerText", bg: "surfaceRaised", min: 4.5, why: "error text in cards" },

  // Non-text.
  { fg: "focus", bg: "surface", min: 3.0, why: "focus ring on the page" },
  { fg: "focus", bg: "surfaceRaised", min: 3.0, why: "focus ring in cards" },
  { fg: "focus", bg: "surfaceSunken", min: 3.0, why: "focus ring on an input" },
  { fg: "borderStrong", bg: "surface", min: 3.0, why: "meaningful boundary" },
  { fg: "borderStrong", bg: "surfaceRaised", min: 3.0, why: "meaningful boundary in cards" },
];

export type Violation = {
  theme: string;
  mode: "light" | "dark";
  fg: string;
  bg: string;
  actual: number;
  min: number;
  why: string;
};

export function checkTokens(
  themeId: string,
  mode: "light" | "dark",
  tokens: ThemeTokens,
): Violation[] {
  const out: Violation[] = [];
  for (const rule of RULES) {
    const actual = contrast(tokens[rule.fg], tokens[rule.bg]);
    if (actual < rule.min) {
      out.push({
        theme: themeId,
        mode,
        fg: rule.fg,
        bg: rule.bg,
        actual,
        min: rule.min,
        why: rule.why,
      });
    }
  }
  return out;
}
