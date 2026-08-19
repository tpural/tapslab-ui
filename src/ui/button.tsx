"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { buttonVariants, type ButtonVariantProps } from "./button-variants";

export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
