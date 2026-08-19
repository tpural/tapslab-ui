import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * The wrapper's `overflow-x-auto` is not optional. A table wide enough to
 * overflow will otherwise push the whole page sideways on a phone, and the
 * horizontal scrollbar belongs to the table, not the document.
 *
 * The wrapper deliberately draws no border of its own: a table is almost always
 * already inside a Card, and two nested 1px outlines a few pixels apart is the
 * single most dated thing a layout can do.
 *
 * `relative` is load-bearing for a different reason. `sr-only` is positioned but
 * sets no offsets, so a visually-hidden label in a cell scrolled out of view
 * resolves against the initial containing block and stretches the document out
 * to reach it -- reintroducing the sideways scroll this wrapper just prevented.
 */
export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead className={cn("bg-surface-sunken/60", className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody className={cn("divide-y divide-border/60", className)} {...props} />;
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={cn("transition-colors duration-150 hover:bg-surface-hover", className)}
      {...props}
    />
  );
}

/** `scope` defaults to "col": without it a screen reader reads cells as a flat
 *  list rather than announcing which column each one belongs to. */
export function TableHead({ className, scope = "col", ...props }: ComponentProps<"th">) {
  return (
    <th
      scope={scope}
      className={cn(
        "h-11 px-4 text-left align-middle text-2xs font-semibold tracking-[0.08em] " +
          "text-ink-subtle uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("px-4 py-3.5 align-middle text-ink", className)} {...props} />;
}
