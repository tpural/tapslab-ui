import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * The app frame: sticky header, centred content column, footer. Re-derived on
 * every project otherwise, and always slightly differently.
 */
export function PageShell({
  brand,
  nav,
  actions,
  footer,
  children,
}: {
  brand: ReactNode;
  nav?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface text-ink">
      {/* Off-screen until focused. Without it every page starts with a tab
          through the brand, the nav and the theme switcher before reaching
          anything the visitor came for. */}
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 text-primary-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-6 px-5">
          <div className="font-semibold tracking-tight">{brand}</div>
          {nav ? <nav className="flex flex-1 items-center gap-1">{nav}</nav> : <div className="flex-1" />}
          {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">{children}</main>

      {footer ? (
        <footer className="border-t border-border/70">
          <div className="mx-auto w-full max-w-5xl px-5 py-8 text-sm text-ink-subtle">
            {footer}
          </div>
        </footer>
      ) : null}
    </div>
  );
}

/** Title, optional description, and a right-aligned action slot. */
export function PageHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex items-start justify-between gap-4", className)}>
      {/* The old 24px-against-16px title was a 1.5 ratio, which is not enough
          separation for it to be the first thing read on the page. */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-ink">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-[0.9375rem] text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
