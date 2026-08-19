import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * Lifted by tone and elevation rather than outlined. The border is still there
 * but only as a hairline holding the shape together at low contrast -- the card
 * reads as raised because it is lighter than the page and casts a shadow, which
 * is one fewer 1px line on a page that had a great many of them.
 */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-surface-raised elevate-1",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("space-y-1.5 p-6 pb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-lg leading-tight font-semibold text-ink", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm text-ink-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2 border-t border-border/70 bg-surface-sunken/40 p-6 py-4", className)}
      {...props}
    />
  );
}
