import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function isValidDate(date: Date) {
  return !isNaN(+date)
}

export function convertDateFromIsoToMonthYear(isoDate: string) {
  var date = new Date(isoDate)
  if (isValidDate(date)) {
    return date.toLocaleDateString(
      'en-gb',
      {
        year: 'numeric',
        month: 'short'
      }
    )
  }
  return null
}
