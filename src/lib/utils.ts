import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type LocalizedText = {
  ar: string
  en: string
}

export function localizeText(value: LocalizedText, isRTL: boolean) {
  return isRTL ? value.ar : value.en
}

export function formatSarPrice(value: number | null | undefined, isRTL: boolean) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return isRTL ? 'اسأل عن السعر' : 'Ask for price'
  }

  return isRTL ? `${value.toFixed(2)} ر.س` : `SAR ${value.toFixed(2)}`
}
