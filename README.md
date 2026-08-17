# @tpural/ui

Components and the theme system shared by every tapslab project.

Ships **TypeScript source, not a build** — no `dist/`, no bundler. Consumers transpile it
with Next's `transpilePackages`, so updating is a tag bump and nothing else.

## Install

```jsonc
// package.json
"dependencies": {
  "@tpural/ui": "github:tpural/tapslab-ui#v0.1.0"
}
```

```ts
// next.config.ts
const nextConfig = {
  transpilePackages: ["@tpural/ui"],
};
```

> Published to **GitHub Packages** from a private repo. CI needs no PAT — `GITHUB_TOKEN`
> works once this package grants the consuming repo read access. Locally:
> `gh auth refresh -s read:packages && export NODE_AUTH_TOKEN=$(gh auth token)`.

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "@tpural/ui/themes.css";    /* defines the custom properties */
@import "@tpural/ui/tailwind.css";  /* maps them onto utilities */

/* Tailwind only generates classes it can see, and it does not scan
   node_modules by default. Without this the library renders unstyled. */
@source "../../node_modules/@tpural/ui/src";
```

```tsx
// src/app/layout.tsx
import { ThemeProvider, themeScript } from "@tpural/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script mutates <html> before React
    // hydrates, so the client attributes intentionally differ from the server's.
    <html lang="en" data-theme="tide" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

The `<script>` must be in `<head>`, before any markup. It is what stops a stored dark theme
from flashing light on every reload.

## Theming

Two dimensions, held on `<html>`:

| Attribute   | Values                        | Meaning                          |
| ----------- | ----------------------------- | -------------------------------- |
| `data-theme` | `tide`, `ember`              | Which palette                    |
| `data-mode`  | `light`, `dark`, *absent*    | Absent = follow the OS           |

`system` is the **absence** of `data-mode`, not a value — that is what lets the
`prefers-color-scheme` media query apply.

### Tokens

Every token is a semantic role, never a hue. Components ask for `surface` or `danger`, so a
repalette is one file rather than a sweep of every component.

Two conventions are load-bearing:

- **`<role>Ink`** — text that sits *on* the filled swatch. Stated rather than assumed to be
  white, because light fills need dark ink. White on `#F58800` is 2.50:1.
- **`<role>Text`** — the same hue darkened until it is legible *as text on the page*. A
  saturated fill colour almost never works as body text, so the two cannot be one token.

### Adding a theme

1. Copy `src/themes/tide.ts`. The `ThemeTokens` type makes every role mandatory, so an
   omission is a compile error rather than a missing custom property at runtime.
2. Register it in `src/themes/index.ts`.
3. `npm run themes:build` — regenerates `src/themes/themes.css` (committed).
4. `npm run themes:check` — WCAG AA on every ink-on-surface pair, 3:1 on focus rings and
   meaningful borders, in both modes.

`themes:check` runs in CI. It fails on real problems: the palette this library started from
had a `borderStrong` at 2.0:1, well under the 3:1 that a meaningful boundary needs.

## Scripts

| Command | Does |
| --- | --- |
| `npm run themes:build` | Regenerate `themes.css` from the TS definitions |
| `npm run themes:check` | Verify the committed CSS matches, and check contrast |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Both of the above — what CI runs |

## Releasing

Consumers pin a git tag, so a release is just a tag:

```bash
npm run check
git tag v0.2.0 && git push --tags
```

Then bump the dependency in each project. Nothing is published to a registry.
