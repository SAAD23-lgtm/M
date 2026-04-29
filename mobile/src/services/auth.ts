import type { AuthSession as SupabaseAuthSession } from '@supabase/supabase-js';
import type { AuthSession } from '../features/account/types';
import {
  getSupabaseClient,
  getSupabaseConfigError,
  isSupabaseConfigured,
} from './supabase';

function toAuthSession(session: SupabaseAuthSession | null): AuthSession | null {
  if (!session?.user) {
    return null;
  }

  return {
    userId: session.user.id,
    email: session.user.email ?? null,
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at ?? null,
  };
}

function getClientOrThrow() {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error(getSupabaseConfigError());
  }

  return client;
}

export async function getCurrentAuthSession() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const client = getClientOrThrow();
  const {
    data: { session },
    error,
  } = await client.auth.getSession();

  if (error) {
    throw error;
  }

  return toAuthSession(session);
}

export function subscribeToAuthSession(
  listener: (session: AuthSession | null) => void
) {
  const client = getSupabaseClient();
  if (!client) {
    return () => {};
  }

  const {
    data: { subscription },
  } = client.auth.onAuthStateChange((_event, session) => {
    listener(toAuthSession(session));
  });

  return () => {
    subscription.unsubscribe();
  };
}

export async function sendEmailOtp(email: string) {
  const client = getClientOrThrow();
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    throw error;
  }
}

export async function verifyEmailOtp(email: string, token: string) {
  const client = getClientOrThrow();
  const { data, error } = await client.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });

  if (error) {
    throw error;
  }

  if (data.session) {
    return toAuthSession(data.session);
  }

  const {
    data: { session },
  } = await client.auth.getSession();

  return toAuthSession(session);
}

export async function signOutAuth() {
  const client = getClientOrThrow();
  const { error } = await client.auth.signOut();

  if (error) {
    throw error;
  }
}
