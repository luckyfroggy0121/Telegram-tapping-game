import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const displayNumbers = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}