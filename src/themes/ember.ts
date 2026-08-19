import { defineTheme } from "./tokens";

/**
 * Ember -- warm neutrals, burnt orange, plum.
 *
 * Exists mainly to prove the switch works against a palette that shares no hues
 * with Tide: if a component hardcodes a teal anywhere, it shows up here
 * immediately. The neutrals are warm -- chroma at hue 55 rather than the trace
 * of teal Tide carries -- which is the part that actually makes a theme feel
 * different rather than recoloured.
 *
 * Plum is the secondary rather than another orange, because the accent is
 * already yellow-orange and two adjacent warm hues stop reading as distinct
 * roles at small sizes. Danger sits at 25 and success at 150; both are far
 * enough from the warm neutrals to survive on this ground.
 */
export const ember = defineTheme({
  id: "ember",
  label: "Ember",

  light: {
    surface: "oklch(0.982 0.006 65)",
    surfaceRaised: "oklch(1 0 65)",
    surfaceSunken: "oklch(0.955 0.014 65)",

    border: "oklch(0.900 0.018 65)",
    borderStrong: "oklch(0.640 0.030 65)",

    ink: "oklch(0.255 0.030 45)",
    inkMuted: "oklch(0.425 0.032 45)",
    inkSubtle: "oklch(0.515 0.030 45)",

    primary: "oklch(0.505 0.150 40)",
    primaryInk: "oklch(1 0 65)",

    secondary: "oklch(0.435 0.115 340)",
    secondaryInk: "oklch(1 0 65)",

    accent: "oklch(0.830 0.155 85)",
    accentInk: "oklch(0.255 0.030 45)",
    accentText: "oklch(0.530 0.115 85)",

    warn: "oklch(0.790 0.150 70)",
    warnInk: "oklch(0.255 0.030 45)",
    warnText: "oklch(0.535 0.125 70)",

    success: "oklch(0.545 0.110 150)",
    successInk: "oklch(1 0 65)",
    successText: "oklch(0.480 0.100 150)",

    danger: "oklch(0.535 0.185 25)",
    dangerInk: "oklch(1 0 65)",
    dangerText: "oklch(0.535 0.170 25)",

    // Cool, because every warm hue on this ground is already a role and a ring
    // drawn in one of them reads as the control rather than as focus.
    focus: "oklch(0.545 0.120 240)",
  },

  dark: {
    surface: "oklch(0.195 0.014 55)",
    surfaceRaised: "oklch(0.248 0.018 55)",
    surfaceSunken: "oklch(0.158 0.012 55)",

    border: "oklch(0.320 0.022 55)",
    borderStrong: "oklch(0.535 0.030 55)",

    ink: "oklch(0.935 0.012 65)",
    inkMuted: "oklch(0.745 0.020 65)",
    inkSubtle: "oklch(0.640 0.022 65)",

    primary: "oklch(0.680 0.150 45)",
    primaryInk: "oklch(0.195 0.014 55)",

    secondary: "oklch(0.640 0.130 340)",
    secondaryInk: "oklch(0.195 0.014 55)",

    accent: "oklch(0.850 0.160 85)",
    accentInk: "oklch(0.195 0.014 55)",
    accentText: "oklch(0.860 0.120 85)",

    warn: "oklch(0.800 0.150 70)",
    warnInk: "oklch(0.195 0.014 55)",
    warnText: "oklch(0.820 0.115 70)",

    success: "oklch(0.720 0.115 150)",
    successInk: "oklch(0.195 0.014 55)",
    successText: "oklch(0.780 0.105 150)",

    danger: "oklch(0.665 0.170 25)",
    dangerInk: "oklch(0.195 0.014 55)",
    dangerText: "oklch(0.745 0.140 25)",

    focus: "oklch(0.745 0.115 240)",
  },
});
