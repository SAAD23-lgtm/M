const DEV_MOYASAR_PUBLIC_KEY = 'pk_test_L6S47xJvY4Ea9aP9Aoa6f8a8m6E9aP9';

export const MOYASAR_SCRIPT_URL = 'https://cdn.moyasar.com/moyasar-js/1.14.0/moyasar.js';
export const MOYASAR_STYLES_URL = 'https://cdn.moyasar.com/moyasar-js/1.14.0/moyasar.css';

function normalize(value?: string) {
  return value?.trim() ?? '';
}

function isPlaceholder(value: string) {
  return !value || /replace|your-|example/i.test(value);
}

export function getMoyasarPublicKey() {
  const configuredValue = normalize(import.meta.env.VITE_MOYASAR_PUBLIC_KEY);

  if (!configuredValue || isPlaceholder(configuredValue)) {
    return import.meta.env.DEV ? DEV_MOYASAR_PUBLIC_KEY : '';
  }

  if (import.meta.env.PROD && configuredValue.startsWith('pk_test_')) {
    return '';
  }

  return configuredValue;
}

export function hasMoyasarPublicKey() {
  return Boolean(getMoyasarPublicKey());
}
