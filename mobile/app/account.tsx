import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { formatSarPrice } from '@riq/shared';
import { ActionButton } from '../src/components/ActionButton';
import { EmptyState } from '../src/components/EmptyState';
import { LanguageToggle } from '../src/components/LanguageToggle';
import { PageHeader } from '../src/components/PageHeader';
import { ScreenBackground } from '../src/components/ScreenBackground';
import { EmailOtpCard } from '../src/features/auth/EmailOtpCard';
import { type OrderSummary } from '../src/features/account/types';
import { useAuth } from '../src/features/auth/AuthProvider';
import { listUserOrders } from '../src/services/account';
import { theme } from '../src/theme';

function formatOrderDate(value: string, isRTL: boolean) {
  try {
    return new Date(value).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return value;
  }
}

export default function AccountScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const {
    configError,
    isAuthenticated,
    isConfigured,
    isProfileLoading,
    isReady,
    profile,
    session,
    signOut,
  } = useAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [signOutError, setSignOutError] = useState('');
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    let active = true;

    if (!isReady || !isAuthenticated || !session?.userId) {
      setOrders([]);
      setOrdersError('');
      setLoadingOrders(false);
      return;
    }

    setLoadingOrders(true);
    setOrdersError('');

    listUserOrders(session.userId)
      .then((nextOrders) => {
        if (active) {
          setOrders(nextOrders);
        }
      })
      .catch((error) => {
        if (active) {
          setOrdersError(
            error instanceof Error
              ? error.message
              : (isRTL ? 'تعذر تحميل الطلبات الآن.' : 'Unable to load your saved orders right now.')
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoadingOrders(false);
        }
      });

    return () => {
      active = false;
    };
  }, [isAuthenticated, isRTL, isReady, session?.userId]);

  const summaryItems = useMemo(
    () => [
      {
        label: isRTL ? 'الإيميل' : 'Email',
        value: session?.email || '—',
      },
      {
        label: isRTL ? 'الاسم المحفوظ' : 'Saved name',
        value: profile?.fullName || '—',
      },
      {
        label: isRTL ? 'الجوال' : 'Phone',
        value: profile?.phone || '—',
      },
      {
        label: isRTL ? 'العنوان الافتراضي' : 'Default address',
        value: profile?.defaultAddress || '—',
      },
    ],
    [isRTL, profile?.defaultAddress, profile?.fullName, profile?.phone, session?.email]
  );

  const handleSignOut = async () => {
    setSignOutError('');
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      setSignOutError(
        error instanceof Error
          ? error.message
          : (isRTL ? 'تعذر تسجيل الخروج الآن.' : 'Unable to sign out right now.')
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground />
      <ScrollView contentContainerStyle={styles.content}>
        <PageHeader
          overline={isRTL ? 'الحساب' : 'Account'}
          title={
            isRTL ? 'حفظ معلوماتك وطلباتك من التطبيق' : 'Saved details and orders from the app'
          }
          subtitle={
            isRTL
              ? 'يمكنك تسجيل الدخول بالإيميل لحفظ بياناتك الأساسية ومراجعة الطلبات التي اكتملت من تطبيق الموبايل.'
              : 'Sign in with your email to save your essentials and review successful orders placed from the mobile app.'
          }
          align={isRTL ? 'right' : 'left'}
          backButton={{
            onPress: () => router.back(),
            testID: 'account-back-button',
          }}
          action={
            isAuthenticated
              ? {
                  label: isRTL ? 'تسجيل الخروج' : 'Sign out',
                  onPress: handleSignOut,
                  variant: 'secondary',
                  testID: 'account-signout-button',
                }
              : undefined
          }
        >
          <LanguageToggle />
        </PageHeader>

        {!isConfigured ? (
          <View style={styles.card}>
            <Text style={[styles.cardTitle, isRTL && styles.alignRight]}>
              {isRTL ? 'حفظ الحسابات غير مفعّل بعد' : 'Saved accounts are not configured yet'}
            </Text>
            <Text style={[styles.cardBody, isRTL && styles.alignRight]}>
              {configError}
            </Text>
            <ActionButton
              label={isRTL ? 'العودة للرئيسية' : 'Back to home'}
              onPress={() => router.replace('/')}
            />
          </View>
        ) : null}

        {isConfigured && !isAuthenticated ? (
          <EmailOtpCard
            isRTL={isRTL}
            title={isRTL ? 'سجّل بالإيميل داخل التطبيق' : 'Sign in with your email inside the app'}
            body={
              isRTL
                ? 'بعد تسجيل الدخول سيُحفظ الإيميل وبياناتك الأساسية، وستظهر هنا الطلبات الناجحة التي تمت من التطبيق.'
                : 'After signing in, your email and basic details can be saved here, and successful mobile-app orders will appear in this screen.'
            }
            testIDPrefix="account-auth"
          />
        ) : null}

        {isConfigured && isAuthenticated ? (
          <>
            <View style={styles.card}>
              <Text style={[styles.cardTitle, isRTL && styles.alignRight]}>
                {isRTL ? 'ملخص الحساب المحفوظ' : 'Saved account summary'}
              </Text>
              <Text style={[styles.cardBody, isRTL && styles.alignRight]}>
                {isProfileLoading
                  ? (isRTL ? 'جارٍ تحميل بياناتك المحفوظة.' : 'Loading your saved details.')
                  : (isRTL
                      ? 'هذه البيانات تُستخدم لتعبئة الطلبات القادمة بسرعة، ويمكن تحديثها من شاشة الدفع عند كل طلب.'
                      : 'These details are used to prefill future checkouts and can be refreshed whenever you place a new order.')}
              </Text>

              {summaryItems.map((item) => (
                <View key={item.label} style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, isRTL && styles.alignRight]}>{item.label}</Text>
                  <Text style={[styles.summaryValue, isRTL && styles.alignRight]}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={[styles.cardTitle, isRTL && styles.alignRight]}>
                {isRTL ? 'آخر الطلبات من التطبيق' : 'Latest orders from the app'}
              </Text>
              <Text style={[styles.cardBody, isRTL && styles.alignRight]}>
                {isRTL
                  ? 'نعرض هنا آخر 20 طلبًا ناجحًا تم تنفيذها من تطبيق الموبايل فقط.'
                  : 'This list shows the latest 20 successful orders that came from the mobile app only.'}
              </Text>

              {loadingOrders ? (
                <Text style={[styles.inlineNote, isRTL && styles.alignRight]}>
                  {isRTL ? 'جارٍ تحميل سجل الطلبات.' : 'Loading your order history.'}
                </Text>
              ) : null}

              {ordersError ? (
                <Text style={[styles.errorText, isRTL && styles.alignRight]}>{ordersError}</Text>
              ) : null}

              {!loadingOrders && !orders.length && !ordersError ? (
                <EmptyState
                  title={isRTL ? 'لا توجد طلبات محفوظة بعد' : 'No saved orders yet'}
                  body={
                    isRTL
                      ? 'بعد نجاح أول طلب من التطبيق وأنت مسجل بالحساب، سيظهر هنا تلقائيًا.'
                      : 'After your first successful mobile order while signed in, it will appear here automatically.'
                  }
                  ctaLabel={isRTL ? 'ابدأ التسوق' : 'Start shopping'}
                  onPress={() => router.replace('/products')}
                />
              ) : null}

              {orders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.orderTitle, isRTL && styles.alignRight]}>
                        {isRTL ? `طلب ${order.paymentReference}` : `Order ${order.paymentReference}`}
                      </Text>
                      <Text style={[styles.orderMeta, isRTL && styles.alignRight]}>
                        {formatOrderDate(order.createdAt, isRTL)}
                      </Text>
                    </View>
                    <Text style={styles.orderTotal}>{formatSarPrice(order.finalTotal, isRTL)}</Text>
                  </View>

                  <Text style={[styles.orderMeta, isRTL && styles.alignRight]}>
                    {isRTL
                      ? `${order.totalItems} عنصر • ${order.customerName}`
                      : `${order.totalItems} items • ${order.customerName}`}
                  </Text>

                  <View style={styles.orderLinesWrap}>
                    {order.items.map((item) => (
                      <View key={`${order.id}-${item.productId}`} style={styles.orderLine}>
                        <Text style={[styles.orderLineText, isRTL && styles.alignRight]}>
                          {item.name}
                        </Text>
                        <Text style={styles.orderLineText}>
                          {item.quantity} × {formatSarPrice(item.unitPrice, isRTL)}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : null}

        {signOutError ? (
          <Text style={[styles.errorText, isRTL && styles.alignRight]}>{signOutError}</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 18,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 14,
  },
  cardTitle: {
    color: theme.colors.ink,
    fontSize: 22,
    fontWeight: '800',
  },
  cardBody: {
    color: theme.colors.muted,
    lineHeight: 22,
  },
  summaryRow: {
    backgroundColor: theme.colors.sand,
    borderRadius: 20,
    padding: 14,
    gap: 6,
  },
  summaryLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  summaryValue: {
    color: theme.colors.text,
    fontWeight: '800',
    lineHeight: 22,
  },
  orderCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 16,
    gap: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  orderTitle: {
    color: theme.colors.ink,
    fontWeight: '800',
    fontSize: 16,
  },
  orderMeta: {
    color: theme.colors.muted,
    lineHeight: 20,
  },
  orderTotal: {
    color: theme.colors.accent,
    fontWeight: '900',
    fontSize: 16,
  },
  orderLinesWrap: {
    gap: 8,
  },
  orderLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.line,
  },
  orderLineText: {
    color: theme.colors.text,
    fontWeight: '600',
    flex: 1,
  },
  inlineNote: {
    color: theme.colors.muted,
    lineHeight: 22,
  },
  errorText: {
    color: theme.colors.danger,
    lineHeight: 22,
    fontWeight: '600',
  },
  alignRight: {
    textAlign: 'right',
  },
});
