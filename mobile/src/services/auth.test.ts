import type { AuthSession } from '@supabase/supabase-js';
import {
  getCurrentAuthSession,
  sendEmailOtp,
  signOutAuth,
  verifyEmailOtp,
} from './auth';

const mockGetSupabaseClient = jest.fn();
const mockGetSupabaseConfigError = jest.fn(() => 'Missing Supabase config');
const mockIsSupabaseConfigured = jest.fn(() => true);

jest.mock('./supabase', () => ({
  getSupabaseClient: () => mockGetSupabaseClient(),
  getSupabaseConfigError: () => mockGetSupabaseConfigError(),
  isSupabaseConfigured: () => mockIsSupabaseConfigured(),
}));

function createSession(email = 'maha@example.com'): AuthSession {
  return {
    access_token: 'access-token',
    refresh_token: 'refresh-token',
    expires_at: 123456,
    expires_in: 3600,
    token_type: 'bearer',
    user: {
      id: 'user-1',
      email,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2026-04-16T00:00:00.000Z',
    },
  } as AuthSession;
}

describe('auth service', () => {
  beforeEach(() => {
    mockGetSupabaseClient.mockReset();
    mockGetSupabaseConfigError.mockClear();
    mockIsSupabaseConfigured.mockReturnValue(true);
  });

  it('sends email OTP with create-user support enabled', async () => {
    const signInWithOtp = jest.fn().mockResolvedValue({ error: null });
    mockGetSupabaseClient.mockReturnValue({
      auth: {
        signInWithOtp,
      },
    });

    await sendEmailOtp('maha@example.com');

    expect(signInWithOtp).toHaveBeenCalledWith({
      email: 'maha@example.com',
      options: {
        shouldCreateUser: true,
      },
    });
  });

  it('verifies email OTP and normalizes the returned session', async () => {
    const verifyOtp = jest.fn().mockResolvedValue({
      data: {
        session: createSession(),
      },
      error: null,
    });
    mockGetSupabaseClient.mockReturnValue({
      auth: {
        verifyOtp,
        getSession: jest.fn(),
      },
    });

    const result = await verifyEmailOtp('maha@example.com', '123456');

    expect(verifyOtp).toHaveBeenCalledWith({
      email: 'maha@example.com',
      token: '123456',
      type: 'email',
    });
    expect(result).toEqual({
      userId: 'user-1',
      email: 'maha@example.com',
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      expiresAt: 123456,
    });
  });

  it('loads the current session when Supabase is configured', async () => {
    const getSession = jest.fn().mockResolvedValue({
      data: {
        session: createSession('guest@example.com'),
      },
      error: null,
    });
    mockGetSupabaseClient.mockReturnValue({
      auth: {
        getSession,
      },
    });

    const result = await getCurrentAuthSession();

    expect(result?.email).toBe('guest@example.com');
  });

  it('signs out the authenticated user', async () => {
    const signOut = jest.fn().mockResolvedValue({ error: null });
    mockGetSupabaseClient.mockReturnValue({
      auth: {
        signOut,
      },
    });

    await signOutAuth();

    expect(signOut).toHaveBeenCalled();
  });
});
