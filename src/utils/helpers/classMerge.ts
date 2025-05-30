import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS classes
 * @param {string[]} inputs - Class names to merge
 * @returns {string} - Merged class names
 */
export function cn(...inputs: (string | undefined)[]): string {
  return twMerge(clsx(inputs));
}
