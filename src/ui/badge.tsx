import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * Status variants use the tinted `*-text` token on a mixed tint of the fill
 * rather than the solid fill. The tint is `color-mix`ed against the surface, so
 * it stays opaque -- an alpha wash picks up whatever is behind it, which on a
 * hovered table row is a different colour than on the page. A page with six solid badges reads as a
 * warning even when nothing is wrong, so the loud version is reserved for
 * `solid`, which callers must ask for.
 */
const badge = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-medium " +
    "tracking-[0.01em] whitespace-nowrap [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "bg-surface-sunken text-ink-muted",
        accent: "bg-accent-tint text-accent-text",
        success: "bg-success-tint text-success-text",
        warn: "bg-warn-tint text-warn-text",
        danger: "bg-danger-tint text-danger-text",
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
