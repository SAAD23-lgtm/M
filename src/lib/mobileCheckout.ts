import type { CheckoutPayload, CheckoutResult } from '@riq/shared';

export const MOBILE_CHECKOUT_SESSION_KEY = 'riq_mobile_checkout';
export const MOBILE_APP_SCHEME = 'riqstore://';

export function readMobileCheckoutPayload() {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.sessionStorage.getItem(MOBILE_CHECKOUT_SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CheckoutPayload;
  } catch {
    return null;
  }
}

export function buildMobileCheckoutReturnUrl(result: CheckoutResult) {
  const params = new URLSearchParams();
  params.set('status', result.status);

  if (result.paymentId) {
    params.set('id', result.paymentId);
  }

  if (result.message) {
    params.set('message', result.message);
  }

  return `${MOBILE_APP_SCHEME}checkout/result?${params.toString()}`;
}

export function getMobileCheckoutDescription(payload: CheckoutPayload) {
  return payload.locale === 'ar'
    ? `طلب من تطبيق ريق - ${payload.totalItems} قطعة`
    : `Order from Riq mobile app - ${payload.totalItems} items`;
}
