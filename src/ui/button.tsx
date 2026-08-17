"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * A hex or Tailwind palette name appearing here breaks the theme switch for
 * that state. `text-primary-ink` not `text-white`: a theme may make `primary`
 * pale, and the paired ink token is what keeps the label readable.
 */
const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium " +
    "transition-colors cursor-pointer whitespace-nowrap " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-ink hover:opacity-90",
        secondary: "bg-secondary text-secondary-ink hover:opacity-90",
        accent: "bg-accent text-accent-ink hover:opacity-90",
        danger: "bg-danger text-danger-ink hover:opacity-90",
        outline:
          "border border-border-strong bg-transparent text-ink hover:bg-surface-sunken",
        ghost: "bg-transparent text-ink hover:bg-surface-sunken",
        link: "bg-transparent text-accent-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}

export { button as buttonVariants };
