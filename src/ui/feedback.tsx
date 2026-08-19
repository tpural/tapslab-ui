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
        "flex flex-col items-center justify-center gap-3 rounded-xl " +
          "bg-surface-sunken/50 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="flex size-12 items-center justify-center rounded-full bg-surface-raised text-ink-subtle elevate-1 [&_svg]:size-5">
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
    neutral: "bg-surface-sunken text-ink",
    accent: "bg-accent-tint text-accent-text",
    success: "bg-success-tint text-success-text",
    warn: "bg-warn-tint text-warn-text",
    danger: "bg-danger-tint text-danger-text",
  }[variant];

  return (
    <div
      role={variant === "danger" ? "alert" : undefined}
      className={cn("rounded-lg px-4 py-3.5 text-sm", styles, className)}
    >
      {title ? <p className="font-semibold">{title}</p> : null}
      {children ? <div className={cn(title && "mt-1")}>{children}</div> : null}
    </div>
  );
}
