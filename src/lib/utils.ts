import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function that combines clsx and tailwind-merge
 * It allows you to conditionally apply Tailwind CSS classes
 * and properly handles class conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
