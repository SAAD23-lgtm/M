export type LocalizedText = {
  ar: string;
  en: string;
};

export function localizeText(value: LocalizedText, isRTL: boolean) {
  return isRTL ? value.ar : value.en;
}

export function formatSarPrice(value: number, isRTL: boolean) {
  return isRTL ? `${value.toFixed(2)} ر.س` : `SAR ${value.toFixed(2)}`;
}
