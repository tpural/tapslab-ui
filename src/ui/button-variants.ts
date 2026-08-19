import { cva, type VariantProps } from "class-variance-authority";

/**
 * Split out of button.tsx so it is reachable from Server Components.
 *
 * This is only class names -- no state, no handlers -- but button.tsx carries
 * "use client" for the component, and that marks the whole module. A server
 * component styling a <Link> as a button would then fail at prerender with
 * "attempted to call buttonVariants() from the server".
 *
 * A hex or Tailwind palette name appearing here breaks the theme switch for
 * that state. `text-primary-ink` not `text-white`: a theme may make `primary`
 * pale, and the paired ink token is what keeps the label readable.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium " +
    "cursor-pointer whitespace-nowrap select-none " +
    // Two properties, two durations. Colour settles slowly enough to read;
    // the press has to feel immediate or it reads as lag rather than feedback.
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 " +
    "active:scale-[0.985] active:duration-75 " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // hover mixes toward ink rather than dropping opacity: a translucent
        // button picks up whatever is behind it, which on a card is the wrong
        // colour and on an image is unreadable.
        primary: "bg-primary text-primary-ink hover:bg-primary-hover elevate-1",
        secondary: "bg-secondary text-secondary-ink hover:bg-secondary-hover elevate-1",
        accent: "bg-accent text-accent-ink hover:bg-accent-hover elevate-1",
        danger: "bg-danger text-danger-ink hover:bg-danger-hover elevate-1",
        outline: "border border-border-strong bg-transparent text-ink hover:bg-surface-hover",
        ghost: "bg-transparent text-ink-muted hover:bg-surface-hover hover:text-ink",
        link: "bg-transparent text-accent-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 rounded-sm px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
