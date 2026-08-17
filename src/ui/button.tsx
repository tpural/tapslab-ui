"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * Every colour here is a semantic token. If a hex or a Tailwind palette name
 * (`bg-slate-700`) ever appears in this file, the theme switch is broken for
 * that state -- that is the invariant the whole library rests on.
 *
 * Note `text-primary-ink` rather than `text-white`: a theme is free to make
 * `primary` a pale colour, and the paired ink token is what keeps the label
 * readable when it does.
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
