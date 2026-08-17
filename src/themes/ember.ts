import { defineTheme } from "./tokens";

/**
 * Ember -- warm neutrals, burnt orange, plum.
 *
 * Exists mainly to prove the switch works against a palette that shares no
 * hues with Tide: if a component hardcodes a teal anywhere, it shows up here
 * immediately. The neutrals are warm (a red-shifted grey ramp) rather than the
 * cool greys most component libraries ship, which is the part that actually
 * makes a theme feel different from a recoloured default.
 *
 * Plum is the secondary rather than another orange, because the accent is
 * already yellow-orange and two adjacent warm hues stop reading as distinct
 * roles at small sizes.
 */
export const ember = defineTheme({
  id: "ember",
  label: "Ember",

  light: {
    surface: "#fbf7f4",
    surfaceRaised: "#ffffff",
    surfaceSunken: "#f2eae3",

    border: "#e5d8cd",
    borderStrong: "#a28b77",

    ink: "#1f1410",
    inkMuted: "#4c3a31",
    inkSubtle: "#634f44",

    primary: "#9a3412",
    primaryInk: "#ffffff",

    secondary: "#6b2d5c",
    secondaryInk: "#ffffff",

    accent: "#eab308",
    accentInk: "#1f1410",
    accentText: "#7a5c00",

    warn: "#f59e0b",
    warnInk: "#1f1410",
    warnText: "#7f5205",

    success: "#2f7d4f",
    successInk: "#ffffff",
    successText: "#256540",

    danger: "#b3261e",
    dangerInk: "#ffffff",
    dangerText: "#9c211a",

    focus: "#9a3412",
  },

  dark: {
    surface: "#191210",
    surfaceRaised: "#241a17",
    surfaceSunken: "#100b09",

    border: "#3a2b25",
    borderStrong: "#7b6357",

    ink: "#f5ece6",
    inkMuted: "#c6b2a7",
    inkSubtle: "#a48e81",

    primary: "#e07444",
    primaryInk: "#191210",

    secondary: "#c07fb4",
    secondaryInk: "#191210",

    accent: "#eab308",
    accentInk: "#191210",
    accentText: "#f2c744",

    warn: "#f59e0b",
    warnInk: "#191210",
    warnText: "#f7b955",

    success: "#4caf7d",
    successInk: "#191210",
    successText: "#79cfa2",

    danger: "#e5584d",
    dangerInk: "#191210",
    dangerText: "#ff9086",

    focus: "#f0a878",
  },
});
