"use client";

import { Select as Base } from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/cn";

export type SelectOption = { label: string; value: string };

/**
 * A single-prop select over Base UI's compound parts, because the assembled
 * form is ten nested elements and every app needs the same ten.
 *
 * `--anchor-width` and `--available-height` are supplied by the Positioner, so
 * the popup matches the trigger's width and never grows past the viewport --
 * the two things a hand-rolled dropdown always gets wrong.
 */
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  name,
  id,
  disabled,
  className,
}: {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Base.Root
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => onValueChange?.(v as string)}
      name={name}
      disabled={disabled}
    >
      <Base.Trigger
        id={id}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-md border " +
            "border-border bg-surface-sunken px-3 text-sm text-ink transition-colors " +
            "hover:border-border-strong data-disabled:cursor-not-allowed data-disabled:opacity-50",
          className,
        )}
      >
        <Base.Value className="data-placeholder:text-ink-subtle" placeholder={placeholder} />
        <Base.Icon className="text-ink-subtle">
          <ChevronsUpDown className="size-4" />
        </Base.Icon>
      </Base.Trigger>

      <Base.Portal>
        <Base.Positioner className="z-50 outline-none" sideOffset={4}>
          <Base.Popup
            className={
              "max-h-[var(--available-height)] min-w-[var(--anchor-width)] " +
              "origin-[var(--transform-origin)] overflow-hidden rounded-md border " +
              "border-border bg-surface-raised py-1 shadow-lg outline-none " +
              "transition-[opacity,scale] duration-100 ease-out " +
              "data-starting-style:scale-[0.98] data-starting-style:opacity-0 " +
              "data-ending-style:scale-[0.98] data-ending-style:opacity-0"
            }
          >
            <Base.List className="max-h-[var(--available-height)] overflow-y-auto">
              {options.map((option) => (
                <Base.Item
                  key={option.value}
                  value={option.value}
                  className={
                    "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 " +
                    "px-2.5 py-1.5 text-sm text-ink outline-none select-none " +
                    "data-highlighted:bg-primary data-highlighted:text-primary-ink"
                  }
                >
                  <Base.ItemIndicator className="col-start-1">
                    <Check className="size-3.5" />
                  </Base.ItemIndicator>
                  <Base.ItemText className="col-start-2">{option.label}</Base.ItemText>
                </Base.Item>
              ))}
            </Base.List>
          </Base.Popup>
        </Base.Positioner>
      </Base.Portal>
    </Base.Root>
  );
}
