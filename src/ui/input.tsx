"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

const field =
  "w-full rounded-md border border-border bg-surface-sunken px-3.5 py-2.5 text-sm text-ink " +
  "placeholder:text-ink-subtle transition-colors " +
  "hover:border-border-strong " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  // aria-invalid rather than a prop: the attribute is what a screen reader
  // reads, so tying the visual state to it means the two cannot disagree.
  "aria-invalid:border-danger";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(field, "h-10", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(field, "min-h-24 resize-y", className)} {...props} />;
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("block text-sm font-medium text-ink-muted", className)}
      {...props}
    />
  );
}

/**
 * Label + control + help/error, so the error text, the `aria-invalid` on the
 * control, and the `aria-describedby` wiring cannot drift apart -- which is
 * what happens when each form re-assembles these by hand.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const describedBy = error ? `${htmlFor}-error` : hint ? `${htmlFor}-hint` : undefined;
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <div aria-describedby={describedBy}>{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-danger-text">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-sm text-ink-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
