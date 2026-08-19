"use client";

import { Dialog as Base } from "@base-ui/react/dialog";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Base UI owns focus trapping, scroll locking, escape handling, and the
 * aria-labelledby wiring between Popup, Title, and Description. This file only
 * paints -- which is the whole reason for building on it rather than on a
 * hand-rolled <div role="dialog">.
 *
 * The `data-starting-style` / `data-ending-style` attributes are how Base UI
 * exposes enter and exit phases to CSS, so the exit animation can finish before
 * the element unmounts.
 */

export const Dialog = Base.Root;
export const DialogTrigger = Base.Trigger;
export const DialogClose = Base.Close;

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Base.Popup>) {
  return (
    <Base.Portal>
      <Base.Backdrop
        className={
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] transition-opacity duration-150 " +
          "data-starting-style:opacity-0 data-ending-style:opacity-0"
        }
      />
      <Base.Popup
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] " +
            "-translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border/70 " +
            "bg-surface-raised p-7 text-ink elevate-3 outline-none " +
            "transition-[opacity,scale] duration-150 ease-out " +
            "data-starting-style:scale-[0.97] data-starting-style:opacity-0 " +
            "data-ending-style:scale-[0.97] data-ending-style:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
      </Base.Popup>
    </Base.Portal>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4 space-y-1">{children}</div>;
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof Base.Title>) {
  return (
    <Base.Title className={cn("text-lg font-semibold text-ink", className)} {...props} />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof Base.Description>) {
  return (
    <Base.Description className={cn("text-sm text-ink-muted", className)} {...props} />
  );
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>;
}
