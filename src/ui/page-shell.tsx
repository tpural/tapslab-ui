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
      <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-4">
          <div className="font-semibold tracking-tight">{brand}</div>
          {nav ? <nav className="flex flex-1 items-center gap-1">{nav}</nav> : <div className="flex-1" />}
          {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>

      {footer ? (
        <footer className="border-t border-border">
          <div className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-ink-subtle">
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
    <div className={cn("mb-6 flex items-start justify-between gap-4", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        {description ? <p className="text-sm text-ink-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
