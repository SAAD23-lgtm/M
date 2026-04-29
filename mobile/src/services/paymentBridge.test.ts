import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearCheckoutDraft,
  loadCheckoutDraft,
  loadCheckoutDraftRecord,
  saveCheckoutDraft,
} from './paymentBridge';

const payload = {
  customerName: 'Maha',
  phone: '0500000000',
  address: 'Riyadh',
  items: [],
  totalItems: 0,
  subtotal: 0,
  deliveryFee: 15,
  discount: 0,
  finalTotal: 15,
  locale: 'en' as const,
};

describe('payment bridge storage', () => {
  beforeEach(async () => {
    await clearCheckoutDraft().catch(() => {});
    (AsyncStorage.setItem as jest.Mock).mockClear();
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (AsyncStorage.removeItem as jest.Mock).mockClear();
  });

  it('stores the checkout draft with a stable local reference', async () => {
    const saved = await saveCheckoutDraft(payload);
    const loaded = await loadCheckoutDraftRecord();

    expect(saved.reference).toContain('riq-mobile-');
    expect(loaded?.reference).toBe(saved.reference);
    expect(loaded?.payload.customerName).toBe('Maha');
  });

  it('keeps backward compatibility with legacy payload-only storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(payload));

    const loadedRecord = await loadCheckoutDraftRecord();
    const loadedPayload = await loadCheckoutDraft();

    expect(loadedRecord?.payload.address).toBe('Riyadh');
    expect(loadedPayload?.phone).toBe('0500000000');
  });
});
