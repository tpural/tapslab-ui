import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { MODE_STORAGE_KEY, THEME_STORAGE_KEY, themeScript } from "../src/theme/script";
import { ThemeProvider, useTheme } from "../src/theme/provider";
import { DEFAULT_THEME_ID, themes } from "../src/themes";
import { cssVarName, TOKEN_NAMES } from "../src/themes/tokens";

/** The script ships as a string in a <script> tag, so running it is the test. */
function runThemeScript() {
  new Function(themeScript)();
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-mode");
});

afterEach(() => {
  // Not automatic: auto-cleanup only registers when vitest runs with globals,
  // and without it each render stacks another copy in document.body.
  cleanup();
  localStorage.clear();
});

describe("themeScript", () => {
  it("falls back to the default palette in system mode", () => {
    runThemeScript();

    expect(document.documentElement.getAttribute("data-theme")).toBe(DEFAULT_THEME_ID);
    // The absence of data-mode is what lets prefers-color-scheme apply. Setting
    // it to "system" would match no selector and silently pin light.
    expect(document.documentElement.hasAttribute("data-mode")).toBe(false);
  });

  it.each(["light", "dark"] as const)("stamps an explicit %s choice", (mode) => {
    localStorage.setItem(THEME_STORAGE_KEY, "ember");
    localStorage.setItem(MODE_STORAGE_KEY, mode);

    runThemeScript();

    expect(document.documentElement.getAttribute("data-theme")).toBe("ember");
    expect(document.documentElement.getAttribute("data-mode")).toBe(mode);
  });

  it("clears a previously stamped mode when the choice is system", () => {
    document.documentElement.setAttribute("data-mode", "dark");
    localStorage.setItem(MODE_STORAGE_KEY, "system");

    runThemeScript();

    expect(document.documentElement.hasAttribute("data-mode")).toBe(false);
  });

  it("survives localStorage throwing", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("blocked in this privacy mode");
      },
    });

    expect(() => runThemeScript()).not.toThrow();

    if (original) Object.defineProperty(window, "localStorage", original);
  });
});

function Probe() {
  const { theme, mode, mounted, setTheme, setMode } = useTheme();
  return (
    <div>
      <span data-testid="state">{`${theme}/${mode}/${mounted}`}</span>
      <button onClick={() => setTheme("ember")}>palette</button>
      <button onClick={() => setMode("dark")}>dark</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  it("server-renders the defaults so hydration cannot mismatch", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "ember");
    localStorage.setItem(MODE_STORAGE_KEY, "dark");
    runThemeScript();

    // The server has neither storage nor the stamped DOM, so this render must
    // show defaults no matter what the client has stored. Effects do not run
    // here, which is exactly the state hydration has to match.
    const html = renderToString(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );

    expect(html).toContain(`${DEFAULT_THEME_ID}/system/false`);
  });

  it("adopts what the inline script stamped once mounted", async () => {
    localStorage.setItem(THEME_STORAGE_KEY, "ember");
    localStorage.setItem(MODE_STORAGE_KEY, "dark");
    runThemeScript();

    await act(async () => {
      render(<Probe />, { wrapper: ThemeProvider });
    });

    expect(screen.getByTestId("state").textContent).toBe("ember/dark/true");
  });

  it("writes both the attribute and storage when the palette changes", async () => {
    await act(async () => {
      render(<Probe />, { wrapper: ThemeProvider });
    });
    await act(async () => {
      screen.getByText("palette").click();
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("ember");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("ember");
  });

  it("stamps data-mode only for an explicit choice", async () => {
    await act(async () => {
      render(<Probe />, { wrapper: ThemeProvider });
    });
    expect(document.documentElement.hasAttribute("data-mode")).toBe(false);

    await act(async () => {
      screen.getByText("dark").click();
    });
    expect(document.documentElement.getAttribute("data-mode")).toBe("dark");
  });
});

describe("theme registry", () => {
  it("gives every theme every token in both modes", () => {
    for (const theme of themes) {
      for (const mode of ["light", "dark"] as const) {
        const missing = TOKEN_NAMES.filter((name) => !theme[mode][name]);
        expect(missing, `${theme.id}/${mode}`).toEqual([]);
      }
    }
  });

  it("exposes the default palette", () => {
    expect(themes.map((t) => t.id)).toContain(DEFAULT_THEME_ID);
  });

  it("converts token names to custom properties", () => {
    expect(cssVarName("surfaceRaised")).toBe("--surface-raised");
    expect(cssVarName("ink")).toBe("--ink");
  });
});
