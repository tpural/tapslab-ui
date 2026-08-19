"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { themes, DEFAULT_THEME_ID, type Theme, type ThemeMode } from "../themes";
import { MODE_STORAGE_KEY, THEME_STORAGE_KEY } from "./script";

type ThemeContextValue = {
  /** Active palette id, e.g. "tide". */
  theme: string;
  setTheme: (id: string) => void;
  /** The user's choice, which may be "system". */
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  /** What "system" actually resolves to right now. For icons and charts. */
  resolvedMode: "light" | "dark";
  themes: Theme[];
  /**
   * False during SSR and first client render. UI showing the current selection
   * must wait for it; page colours need not, the inline script handles those.
   */
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Defaults, not localStorage: this render must match the server's. The real
  // values arrive in the effect; the DOM already has them from the inline script.
  const [theme, setThemeState] = useState<string>(DEFAULT_THEME_ID);
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [systemDark, setSystemDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // Read back what the inline script stamped rather than re-reading storage,
    // so there is a single source of truth for "what is on screen".
    //
    // This has to be an effect. State is initialised to the defaults so the
    // server and the first client render agree; the real values only exist in
    // the DOM, put there by a script that ran before React. Reading them during
    // render is exactly the hydration mismatch the inline script exists to
    // avoid.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(root.getAttribute("data-theme") || DEFAULT_THEME_ID);
    const domMode = root.getAttribute("data-mode");
    setModeState(domMode === "dark" || domMode === "light" ? domMode : "system");
    setSystemDark(systemPrefersDark());
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((id: string) => {
    setThemeState(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // Storage unavailable; the choice still applies for this session.
    }
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    const root = document.documentElement;
    // Same rule as the inline script: "system" is the ABSENCE of the
    // attribute, which is what re-enables the prefers-color-scheme rule.
    if (next === "system") root.removeAttribute("data-mode");
    else root.setAttribute("data-mode", next);
    try {
      localStorage.setItem(MODE_STORAGE_KEY, next);
    } catch {
      // See above.
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      mode,
      setMode,
      resolvedMode: mode === "system" ? (systemDark ? "dark" : "light") : mode,
      themes,
      mounted,
    }),
    [theme, setTheme, mode, setMode, systemDark, mounted],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
