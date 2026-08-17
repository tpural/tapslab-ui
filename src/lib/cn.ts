import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, with later Tailwind utilities beating earlier ones.
 *
 * The twMerge half is what makes `<Button className="bg-danger">` actually
 * work: without it the variant's `bg-primary` and the override both land in
 * the class list and the winner is whichever CSS rule was emitted last, which
 * is not something a caller can reason about.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
