import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../features/auth/AuthProvider';
import { CartProvider } from '../features/cart/CartProvider';
import i18n from '../i18n';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <CartProvider>
          <AuthProvider>{children}</AuthProvider>
        </CartProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
