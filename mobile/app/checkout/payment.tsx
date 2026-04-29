import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WebView } from 'react-native-webview';
import { ActionButton } from '../../src/components/ActionButton';
import { AccountEntryButton } from '../../src/components/AccountEntryButton';
import { LanguageToggle } from '../../src/components/LanguageToggle';
import { PageHeader } from '../../src/components/PageHeader';
import { ScreenBackground } from '../../src/components/ScreenBackground';
import {
  buildCheckoutBridgeUrl,
  buildInjectedCheckoutPayloadScript,
  loadCheckoutDraft,
} from '../../src/services/paymentBridge';
import { parseAppCheckoutResultUrl } from '../../src/services/linking';
import { theme } from '../../src/theme';

export default function CheckoutPaymentScreen() {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [loading, setLoading] = useState(true);
  const [script, setScript] = useState<string | null>(null);
  const bridgeUrl = useMemo(() => buildCheckoutBridgeUrl(), []);

  useEffect(() => {
    loadCheckoutDraft().then((payload) => {
      if (!payload) {
        setLoading(false);
        return;
      }

      setScript(buildInjectedCheckoutPayloadScript(payload));
      setLoading(false);
    });
  }, []);

  if (!bridgeUrl || !script) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenBackground />
        <View style={styles.centered}>
          <PageHeader
            title={t('checkout.paymentTitle')}
            subtitle={
              bridgeUrl
                ? (isRTL ? 'لا توجد بيانات طلب محفوظة للدفع.' : 'No saved checkout data was found.')
                : (isRTL ? 'اضبط EXPO_PUBLIC_WEB_BASE_URL لتفعيل جسر الدفع.' : 'Set EXPO_PUBLIC_WEB_BASE_URL to enable the web checkout bridge.')
            }
            align={isRTL ? 'right' : 'left'}
          >
            <>
              <AccountEntryButton testID="payment-empty-account-action" />
              <LanguageToggle />
            </>
          </PageHeader>
          <ActionButton label={t('common.retry')} onPress={() => router.replace('/checkout')} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground />
      <View style={styles.header}>
        <PageHeader
          title={t('checkout.paymentTitle')}
          subtitle={t('checkout.paymentSubtitle')}
          align={isRTL ? 'right' : 'left'}
        >
          <>
            <AccountEntryButton testID="payment-account-action" />
            <LanguageToggle />
          </>
        </PageHeader>
      </View>
      <View style={styles.webviewWrap}>
        <WebView
          source={{ uri: bridgeUrl }}
          injectedJavaScriptBeforeContentLoaded={script}
          onLoadEnd={() => setLoading(false)}
          onShouldStartLoadWithRequest={(request) => {
            const result = parseAppCheckoutResultUrl(request.url);
            if (!result) {
              return true;
            }

            router.replace({
              pathname: '/checkout/result',
              params: {
                status: result.status,
                id: result.paymentId,
                message: result.message,
              },
            });
            return false;
          }}
          startInLoadingState
        />
        {loading ? (
          <View style={styles.overlay}>
            <ActivityIndicator color={theme.colors.accent} />
            <Text style={styles.overlayText}>{t('common.loading')}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  webviewWrap: {
    flex: 1,
    margin: 18,
    overflow: 'hidden',
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.line,
    backgroundColor: theme.colors.white,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#ffffffd0',
  },
  overlayText: {
    color: theme.colors.accent,
    fontWeight: '700',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    gap: 16,
  },
});
