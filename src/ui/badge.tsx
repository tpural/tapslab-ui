import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * Status variants use the tinted `*-text` token on a low-opacity wash of the
 * fill, rather than the solid fill. A page with six solid badges reads as a
 * warning even when nothing is wrong, so the loud version is reserved for
 * `solid`, which callers must ask for.
 */
const badge = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium " +
    "[&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "bg-surface-sunken text-ink-muted",
        accent: "bg-accent/15 text-accent-text",
        success: "bg-success/15 text-success-text",
        warn: "bg-warn/20 text-warn-text",
        danger: "bg-danger/15 text-danger-text",
        solid: "bg-primary text-primary-ink",
        outline: "border border-border-strong text-ink-muted",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badge>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant }), className)} {...props} />;
}
