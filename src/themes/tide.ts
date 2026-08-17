import { defineTheme } from "./tokens";

/**
 * Tide -- deep teal and warm orange.
 *
 * Carried over from the family-tracker palette, whose five source colours are
 * #051821, #1A4645, #266867, #F58800, #F8BC24. The neutrals and states below
 * are derived from those.
 *
 * The warm pair carries DARK ink in both modes: white on #F58800 is 2.50:1 and
 * on #F8BC24 is 1.72:1, while #051821 on them is 7.25:1 and 10.53:1. The teals
 * are surfaces rather than text on the dark ground (#1A4645 is 1.73:1 there),
 * which is why the dark mode `successText` is a lightened teal rather than the
 * fill colour.
 */
export const tide = defineTheme({
  id: "tide",
  label: "Tide",

  light: {
    surface: "#f4f7f6",
    surfaceRaised: "#ffffff",
    surfaceSunken: "#e9efee",

    border: "#d7e2e0",
    // Darker than it looks like it should be: a "meaningful" border has to
    // clear 3:1 as non-text contrast, and the softer #b4c7c4 this palette
    // started from only manages 2.0:1 on white.
    borderStrong: "#7d9390",

    ink: "#051821",
    inkMuted: "#33514f",
    inkSubtle: "#456663",

    primary: "#1a4645",
    primaryInk: "#ffffff",

    secondary: "#266867",
    secondaryInk: "#ffffff",

    accent: "#f58800",
    accentInk: "#051821",
    accentText: "#8f4a00",

    warn: "#f8bc24",
    warnInk: "#051821",
    warnText: "#755300",

    success: "#266867",
    successInk: "#ffffff",
    successText: "#1c4f4e",

    // The one colour outside the source palette. Orange already means "urgent"
    // here, so destructive actions need a hue that cannot be mistaken for it.
    danger: "#b3352a",
    dangerInk: "#ffffff",
    dangerText: "#9c2d23",

    // Raw orange cannot be the focus ring on a light ground -- it is 2.36:1
    // against #f4f7f6, under the 3:1 that non-text contrast requires.
    focus: "#1a4645",
  },

  dark: {
    surface: "#051821",
    surfaceRaised: "#0c282a",
    surfaceSunken: "#03121a",

    border: "#1a4645",
    borderStrong: "#3a7f7d",

    ink: "#eaf2f1",
    inkMuted: "#a9bfbe",
    inkSubtle: "#8aa4a2",

    primary: "#4e9c9a",
    primaryInk: "#051821",

    secondary: "#266867",
    secondaryInk: "#eaf2f1",

    accent: "#f58800",
    accentInk: "#051821",
    accentText: "#ffab4d",

    warn: "#f8bc24",
    warnInk: "#051821",
    warnText: "#f8cf6b",

    success: "#46a3a1",
    successInk: "#051821",
    successText: "#6fc9c7",

    danger: "#e0594c",
    dangerInk: "#051821",
    dangerText: "#ff9084",

    focus: "#7fd4d2",
  },
});
