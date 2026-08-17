/**
 * Theme tokens
 * ------------
 * Every token is a semantic ROLE, never a hue. Components ask for `surface` or
 * `danger`, so a repalette is one theme file rather than a sweep of every
 * component. Adding a role here is a breaking change for every theme -- the
 * type makes that failure happen at compile time instead of as a missing
 * custom property at runtime.
 *
 * Two conventions are load-bearing and worth understanding before adding a
 * theme:
 *
 *  1. `<role>Ink` is the text colour that sits ON the filled `<role>` swatch.
 *     It is a stated value rather than an assumption of white, because light
 *     fills (a yellow warn, an orange accent) need dark ink. White on #F58800
 *     is 2.50:1 and on #F8BC24 is 1.72:1 -- both unreadable.
 *
 *  2. `<role>Text` is the same hue darkened until it is legible AS TEXT on the
 *     page ground. A saturated accent that works as a fill almost never works
 *     as body text, so the two cannot be the same token.
 *
 * `npm run themes:check` enforces both against the contrast rules in
 * `scripts/check-contrast.ts`, so a theme that breaks these fails CI.
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

/**
 * Identity function that exists purely to pin the type at the definition site,
 * so a missing or misspelled token is an error in the theme file rather than
 * somewhere downstream.
 */
export function defineTheme(theme: Theme): Theme {
  return theme;
}

/**
 * TS camelCase -> CSS custom property. `surfaceRaised` becomes
 * `--surface-raised`. Kept here so the generator and the Tailwind mapping
 * cannot disagree about the naming rule.
 */
export function cssVarName(token: keyof ThemeTokens): string {
  return `--${String(token).replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
}

/** Every token name, in declaration order. Drives generation and validation. */
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
