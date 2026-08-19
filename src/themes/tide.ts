import { defineTheme } from "./tokens";

/**
 * Tide -- deep teal and warm orange.
 *
 * Authored in oklch so the ramps are perceptually even: a step of 0.05 in L
 * looks like the same step everywhere, which hex cannot promise. It is also
 * what lets components derive hover and tint states with `color-mix()` instead
 * of adding a hand-picked token for every state.
 *
 * Hues are fixed per role and only L and C move: teal 185 carries the brand and
 * bleeds a trace of chroma into the neutrals, so greys read as belonging to the
 * palette rather than borrowed from a framework. Warm roles sit at 55 and 85,
 * success at its own 150 -- green is the one semantic colour with a universal
 * convention, and spending the brand teal on it, as this theme used to, made
 * "success" indistinguishable from "secondary".
 *
 * The warm pair carries DARK ink in both modes: they are far too light for
 * white text. Every pairing here is enforced by `npm run themes:check`.
 */
export const tide = defineTheme({
  id: "tide",
  label: "Tide",

  light: {
    surface: "oklch(0.978 0.004 185)",
    surfaceRaised: "oklch(1 0 185)",
    surfaceSunken: "oklch(0.955 0.008 185)",

    border: "oklch(0.905 0.012 185)",
    // Held to 3:1 as non-text contrast, which is darker than it looks like it
    // should be -- a border that only suggests a boundary communicates nothing.
    borderStrong: "oklch(0.645 0.022 185)",

    ink: "oklch(0.270 0.032 185)",
    inkMuted: "oklch(0.430 0.030 185)",
    inkSubtle: "oklch(0.520 0.026 185)",

    primary: "oklch(0.440 0.075 185)",
    primaryInk: "oklch(1 0 185)",

    // Bluer than primary rather than lighter: two teals separated only by
    // lightness stop reading as different roles at badge size.
    secondary: "oklch(0.505 0.070 210)",
    secondaryInk: "oklch(1 0 185)",

    accent: "oklch(0.740 0.165 55)",
    accentInk: "oklch(0.270 0.032 185)",
    accentText: "oklch(0.550 0.130 55)",

    warn: "oklch(0.845 0.150 85)",
    warnInk: "oklch(0.270 0.032 185)",
    warnText: "oklch(0.535 0.115 85)",

    success: "oklch(0.545 0.110 150)",
    successInk: "oklch(1 0 185)",
    successText: "oklch(0.480 0.100 150)",

    danger: "oklch(0.545 0.180 25)",
    dangerInk: "oklch(1 0 185)",
    dangerText: "oklch(0.540 0.165 25)",

    // Its own hue on purpose. The ring sits 2px outside a control, and one that
    // matches the control it outlines reads as a slightly larger button.
    focus: "oklch(0.570 0.115 235)",
  },

  dark: {
    surface: "oklch(0.205 0.018 185)",
    surfaceRaised: "oklch(0.258 0.021 185)",
    surfaceSunken: "oklch(0.170 0.016 185)",

    border: "oklch(0.325 0.024 185)",
    borderStrong: "oklch(0.540 0.032 185)",

    ink: "oklch(0.930 0.014 185)",
    inkMuted: "oklch(0.740 0.020 185)",
    inkSubtle: "oklch(0.640 0.022 185)",

    primary: "oklch(0.680 0.090 185)",
    primaryInk: "oklch(0.205 0.018 185)",

    secondary: "oklch(0.620 0.080 210)",
    secondaryInk: "oklch(0.205 0.018 185)",

    accent: "oklch(0.760 0.160 55)",
    accentInk: "oklch(0.205 0.018 185)",
    accentText: "oklch(0.780 0.130 55)",

    warn: "oklch(0.860 0.150 85)",
    warnInk: "oklch(0.205 0.018 185)",
    warnText: "oklch(0.860 0.110 85)",

    success: "oklch(0.720 0.115 150)",
    successInk: "oklch(0.205 0.018 185)",
    successText: "oklch(0.780 0.105 150)",

    danger: "oklch(0.665 0.165 25)",
    dangerInk: "oklch(0.205 0.018 185)",
    dangerText: "oklch(0.740 0.140 25)",

    focus: "oklch(0.760 0.110 235)",
  },
});
