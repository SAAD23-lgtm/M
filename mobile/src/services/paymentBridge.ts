import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CheckoutPayload } from '@riq/shared';
import { getWebBaseUrl } from './linking';

const CHECKOUT_DRAFT_KEY = 'riq-mobile-checkout-draft';
export const WEB_CHECKOUT_SESSION_KEY = 'riq_mobile_checkout';

export type CheckoutDraftRecord = {
  reference: string;
  payload: CheckoutPayload;
};

function createDraftReference() {
  return `riq-mobile-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function saveCheckoutDraft(payload: CheckoutPayload) {
  const record: CheckoutDraftRecord = {
    reference: createDraftReference(),
    payload,
  };

  await AsyncStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(record));
  return record;
}

export async function loadCheckoutDraftRecord() {
  const raw = await AsyncStorage.getItem(CHECKOUT_DRAFT_KEY);
  if (!raw) {
    return null;
  }

  const parsed = JSON.parse(raw) as CheckoutDraftRecord | CheckoutPayload;
  if ('payload' in parsed && 'reference' in parsed) {
    return parsed;
  }

  return {
    reference: createDraftReference(),
    payload: parsed,
  };
}

export async function loadCheckoutDraft() {
  const record = await loadCheckoutDraftRecord();
  return record?.payload ?? null;
}

export async function clearCheckoutDraft() {
  await AsyncStorage.removeItem(CHECKOUT_DRAFT_KEY);
}

export function buildCheckoutBridgeUrl() {
  const baseUrl = getWebBaseUrl();
  if (!baseUrl) {
    return null;
  }

  return `${baseUrl}/checkout/mobile`;
}

export function buildInjectedCheckoutPayloadScript(payload: CheckoutPayload) {
  const escaped = JSON.stringify(payload).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `
    window.sessionStorage.setItem('${WEB_CHECKOUT_SESSION_KEY}', '${escaped}');
    true;
  `;
}
