/**
 * Every token is a semantic role, never a hue, so a repalette is one theme file
 * rather than a sweep of every component.
 *
 * Two conventions are load-bearing:
 *
 *  1. `<role>Ink` is the text sitting ON the filled swatch. Stated rather than
 *     assumed white, because light fills need dark ink -- white on #F58800 is
 *     2.50:1 and on #F8BC24 is 1.72:1.
 *  2. `<role>Text` is the hue darkened until legible as text on the page. A
 *     saturated fill almost never works as body text.
 *
 * `npm run themes:check` enforces both in CI.
 */

export type ThemeTokens = {
  /** Page ground. */
  surface: string;
  /** Cards and popovers -- lifted above the page. */
  surfaceRaised: string;
  /** Wells: inputs, code blocks, table headers. */
  surfaceSunken: string;

  /** Decorative dividers. */
  border: string;
  /** Boundaries that carry meaning; must clear 3:1 to be perceivable. */
  borderStrong: string;

  /** Body text. */
  ink: string;
  /** Secondary text: labels, captions. Still held to full body contrast. */
  inkMuted: string;
  /** De-emphasised text: placeholders, disabled, timestamps. */
  inkSubtle: string;

  primary: string;
  primaryInk: string;

  secondary: string;
  secondaryInk: string;

  accent: string;
  accentInk: string;
  accentText: string;

  warn: string;
  warnInk: string;
  warnText: string;

  success: string;
  successInk: string;
  successText: string;

  danger: string;
  dangerInk: string;
  dangerText: string;

  /** Focus ring. Must clear 3:1 against whatever sits behind it. */
  focus: string;
};

export type Theme = {
  id: string;
  label: string;
  light: ThemeTokens;
  dark: ThemeTokens;
};

/** Pins the type at the definition site, so a missing token errors in the theme file. */
export function defineTheme(theme: Theme): Theme {
  return theme;
}

/** `surfaceRaised` -> `--surface-raised`, shared so generator and mapping agree. */
export function cssVarName(token: keyof ThemeTokens): string {
  return `--${String(token).replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
}

/** Declaration order; drives generation and validation. */
export const TOKEN_NAMES = [
  "surface",
  "surfaceRaised",
  "surfaceSunken",
  "border",
  "borderStrong",
  "ink",
  "inkMuted",
  "inkSubtle",
  "primary",
  "primaryInk",
  "secondary",
  "secondaryInk",
  "accent",
  "accentInk",
  "accentText",
  "warn",
  "warnInk",
  "warnText",
  "success",
  "successInk",
  "successText",
  "danger",
  "dangerInk",
  "dangerText",
  "focus",
] as const satisfies readonly (keyof ThemeTokens)[];
