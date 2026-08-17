"use client";

import { Checkbox as Base } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";

export function Checkbox({ className, ...props }: ComponentProps<typeof Base.Root>) {
  return (
    <Base.Root
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded border " +
          "border-border-strong bg-surface-raised text-primary-ink transition-colors " +
          "data-checked:border-primary data-checked:bg-primary " +
          "data-indeterminate:border-primary data-indeterminate:bg-primary " +
          "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Base.Indicator className="flex data-unchecked:hidden">
        {props.indeterminate ? <Minus className="size-3" /> : <Check className="size-3" />}
      </Base.Indicator>
    </Base.Root>
  );
}

/**
 * Wrapping in a <label> is what makes the text itself a click target. Without
 * it the hit area is an 18px box, which is under every touch-target guideline
 * going.
 */
export function CheckboxField({
  children,
  className,
  ...props
}: ComponentProps<typeof Base.Root> & { children: ReactNode }) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2 text-sm text-ink", className)}>
      <Checkbox {...props} />
      {children}
    </label>
  );
}
