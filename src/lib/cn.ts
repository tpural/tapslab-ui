import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * twMerge is what makes `<Button className="bg-danger">` work: without it both
 * classes land in the list and the winner is whichever rule was emitted last.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
