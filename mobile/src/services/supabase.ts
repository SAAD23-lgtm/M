import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock, type SupabaseClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? '';

let client: SupabaseClient | null = null;
let autoRefreshRegistered = false;

function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  });
}

function registerAutoRefreshListener(activeClient: SupabaseClient) {
  if (Platform.OS === 'web' || autoRefreshRegistered) {
    return;
  }

  autoRefreshRegistered = true;
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      activeClient.auth.startAutoRefresh();
      return;
    }

    activeClient.auth.stopAutoRefresh();
  });
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseConfigError() {
  return 'Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to enable mobile accounts.';
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!client) {
    client = createSupabaseClient();
    registerAutoRefreshListener(client);
  }

  return client;
}
