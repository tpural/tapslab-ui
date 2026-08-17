import type { Theme } from "./tokens";
import { tide } from "./tide";
import { ember } from "./ember";

export type { Theme, ThemeTokens } from "./tokens";
export { defineTheme, cssVarName, TOKEN_NAMES } from "./tokens";
export { tide } from "./tide";
export { ember } from "./ember";

/**
 * The theme registry. Adding a theme is: write the file, add it here, run
 * `npm run themes:build`. The switcher UI and the CSS generator both read this,
 * so there is no second place to register anything.
 */
export const themes: Theme[] = [tide, ember];

/** The theme applied when nothing is stored. */
export const DEFAULT_THEME_ID = tide.id;

export type ThemeId = string;
export type ThemeMode = "light" | "dark" | "system";

export function getTheme(id: string): Theme | undefined {
  return themes.find((t) => t.id === id);
}
