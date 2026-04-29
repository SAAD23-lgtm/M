import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../../src/components/ActionButton';
import { LanguageToggle } from '../../src/components/LanguageToggle';
import { PageHeader } from '../../src/components/PageHeader';
import { useAuth } from '../../src/features/auth/AuthProvider';
import { ScreenBackground } from '../../src/components/ScreenBackground';
import { useCart } from '../../src/features/cart/CartProvider';
import { persistCompletedOrder } from '../../src/services/account';
import {
  clearCheckoutDraft,
  loadCheckoutDraftRecord,
} from '../../src/services/paymentBridge';
import { theme } from '../../src/theme';

export default function CheckoutResultScreen() {
  const router = useRouter();
  const { status, id, message } = useLocalSearchParams<{
    status?: 'success' | 'cancelled' | 'error';
    id?: string;
    message?: string;
  }>();
  const { i18n, t } = useTranslation();
  const { isAuthenticated, isReady: isAuthReady, session } = useAuth();
  const { clearCart } = useCart();
  const isRTL = i18n.language === 'ar';
  const syncAttemptedRef = useRef(false);
  const [syncState, setSyncState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    if (status !== 'success') {
      clearCheckoutDraft().catch(() => {});
      return;
    }

    clearCart();
  }, [clearCart, status]);

  useEffect(() => {
    if (status !== 'success' || syncAttemptedRef.current || !isAuthReady) {
      return;
    }

    syncAttemptedRef.current = true;

    const syncSuccessfulOrder = async () => {
      const draftRecord = await loadCheckoutDraftRecord();

      if (!draftRecord) {
        setSyncState('saved');
        return;
      }

      const paymentReference = id || draftRecord.reference;

      if (!isAuthenticated || !session?.userId) {
        await clearCheckoutDraft().catch(() => {});
        setSyncState('saved');
        return;
      }

      setSyncState('saving');
      setSyncMessage(
        isRTL
          ? 'جارٍ حفظ الطلب داخل حسابك.'
          : 'Saving this order into your account.'
      );

      try {
        await persistCompletedOrder({
          userId: session.userId,
          paymentReference,
          payload: draftRecord.payload,
        });
        await clearCheckoutDraft().catch(() => {});
        setSyncState('saved');
        setSyncMessage(
          isRTL
            ? 'تم حفظ الطلب داخل حسابك بنجاح.'
            : 'This order was saved inside your account successfully.'
        );
      } catch (error) {
        setSyncState('failed');
        setSyncMessage(
          error instanceof Error
            ? error.message
            : (isRTL
                ? 'تم الدفع بنجاح لكن تعذر حفظ الطلب داخل الحساب الآن.'
                : 'Payment succeeded, but the order could not be saved in your account right now.')
        );
      }
    };

    void syncSuccessfulOrder();
  }, [id, isAuthReady, isAuthenticated, isRTL, session?.userId, status]);

  const title =
    status === 'success'
      ? t('checkout.resultSuccess')
      : status === 'cancelled'
        ? t('checkout.resultCancelled')
        : t('checkout.resultError');

  const body =
    message ||
    (status === 'success'
      ? isRTL
        ? `تم استلام رقم العملية ${id ?? ''} ويمكنك الآن العودة للتطبيق ومتابعة الطلب.`
        : `Payment ${id ?? ''} has been received. You can now continue inside the app.`
      : status === 'cancelled'
        ? isRTL
          ? 'أُغلق مسار الدفع قبل الإتمام. يمكنك العودة وإعادة المحاولة.'
          : 'The payment flow was closed before completion. You can go back and retry.'
        : isRTL
          ? 'حدث خطأ أثناء المعالجة. ارجع لصفحة الدفع وحاول مجددًا.'
          : 'An error happened during processing. Return to the payment screen and try again.');

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground />
      <View style={styles.centered}>
        <View style={[styles.badge, status === 'success' && styles.successBadge]}>
          <Text style={styles.badgeText}>
            {status === 'success' ? 'OK' : status === 'cancelled' ? '...' : '!'}
          </Text>
        </View>
        <PageHeader title={title} subtitle={body} align={isRTL ? 'right' : 'left'}>
          <LanguageToggle />
        </PageHeader>
        {syncMessage ? (
          <Text
            testID="result-sync-message"
            style={[
              styles.syncText,
              syncState === 'failed' ? styles.syncError : styles.syncSuccess,
              isRTL && styles.alignRight,
            ]}
          >
            {syncMessage}
          </Text>
        ) : null}
        <ActionButton
          testID="result-back-home-button"
          label={t('common.backToHome')}
          onPress={() => router.replace('/')}
        />
        {status === 'success' && syncState === 'failed' ? (
          <ActionButton
            testID="result-retry-sync-button"
            label={isRTL ? 'إعادة حفظ الطلب في الحساب' : 'Retry saving to account'}
            variant="secondary"
            onPress={() => {
              syncAttemptedRef.current = false;
              setSyncState('idle');
              setSyncMessage('');
            }}
          />
        ) : null}
        {status === 'success' && isAuthenticated ? (
          <ActionButton
            testID="result-open-account-button"
            label={isRTL ? 'فتح الحساب' : 'Open account'}
            variant="secondary"
            onPress={() => router.replace('/account')}
          />
        ) : null}
        {status !== 'success' ? (
          <ActionButton
            testID="result-retry-checkout-button"
            label={t('common.checkout')}
            variant="secondary"
            onPress={() => router.replace('/checkout')}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    gap: 18,
  },
  badge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
  },
  successBadge: {
    backgroundColor: '#d1fae5',
  },
  badgeText: {
    color: theme.colors.accent,
    fontSize: 28,
    fontWeight: '900',
  },
  syncText: {
    lineHeight: 22,
    fontWeight: '600',
  },
  syncSuccess: {
    color: theme.colors.success,
  },
  syncError: {
    color: theme.colors.danger,
  },
  alignRight: {
    textAlign: 'right',
  },
});
