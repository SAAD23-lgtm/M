const mockAsyncStorage = require('@react-native-async-storage/async-storage/jest/async-storage-mock');

jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

jest.mock('react-native-maps', () => ({
  __esModule: true,
  default: 'MapView',
  Marker: 'Marker',
}));

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('expo-image', () => ({
  Image: 'Image',
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');

  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});
