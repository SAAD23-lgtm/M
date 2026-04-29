import { render, screen, waitFor } from '@testing-library/react-native';
import CheckoutResultScreen from '../app/checkout/result';
import i18n, { i18nReady } from '../src/i18n';

const mockReplace = jest.fn();
const mockClearCart = jest.fn();
const mockPersistCompletedOrder = jest.fn().mockResolvedValue({});
const mockClearCheckoutDraft = jest.fn().mockResolvedValue(undefined);
const mockLoadCheckoutDraftRecord = jest.fn().mockResolvedValue({
  reference: 'draft-1',
  payload: {
    customerName: 'Maha',
    phone: '0500000000',
    email: 'maha@example.com',
    address: 'Riyadh',
    notes: '',
    lat: 24.7,
    lng: 46.6,
    items: [],
    totalItems: 0,
    subtotal: 0,
    deliveryFee: 15,
    discount: 0,
    finalTotal: 15,
    locale: 'en',
  },
});
const mockUseAuth = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  useLocalSearchParams: () => ({
    status: 'success',
    id: 'pay_123',
  }),
}));

jest.mock('../src/features/auth/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('../src/features/cart/CartProvider', () => ({
  useCart: () => ({
    clearCart: mockClearCart,
  }),
}));

jest.mock('../src/services/account', () => ({
  persistCompletedOrder: (...args: unknown[]) => mockPersistCompletedOrder(...args),
}));

jest.mock('../src/services/paymentBridge', () => ({
  clearCheckoutDraft: (...args: unknown[]) => mockClearCheckoutDraft(...args),
  loadCheckoutDraftRecord: (...args: unknown[]) => mockLoadCheckoutDraftRecord(...args),
}));

describe('mobile checkout result account sync', () => {
  beforeEach(async () => {
    mockReplace.mockClear();
    mockClearCart.mockClear();
    mockPersistCompletedOrder.mockClear();
    mockClearCheckoutDraft.mockClear();
    mockLoadCheckoutDraftRecord.mockClear();
    await i18nReady;
    await i18n.changeLanguage('en');
  });

  it('stores the successful order in the signed-in account exactly once', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isReady: true,
      session: {
        userId: 'user-1',
        email: 'maha@example.com',
      },
    });

    render(<CheckoutResultScreen />);

    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalled();
      expect(mockPersistCompletedOrder).toHaveBeenCalledWith({
        userId: 'user-1',
        paymentReference: 'pay_123',
        payload: expect.objectContaining({
          customerName: 'Maha',
        }),
      });
      expect(mockClearCheckoutDraft).toHaveBeenCalled();
      expect(screen.getByTestId('result-open-account-button')).toBeTruthy();
    });
  });
});
