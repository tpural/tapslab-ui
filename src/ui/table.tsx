import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * The wrapper's `overflow-x-auto` is not optional. A table wide enough to
 * overflow will otherwise push the whole page sideways on a phone, and the
 * horizontal scrollbar belongs to the table, not the document.
 *
 * `relative` is load-bearing for the same reason. `sr-only` is positioned but
 * sets no offsets, so a visually-hidden label in a cell scrolled out of view
 * resolves against the initial containing block and stretches the document out
 * to reach it -- reintroducing the sideways scroll this wrapper just prevented.
 */
export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto rounded-lg border border-border">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead className={cn("bg-surface-sunken", className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody className={cn("divide-y divide-border", className)} {...props} />;
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr className={cn("transition-colors hover:bg-surface-sunken/60", className)} {...props} />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle text-xs font-semibold tracking-wide " +
          "text-ink-muted uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("px-4 py-3 align-middle text-ink", className)} {...props} />;
}
