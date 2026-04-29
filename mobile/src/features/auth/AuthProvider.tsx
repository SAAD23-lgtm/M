import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthSession, ProfileRecord, SaveProfileInput } from '../account/types';
import {
  getCurrentAuthSession,
  sendEmailOtp,
  signOutAuth,
  subscribeToAuthSession,
  verifyEmailOtp,
} from '../../services/auth';
import {
  getSupabaseConfigError,
  isSupabaseConfigured,
} from '../../services/supabase';
import { loadUserProfile, upsertUserProfile } from '../../services/account';
import { clearCheckoutDraft } from '../../services/paymentBridge';
import { useCart } from '../cart/CartProvider';

type AuthContextValue = {
  isReady: boolean;
  isConfigured: boolean;
  configError: string | null;
  session: AuthSession | null;
  profile: ProfileRecord | null;
  isAuthenticated: boolean;
  isProfileLoading: boolean;
  requestEmailOtp: (email: string) => Promise<void>;
  confirmEmailOtp: (email: string, token: string) => Promise<void>;
  refreshProfile: () => Promise<ProfileRecord | null>;
  saveProfile: (input: Omit<SaveProfileInput, 'userId' | 'email'>) => Promise<ProfileRecord>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { clearCart } = useCart();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const configured = isSupabaseConfigured();
  const configError = configured ? null : getSupabaseConfigError();

  const refreshProfile = async () => {
    if (!session?.userId || !configured) {
      setProfile(null);
      return null;
    }

    setIsProfileLoading(true);
    try {
      const nextProfile = await loadUserProfile(session.userId);
      setProfile(nextProfile);
      return nextProfile;
    } finally {
      setIsProfileLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    if (!configured) {
      setIsReady(true);
      return;
    }

    getCurrentAuthSession()
      .then(async (nextSession) => {
        if (!active) {
          return;
        }

        setSession(nextSession);
        if (nextSession?.userId) {
          setIsProfileLoading(true);
          try {
            const nextProfile = await loadUserProfile(nextSession.userId);
            if (active) {
              setProfile(nextProfile);
            }
          } finally {
            if (active) {
              setIsProfileLoading(false);
            }
          }
        }
      })
      .finally(() => {
        if (active) {
          setIsReady(true);
        }
      });

    const unsubscribe = subscribeToAuthSession(async (nextSession) => {
      setSession(nextSession);
      if (!nextSession?.userId) {
        setProfile(null);
        setIsProfileLoading(false);
        return;
      }

      setIsProfileLoading(true);
      try {
        const nextProfile = await loadUserProfile(nextSession.userId);
        if (active) {
          setProfile(nextProfile);
        }
      } finally {
        if (active) {
          setIsProfileLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [configured]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      isConfigured: configured,
      configError,
      session,
      profile,
      isAuthenticated: Boolean(session?.userId),
      isProfileLoading,
      async requestEmailOtp(email: string) {
        await sendEmailOtp(email.trim().toLowerCase());
      },
      async confirmEmailOtp(email: string, token: string) {
        await verifyEmailOtp(email.trim().toLowerCase(), token.trim());
      },
      refreshProfile,
      async saveProfile(input) {
        if (!session?.userId || !session.email) {
          throw new Error('No authenticated mobile account is available.');
        }

        const nextProfile = await upsertUserProfile({
          userId: session.userId,
          email: session.email,
          ...input,
        });
        setProfile(nextProfile);
        return nextProfile;
      },
      async signOut() {
        if (!configured) {
          return;
        }

        await signOutAuth();
        await clearCheckoutDraft().catch(() => {});
        clearCart();
        setProfile(null);
      },
    }),
    [clearCart, configError, configured, isProfileLoading, isReady, profile, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
