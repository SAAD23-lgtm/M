import { act, fireEvent, render, screen } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { products } from '@riq/shared';
import HomeScreen from '../app/(tabs)/index';
import ProductsScreen from '../app/(tabs)/products/index';
import AboutScreen from '../app/about';
import ContactScreen from '../app/contact';
import i18n, { i18nReady } from '../src/i18n';

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockReplace = jest.fn();
const mockAddToCart = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    replace: mockReplace,
  }),
  useLocalSearchParams: () => ({}),
}));

jest.mock('../src/features/cart/CartProvider', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    totalItems: 2,
    items: [],
    subtotal: 0,
    updateQuantity: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
  }),
}));

jest.mock('../src/components/AccountEntryButton', () => ({
  AccountEntryButton: () => null,
}));

describe('expanded mobile screens', () => {
  beforeEach(async () => {
    jest.useFakeTimers();
    mockPush.mockClear();
    mockBack.mockClear();
    mockReplace.mockClear();
    mockAddToCart.mockClear();
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (AsyncStorage.setItem as jest.Mock).mockClear();
    await i18nReady;
    await i18n.changeLanguage('en');
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders home quick links and navigates from the new shortcuts', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Quick links')).toBeTruthy();

    fireEvent.press(screen.getByTestId('home-link-products'));
    fireEvent.press(screen.getByTestId('home-link-cart'));

    expect(mockPush).toHaveBeenNthCalledWith(1, '/products');
    expect(mockPush).toHaveBeenNthCalledWith(2, '/cart');
  });

  it('filters and sorts the products screen through the new quick controls', () => {
    render(<ProductsScreen />);

    fireEvent.press(screen.getByTestId('products-quick-filter-discounted'));

    const discountedProducts = products.filter(
      (product) =>
        typeof product.originalPrice === 'number' && product.originalPrice > product.price
    );
    expect(
      screen.getByText(`${discountedProducts.length} products match the current filters`)
    ).toBeTruthy();

    fireEvent.press(screen.getByTestId('products-sort-price-low'));

    const lowestDiscounted = [...discountedProducts].sort(
      (left, right) => left.price - right.price
    )[0];
    const renderedCards = screen.getAllByTestId(/product-card-/);

    expect(renderedCards[0]?.props.testID).toBe(`product-card-${lowestDiscounted?.id}`);
  });

  it('switches the shared header language toggle between English and Arabic', async () => {
    render(<ProductsScreen />);

    expect(screen.getByText('Products')).toBeTruthy();

    fireEvent.press(screen.getByTestId('language-toggle'));

    expect(await screen.findByText('المنتجات')).toBeTruthy();
    expect(screen.getByPlaceholderText('ابحث عن منتج أو علامة...')).toBeTruthy();
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('riq-mobile-language', 'ar');

    fireEvent.press(screen.getByTestId('language-toggle'));

    expect(await screen.findByText('Products')).toBeTruthy();
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('riq-mobile-language', 'en');
  });

  it('prefills the contact form from the new topic presets', () => {
    render(<ContactScreen />);

    fireEvent.press(screen.getByTestId('contact-topic-business'));

    expect(screen.getByTestId('contact-subject-input').props.value).toBe('inquiry');
    expect(screen.getByTestId('contact-message-input').props.value).toContain(
      'recurring supply'
    );
    expect(screen.getByText('FAQ before you reach out')).toBeTruthy();
  });

  it('shows the richer about sections and keeps back navigation available', () => {
    render(<AboutScreen />);

    expect(screen.getByText('Experience pillars')).toBeTruthy();

    fireEvent.press(screen.getByTestId('about-back-button'));

    expect(mockBack).toHaveBeenCalled();
  });
});
