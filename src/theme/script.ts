import { DEFAULT_THEME_ID } from "../themes";

export const THEME_STORAGE_KEY = "tapslab-theme";
export const MODE_STORAGE_KEY = "tapslab-mode";

/**
 * The no-flash script.
 *
 * This is the one piece of the theme system that MUST NOT be a React effect.
 * An effect runs after first paint, so a user whose stored theme is Ember-dark
 * sees a frame of Tide-light on every single navigation-less reload. That one
 * frame is the difference between a theme system that feels built-in and one
 * that feels bolted on.
 *
 * So: a synchronous, blocking <script> in <head>, before any markup. It reads
 * localStorage and stamps the attributes the generated CSS keys off, so the
 * very first paint is already correct.
 *
 * `mode: system` REMOVES the attribute rather than setting a value -- that is
 * what lets the `@media (prefers-color-scheme: dark)` rule apply. Setting
 * data-mode="system" would match no selector at all and silently pin light.
 *
 * Wrapped in try/catch because localStorage throws outright in some privacy
 * modes, and a theme preference is never worth a blank page.
 */
export const themeScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})||${JSON.stringify(DEFAULT_THEME_ID)};var m=localStorage.getItem(${JSON.stringify(
  MODE_STORAGE_KEY,
)})||"system";d.setAttribute("data-theme",t);if(m==="dark"||m==="light"){d.setAttribute("data-mode",m)}else{d.removeAttribute("data-mode")}}catch(e){}})();`;
