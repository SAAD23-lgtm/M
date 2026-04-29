import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock3, LoaderCircle, LogOut, Mail, ShieldCheck, UserRound, X } from 'lucide-react';
import { useWebAuth } from '../features/auth/WebAuthProvider';
import { formatSarPrice } from '../lib/utils';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function WebAccountDialog() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const {
    authReady,
    isConfigured,
    isDialogOpen,
    session,
    profile,
    orders,
    closeAccountDialog,
    confirmEmailOtp,
    refreshOrders,
    requestEmailOtp,
    saveProfile,
    signOut,
  } = useWebAuth();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!isDialogOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAccountDialog();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeAccountDialog, isDialogOpen]);

  useEffect(() => {
    setEmail(session?.email ?? '');
  }, [session]);

  useEffect(() => {
    setFullName(profile?.fullName ?? '');
    setPhone(profile?.phone ?? '');
    setAddress(profile?.defaultAddress ?? '');
  }, [profile]);

  const sectionTitle = useMemo(() => {
    if (session) {
      return isRTL ? 'حسابك المحفوظ' : 'Your saved account';
    }

    return isRTL ? 'سجّل بالإيميل لحفظ بياناتك' : 'Sign in with email to save your details';
  }, [isRTL, session]);

  if (!isDialogOpen) {
    return null;
  }

  const handleSendOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      setError(isRTL ? 'اكتب بريدًا إلكترونيًا صحيحًا.' : 'Enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await requestEmailOtp(normalizedEmail);
      setEmail(normalizedEmail);
      setStep('otp');
      setMessage(
        isRTL
          ? `أرسلنا كود التحقق إلى ${normalizedEmail}.`
          : `We sent a verification code to ${normalizedEmail}.`,
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : (isRTL ? 'تعذر إرسال الكود الآن.' : 'Unable to send the code right now.'),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!token.trim()) {
      setError(isRTL ? 'اكتب كود التحقق أولًا.' : 'Enter the verification code first.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await confirmEmailOtp(email, token);
      setToken('');
      setStep('email');
      setMessage(
        isRTL
          ? 'تم تسجيل الدخول. يمكنك الآن حفظ بياناتك ومراجعة طلباتك.'
          : 'You are signed in now. You can save your details and review your orders.',
      );
    } catch (verifyError) {
      setError(
        verifyError instanceof Error
          ? verifyError.message
          : (isRTL ? 'تعذر تأكيد الكود الآن.' : 'Unable to verify the code right now.'),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!session?.email) {
      return;
    }

    setSavingProfile(true);
    setError('');
    setMessage('');

    try {
      await saveProfile({
        fullName,
        phone,
        defaultAddress: address,
        defaultLat: profile?.defaultLat ?? 24.7136,
        defaultLng: profile?.defaultLng ?? 46.6753,
        locale: isRTL ? 'ar' : 'en',
      });
      await refreshOrders();
      setMessage(
        isRTL
          ? 'تم حفظ بياناتك داخل الحساب.'
          : 'Your details were saved to your account.',
      );
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : (isRTL ? 'تعذر حفظ البيانات الآن.' : 'Unable to save your details right now.'),
      );
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label={isRTL ? 'إغلاق' : 'Close'}
        onClick={closeAccountDialog}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-[4px]"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,#ffffff_0%,#eef6fb_100%)] shadow-[0_32px_100px_-42px_rgba(15,23,42,0.72)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-5 py-5 sm:px-7">
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b738a]">
              {isRTL ? 'الحساب' : 'Account'}
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">{sectionTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              {session
                ? (
                  isRTL
                    ? 'راجع معلوماتك المحفوظة وطلباتك الناجحة، أو حدّث بياناتك في أي وقت.'
                    : 'Review your saved details and successful orders, or update your profile anytime.'
                )
                : (
                  isRTL
                    ? 'التسجيل اختياري بالكامل. يمكنك استخدام الموقع كضيف، أو تسجيل الدخول لحفظ بياناتك وطلباتك.'
                    : 'Signing in is completely optional. You can keep using the site as a guest, or sign in to save your details and orders.'
                )}
            </p>
          </div>

          <button
            type="button"
            onClick={closeAccountDialog}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-7">
          {!authReady ? (
            <div className="flex items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-white/90 px-4 py-4 text-sm font-semibold text-slate-600">
              <LoaderCircle className="h-5 w-5 animate-spin text-[#153b66]" />
              <span>{isRTL ? 'جارٍ تجهيز الحساب.' : 'Preparing your account.'}</span>
            </div>
          ) : !isConfigured ? (
            <div className="rounded-[1.6rem] border border-amber-200 bg-amber-50 px-5 py-5 text-sm leading-7 text-amber-900">
              <p className="font-black">{isRTL ? 'الحساب غير مفعّل على الويب بعد' : 'Web account is not configured yet'}</p>
              <p className="mt-2">
                {isRTL
                  ? 'يمكنك إكمال الطلب كضيف بشكل طبيعي، وسيظهر خيار حفظ البيانات هنا بمجرد تفعيل الحسابات المحفوظة.'
                  : 'You can continue ordering as a guest normally. This area will become available once saved accounts are enabled.'}
              </p>
            </div>
          ) : session ? (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.8rem] border border-white/80 bg-white/95 p-5 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.24)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#153b66,#2b648c)] text-white">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#5b738a]">{isRTL ? 'الإيميل الحالي' : 'Current email'}</p>
                      <p className="text-base font-black text-slate-900">{session.email || '—'}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{isRTL ? 'الاسم' : 'Name'}</span>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#153b66] focus:ring-4 focus:ring-[#153b66]/10"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{isRTL ? 'الجوال' : 'Phone'}</span>
                      <input
                        type="tel"
                        dir="ltr"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#153b66] focus:ring-4 focus:ring-[#153b66]/10"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{isRTL ? 'العنوان الافتراضي' : 'Default address'}</span>
                      <textarea
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        rows={3}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#153b66] focus:ring-4 focus:ring-[#153b66]/10"
                      />
                    </label>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        void handleSaveProfile();
                      }}
                      disabled={savingProfile}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#153b66] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f2f53] disabled:cursor-wait disabled:opacity-70"
                    >
                      {savingProfile ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                      <span>{savingProfile ? (isRTL ? 'جارٍ الحفظ' : 'Saving') : (isRTL ? 'حفظ البيانات' : 'Save details')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        void signOut();
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{isRTL ? 'تسجيل الخروج' : 'Sign out'}</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/80 bg-[linear-gradient(135deg,#153b66,#1f4f7b_52%,#2b648c)] p-5 text-white shadow-[0_28px_80px_-50px_rgba(15,23,42,0.42)]">
                  <p className="text-sm font-semibold text-white/72">{isRTL ? 'طلباتك' : 'Your orders'}</p>
                  <h3 className="mt-2 text-xl font-black">{isRTL ? 'سجل الطلبات الناجحة' : 'Successful order history'}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {isRTL
                      ? 'كل طلب ناجح يتم من الموقع وأنت مسجل سيظهر هنا تلقائيًا، مع بقاء الطلب كضيف متاحًا دائمًا.'
                      : 'Every successful order placed while signed in will appear here automatically, while guest checkout stays available.'}
                  </p>

                  <div className="mt-5 rounded-[1.4rem] bg-white/10 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Clock3 className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-bold">{isRTL ? 'آخر الطلبات المحفوظة' : 'Latest saved orders'}</p>
                        <p className="text-xs text-white/75">
                          {orders.length > 0
                            ? (isRTL ? `${orders.length} طلب محفوظ` : `${orders.length} saved orders`)
                            : (isRTL ? 'لا توجد طلبات محفوظة بعد' : 'No saved orders yet')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {message ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {message}
                </div>
              ) : null}
              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="rounded-[1.8rem] border border-white/80 bg-white/95 p-5 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.24)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#5b738a]">{isRTL ? 'الطلبات المحفوظة' : 'Saved orders'}</p>
                    <h3 className="text-lg font-black text-slate-900">{isRTL ? 'آخر 20 طلبًا' : 'Latest 20 orders'}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      void refreshOrders();
                    }}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    {isRTL ? 'تحديث' : 'Refresh'}
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="rounded-[1.4rem] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm leading-7 text-slate-500">
                    {isRTL
                      ? 'بعد أول طلب ناجح من الموقع وأنت مسجل بالحساب، سيظهر هنا تلقائيًا.'
                      : 'After your first successful website order while signed in, it will appear here automatically.'}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 shadow-[0_12px_26px_-24px_rgba(15,23,42,0.24)]"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-black text-slate-900">{order.customerName}</p>
                            <p className="mt-1 text-xs text-slate-500">{order.paymentReference}</p>
                            <p className="mt-2 text-sm text-slate-600">
                              {order.customerAddress || (isRTL ? 'لا يوجد عنوان محفوظ' : 'No saved address')}
                            </p>
                          </div>
                          <div className={isRTL ? 'text-right' : 'text-left'}>
                            <p className="text-sm font-black text-[#153b66]">{formatSarPrice(order.finalTotal, isRTL)}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {isRTL ? `${order.totalItems} منتج` : `${order.totalItems} items`}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {new Date(order.createdAt).toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="rounded-[1.8rem] border border-white/80 bg-white/95 p-5 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.24)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#153b66,#2b648c)] text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#5b738a]">{isRTL ? 'الدخول بالإيميل' : 'Email sign-in'}</p>
                    <h3 className="text-lg font-black text-slate-900">
                      {step === 'email'
                        ? (isRTL ? 'أرسل كود التحقق' : 'Send the verification code')
                        : (isRTL ? 'أدخل كود التحقق' : 'Enter the verification code')}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  <label className="space-y-2">
                    <span className="text-sm font-bold text-slate-700">
                      {step === 'email'
                        ? (isRTL ? 'البريد الإلكتروني' : 'Email address')
                        : (isRTL ? 'كود التحقق' : 'Verification code')}
                    </span>
                    <input
                      type={step === 'email' ? 'email' : 'text'}
                      inputMode={step === 'email' ? 'email' : 'numeric'}
                      value={step === 'email' ? email : token}
                      onChange={(event) => step === 'email' ? setEmail(event.target.value) : setToken(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#153b66] focus:ring-4 focus:ring-[#153b66]/10"
                      placeholder={step === 'email' ? 'name@example.com' : '123456'}
                    />
                  </label>
                </div>

                {message ? (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    {message}
                  </div>
                ) : null}
                {error ? (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  {step === 'email' ? (
                    <button
                      type="button"
                      onClick={() => {
                        void handleSendOtp();
                      }}
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#153b66] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f2f53] disabled:cursor-wait disabled:opacity-70"
                    >
                      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                      <span>{loading ? (isRTL ? 'جارٍ الإرسال' : 'Sending') : (isRTL ? 'إرسال الكود' : 'Send code')}</span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          void handleVerifyOtp();
                        }}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#153b66] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f2f53] disabled:cursor-wait disabled:opacity-70"
                      >
                        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                        <span>{loading ? (isRTL ? 'جارٍ التحقق' : 'Verifying') : (isRTL ? 'تأكيد الدخول' : 'Verify and sign in')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setStep('email');
                          setToken('');
                          setError('');
                          setMessage('');
                        }}
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        {isRTL ? 'تغيير الإيميل' : 'Use another email'}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/80 bg-[linear-gradient(135deg,#153b66,#1f4f7b_52%,#2b648c)] p-5 text-white shadow-[0_28px_80px_-50px_rgba(15,23,42,0.42)]">
                <p className="text-sm font-semibold text-white/72">{isRTL ? 'لماذا تسجّل؟' : 'Why sign in?'}</p>
                <h3 className="mt-2 text-xl font-black">{isRTL ? 'لتحفظ وقتك ومعلوماتك' : 'To keep your time and details saved'}</h3>
                <div className="mt-5 space-y-3">
                  {[
                    isRTL ? 'حفظ الاسم والجوال والعنوان للطلبات القادمة.' : 'Save your name, phone, and address for future orders.',
                    isRTL ? 'معرفة الطلبات الناجحة التي تمت من الموقع.' : 'Review the successful orders placed from the website.',
                    isRTL ? 'التسجيل اختياري بالكامل والشراء كضيف يظل متاحًا.' : 'Signing in stays fully optional and guest checkout remains available.',
                  ].map((point) => (
                    <div key={point} className="rounded-[1.3rem] bg-white/10 px-4 py-3 text-sm leading-7 text-white/85">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
