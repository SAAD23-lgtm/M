import 'react-native-url-polyfill/auto';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FloatingAccountShortcut } from '../src/components/FloatingAccountShortcut';
import { AppProviders } from '../src/providers/AppProviders';
import '../src/i18n';

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
      <FloatingAccountShortcut />
    </AppProviders>
  );
}
