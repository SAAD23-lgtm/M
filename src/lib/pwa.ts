import { withBasePath } from './site';

export type InstallPromptOutcome = 'accepted' | 'dismissed';

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: InstallPromptOutcome;
    platform: string;
  }>;
};

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
}

type StandaloneNavigator = Navigator & {
  standalone?: boolean;
};

type PromptListener = (event: BeforeInstallPromptEvent | null) => void;

let pwaTrackingInitialized = false;
let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;
const promptListeners = new Set<PromptListener>();

function normalizePublicUrl(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : '';
}

function notifyPromptListeners() {
  promptListeners.forEach((listener) => listener(deferredInstallPrompt));
}

export function getAndroidAppUrl() {
  return normalizePublicUrl(import.meta.env.VITE_ANDROID_APP_URL);
}

export function getIosAppUrl() {
  return normalizePublicUrl(import.meta.env.VITE_IOS_APP_URL);
}

export function isStandaloneDisplayMode() {
  if (typeof window === 'undefined') {
    return false;
  }

  const standaloneMedia = window.matchMedia?.('(display-mode: standalone)').matches ?? false;
  const standaloneNavigator = window.navigator as StandaloneNavigator;

  return standaloneMedia || standaloneNavigator.standalone === true;
}

export function isIosDevice() {
  if (typeof window === 'undefined') {
    return false;
  }

  const { navigator } = window;
  return /iPad|iPhone|iPod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function isSafariBrowser() {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent;
  return /Safari/i.test(userAgent) && !/(CriOS|FxiOS|EdgiOS|OPiOS|Android)/i.test(userAgent);
}

export function supportsIosManualInstall() {
  return isIosDevice() && isSafariBrowser() && !isStandaloneDisplayMode();
}

export function ensurePwaInstallTracking() {
  if (pwaTrackingInitialized || typeof window === 'undefined') {
    return;
  }

  pwaTrackingInitialized = true;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    notifyPromptListeners();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    notifyPromptListeners();
  });
}

export function subscribeToDeferredInstallPrompt(listener: PromptListener) {
  ensurePwaInstallTracking();
  promptListeners.add(listener);
  listener(deferredInstallPrompt);

  return () => {
    promptListeners.delete(listener);
  };
}

export function clearDeferredInstallPrompt() {
  deferredInstallPrompt = null;
  notifyPromptListeners();
}

export async function registerPwaServiceWorker() {
  ensurePwaInstallTracking();

  if (
    !import.meta.env.PROD
    || typeof window === 'undefined'
    || !window.isSecureContext
    || !('serviceWorker' in navigator)
  ) {
    return null;
  }

  try {
    return await navigator.serviceWorker.register(withBasePath('/sw.js'), {
      scope: withBasePath('/'),
    });
  } catch (error) {
    console.warn('PWA service worker registration failed.', error);
    return null;
  }
}
