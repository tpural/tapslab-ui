/**
 * jsdom implements no media queries at all, and the theme provider asks for
 * prefers-color-scheme on mount. Defaults to light; a test that cares flips
 * `matchMediaResult` before rendering.
 */
export let matchMediaResult = false;

export function setSystemDark(dark: boolean) {
  matchMediaResult = dark;
}

window.matchMedia = ((query: string) => ({
  matches: matchMediaResult,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia;
