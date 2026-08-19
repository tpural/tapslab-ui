import type { ThemeTokens } from "../src/themes/tokens";

/**
 * Colours are authored in oklch so tints and shades can be derived rather than
 * hand-picked. WCAG luminance is defined over sRGB, so the ratio maths needs a
 * conversion: oklch -> oklab -> linear sRGB. Hex is still accepted, because a
 * one-off literal in a theme is not worth a conversion.
 */
type Rgb = [number, number, number];

function parseOklch(value: string): Rgb | null {
  const m = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\s*\)$/i.exec(value.trim());
  if (!m) return null;

  const L = m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  const C = parseFloat(m[2]);
  const hRad = (parseFloat(m[3]) * Math.PI) / 180;

  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // oklab -> LMS -> linear sRGB, the inverse of Björn Ottosson's forward matrices.
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m2 = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s2 = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    +4.0767416621 * l - 3.3077115913 * m2 + 0.2309699292 * s2,
    -1.2684380046 * l + 2.6097574011 * m2 - 0.3413193965 * s2,
    -0.0041960863 * l - 0.7034186147 * m2 + 1.707614701 * s2,
  ];
}

function parseHex(value: string): Rgb | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255].map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  ) as Rgb;
}

/** WCAG relative luminance, from either notation. */
function luminance(colour: string): number {
  const linear = parseOklch(colour) ?? parseHex(colour);
  if (!linear) throw new Error(`Not an oklch() or 6-digit hex colour: ${colour}`);
  const [r, g, b] = linear.map((c) => Math.min(Math.max(c, 0), 1));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
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
  why: string;
} & ({ kind: "ratio"; actual: number; min: number } | { kind: "distinct" });

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
        kind: "ratio",
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

/**
 * The ring sits 2px outside its control, on the page ground, so a ratio
 * against the fill is the wrong test -- and an impossible one, since no single
 * colour clears 3:1 against a dark primary, a mid red and a light orange at
 * once. What matters is that the ring cannot be mistaken for the control it
 * surrounds: `focus` equal to `primary` renders as a slightly larger button
 * with a hairline gap rather than as a focus indicator.
 */
const FOCUS_MUST_DIFFER_FROM = [
  "primary",
  "secondary",
  "accent",
  "warn",
  "success",
  "danger",
] as const;

export function checkFocusDistinct(
  themeId: string,
  mode: "light" | "dark",
  tokens: ThemeTokens,
): Violation[] {
  return FOCUS_MUST_DIFFER_FROM.filter(
    (role) => tokens[role].toLowerCase() === tokens.focus.toLowerCase(),
  ).map((role) => ({
    kind: "distinct" as const,
    theme: themeId,
    mode,
    fg: "focus",
    bg: role,
    why: `identical to \`${role}\`, so the ring reads as part of the control`,
  }));
}
