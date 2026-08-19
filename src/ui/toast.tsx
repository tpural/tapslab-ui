"use client";

import { Toast as Base } from "@base-ui/react/toast";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Wraps <ToastProvider> around the app and renders the viewport, so a project
 * gets toasts by adding one component to the layout.
 *
 * Toast styling is deliberately plainer than Base UI's stacking demo: the
 * elaborate version depends on a dozen --toast-* custom properties for the
 * peeking-stack effect, and that is a lot of machinery to inherit into every
 * project when a simple stack reads fine.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <Base.Provider>
      {children}
      <Base.Portal>
        <Base.Viewport
          className={
            "fixed right-4 bottom-4 z-50 flex w-[calc(100vw-2rem)] flex-col gap-2 sm:w-90"
          }
        >
          <ToastList />
        </Base.Viewport>
      </Base.Portal>
    </Base.Provider>
  );
}

function ToastList() {
  const { toasts } = Base.useToastManager();

  return toasts.map((toast) => (
    <Base.Root
      key={toast.id}
      toast={toast}
      className={cn(
        "relative flex w-full items-start gap-3 rounded-xl border border-border/70 " +
          "bg-surface-raised p-4 elevate-3 transition-all duration-200 " +
          "data-starting-style:translate-y-3 data-starting-style:opacity-0 " +
          "data-ending-style:translate-y-3 data-ending-style:opacity-0",
        toast.type === "error" && "border-danger/40",
        toast.type === "success" && "border-success/40",
      )}
    >
      <div className="min-w-0 flex-1">
        <Base.Title
          className={cn(
            "text-sm font-semibold",
            toast.type === "error"
              ? "text-danger-text"
              : toast.type === "success"
                ? "text-success-text"
                : "text-ink",
          )}
        />
        <Base.Description className="mt-0.5 text-sm break-words text-ink-muted" />
      </div>
      <Base.Close
        aria-label="Dismiss"
        className="shrink-0 rounded p-1 text-ink-subtle transition-colors hover:bg-surface-sunken hover:text-ink"
      >
        <X className="size-4" />
      </Base.Close>
    </Base.Root>
  ));
}

/** `const toast = useToast(); toast.add({ title: "Saved" })` */
export const useToast = Base.useToastManager;
