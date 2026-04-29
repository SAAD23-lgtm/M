import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { CartSnapshotItem, Product } from '@riq/shared';
import { products } from '@riq/shared';

const STORAGE_KEY = 'riq-mobile-cart';

type CartEntry = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  isHydrated: boolean;
  items: CartEntry[];
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const productMap = new Map(products.map((product) => [product.id, product]));

export function CartProvider({ children }: PropsWithChildren) {
  const [snapshot, setSnapshot] = useState<CartSnapshotItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) {
          return;
        }

        setSnapshot(JSON.parse(raw));
      })
      .finally(() => {
        setIsHydrated(true);
      });
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot)).catch(() => {});
  }, [isHydrated, snapshot]);

  const items = useMemo(
    () =>
      snapshot
        .map((item) => {
          const product = productMap.get(item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter(Boolean) as CartEntry[],
    [snapshot]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const value: CartContextValue = {
    isHydrated,
    items,
    totalItems,
    subtotal,
    addToCart(product, quantity = 1) {
      setSnapshot((current) => {
        const match = current.find((item) => item.productId === product.id);
        if (!match) {
          return [...current, { productId: product.id, quantity }];
        }

        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      });
    },
    updateQuantity(productId, quantity) {
      if (quantity <= 0) {
        setSnapshot((current) =>
          current.filter((item) => item.productId !== productId)
        );
        return;
      }

      setSnapshot((current) =>
        current.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    },
    removeFromCart(productId) {
      setSnapshot((current) =>
        current.filter((item) => item.productId !== productId)
      );
    },
    clearCart() {
      setSnapshot([]);
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
