"use client";

import { Menu as Base } from "@base-ui/react/menu";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export const Menu = Base.Root;
export const MenuTrigger = Base.Trigger;

export function MenuContent({
  className,
  align = "end",
  sideOffset = 6,
  ...props
}: ComponentProps<typeof Base.Popup> & {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <Base.Portal>
      <Base.Positioner className="z-50 outline-none" sideOffset={sideOffset} align={align}>
        <Base.Popup
          className={cn(
            "min-w-44 origin-[var(--transform-origin)] rounded-lg border border-border/70 " +
              "bg-surface-raised p-1 elevate-3 outline-none " +
              "transition-[opacity,scale] duration-100 ease-out " +
              "data-starting-style:scale-[0.98] data-starting-style:opacity-0 " +
              "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
            className,
          )}
          {...props}
        />
      </Base.Positioner>
    </Base.Portal>
  );
}

export function MenuItem({
  className,
  destructive,
  ...props
}: ComponentProps<typeof Base.Item> & { destructive?: boolean }) {
  return (
    <Base.Item
      className={cn(
        "flex cursor-default items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm " +
          "outline-none select-none data-disabled:opacity-50 " +
          "[&_svg]:size-4 [&_svg]:shrink-0",
        // Destructive keeps its tint until highlighted, then inverts onto the
        // danger fill -- so the "this deletes something" signal survives hover
        // rather than being replaced by the generic highlight.
        destructive
          ? "text-danger-text data-highlighted:bg-danger data-highlighted:text-danger-ink"
          : "text-ink data-highlighted:bg-primary data-highlighted:text-primary-ink",
        className,
      )}
      {...props}
    />
  );
}

export function MenuSeparator({ className, ...props }: ComponentProps<typeof Base.Separator>) {
  return <Base.Separator className={cn("my-1 h-px bg-border/70", className)} {...props} />;
}
