import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Loading placeholder. `aria-hidden` because a screen reader announcing a
 * dozen empty boxes is worse than silence -- the live region on the container
 * is what should carry "loading".
 */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-md bg-surface-sunken", className)}
      {...props}
    />
  );
}

/**
 * The state every app needs and nobody builds until the demo looks broken.
 * An empty list with a call to action is the difference between "new here" and
 * "something failed".
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border " +
          "border-dashed border-border-strong px-6 py-14 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="flex size-11 items-center justify-center rounded-full bg-surface-sunken text-ink-subtle [&_svg]:size-5">
          {icon}
        </div>
      ) : null}
      <div className="space-y-1">
        <p className="font-medium text-ink">{title}</p>
        {description ? (
          <p className="mx-auto max-w-sm text-sm text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/**
 * Inline message. `role="alert"` only for danger, because a polite success note
 * should not interrupt whatever a screen reader is currently saying.
 */
export function Callout({
  variant = "neutral",
  title,
  children,
  className,
}: {
  variant?: "neutral" | "accent" | "success" | "warn" | "danger";
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  const styles = {
    neutral: "border-border bg-surface-sunken text-ink",
    accent: "border-accent/30 bg-accent/10 text-accent-text",
    success: "border-success/30 bg-success/10 text-success-text",
    warn: "border-warn/40 bg-warn/10 text-warn-text",
    danger: "border-danger/30 bg-danger/10 text-danger-text",
  }[variant];

  return (
    <div
      role={variant === "danger" ? "alert" : undefined}
      className={cn("rounded-lg border px-4 py-3 text-sm", styles, className)}
    >
      {title ? <p className="font-semibold">{title}</p> : null}
      {children ? <div className={cn(title && "mt-1")}>{children}</div> : null}
    </div>
  );
}
