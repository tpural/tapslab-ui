import { DEFAULT_THEME_ID } from "../themes";

export const THEME_STORAGE_KEY = "tapslab-theme";
export const MODE_STORAGE_KEY = "tapslab-mode";

/**
 * Must be a blocking <script> in <head>, never a React effect: an effect runs
 * after first paint, so a stored dark theme flashes light on every reload.
 *
 * `system` REMOVES data-mode rather than setting it -- that is what lets the
 * prefers-color-scheme rule apply. Setting data-mode="system" would match no
 * selector and silently pin light.
 *
 * try/catch because localStorage throws outright in some privacy modes.
 */
export const themeScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})||${JSON.stringify(DEFAULT_THEME_ID)};var m=localStorage.getItem(${JSON.stringify(
  MODE_STORAGE_KEY,
)})||"system";d.setAttribute("data-theme",t);if(m==="dark"||m==="light"){d.setAttribute("data-mode",m)}else{d.removeAttribute("data-mode")}}catch(e){}})();`;
