import type { ExpoConfig } from 'expo/config';

const easProjectId = process.env.EAS_PROJECT_ID?.trim();
const expoOwner = process.env.EXPO_OWNER?.trim();
const androidPackage = process.env.ANDROID_PACKAGE?.trim() || 'com.riq.store';
const iosBundleIdentifier =
  process.env.IOS_BUNDLE_IDENTIFIER?.trim() || 'com.riq.store';

const config: ExpoConfig = {
  name: 'Riq Store',
  slug: 'riq-store-mobile',
  scheme: 'riqstore',
  owner: expoOwner || undefined,
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  icon: './assets/icon.png',
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#153b66',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#153b66',
        image: './assets/splash-icon.png',
        imageWidth: 220,
      },
    ],
    [
      'expo-location',
      {
        locationWhenInUsePermission:
          'Allow Riq Store to access your location so you can pin the delivery address on the map.',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: iosBundleIdentifier,
    buildNumber: '1',
    icon: './assets/icon.png',
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'Allow Riq Store to access your location so you can pin the delivery address on the map.',
    },
  },
  android: {
    package: androidPackage,
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon-foreground.png',
      backgroundImage: './assets/adaptive-icon-background.png',
      monochromeImage: './assets/adaptive-icon-foreground.png',
    },
    permissions: ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION'],
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: false,
        data: [
          {
            scheme: 'riqstore',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    webBaseUrl: process.env.EXPO_PUBLIC_WEB_BASE_URL ?? '',
    eas: easProjectId
      ? {
          projectId: easProjectId,
        }
      : undefined,
  },
};

export default config;
