import { Linking } from 'react-native';
import type { CheckoutResult } from '@riq/shared';

export const APP_SCHEME = 'riqstore://';

function normalizeUrl(value?: string) {
  if (!value) {
    return '';
  }

  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export function getWebBaseUrl() {
  return normalizeUrl(process.env.EXPO_PUBLIC_WEB_BASE_URL);
}

export function resolveWebAssetUrl(path?: string) {
  if (!path) {
    return undefined;
  }

  const baseUrl = getWebBaseUrl();
  if (!baseUrl) {
    return undefined;
  }

  return path.startsWith('http')
    ? path
    : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildAppCheckoutResultUrl(result: CheckoutResult) {
  const params = new URLSearchParams();
  params.set('status', result.status);

  if (result.paymentId) {
    params.set('id', result.paymentId);
  }

  if (result.message) {
    params.set('message', result.message);
  }

  return `${APP_SCHEME}checkout/result?${params.toString()}`;
}

export function parseAppCheckoutResultUrl(url: string): CheckoutResult | null {
  if (!url.startsWith(APP_SCHEME)) {
    return null;
  }

  try {
    const parsed = new URL(url);
    const status = parsed.searchParams.get('status');

    if (status !== 'success' && status !== 'cancelled' && status !== 'error') {
      return null;
    }

    return {
      status,
      paymentId: parsed.searchParams.get('id') ?? undefined,
      message: parsed.searchParams.get('message') ?? undefined,
    };
  } catch {
    return null;
  }
}

export async function openExternalUrl(url: string) {
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  }
}
