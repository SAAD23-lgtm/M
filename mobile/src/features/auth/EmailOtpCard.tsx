import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ActionButton } from '../../components/ActionButton';
import { theme } from '../../theme';
import { useAuth } from './AuthProvider';

type EmailOtpCardProps = {
  isRTL: boolean;
  title: string;
  body: string;
  testIDPrefix: string;
  guestLabel?: string;
  onGuestPress?: () => void;
};

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

export function EmailOtpCard({
  isRTL,
  title,
  body,
  testIDPrefix,
  guestLabel,
  onGuestPress,
}: EmailOtpCardProps) {
  const { configError, isConfigured, requestEmailOtp, confirmEmailOtp } = useAuth();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const helperText = useMemo(() => {
    if (step === 'otp') {
      return isRTL
        ? `أدخل كود التحقق المرسل إلى ${email}.`
        : `Enter the verification code sent to ${email}.`;
    }

    return body;
  }, [body, email, isRTL, step]);

  const handleSendOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    setNotice('');

    if (!isValidEmail(normalizedEmail)) {
      setError(isRTL ? 'اكتب بريدًا إلكترونيًا صحيحًا.' : 'Enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await requestEmailOtp(normalizedEmail);
      setEmail(normalizedEmail);
      setStep('otp');
      setNotice(
        isRTL
          ? 'تم إرسال كود التحقق. افتح بريدك وأدخله هنا لإكمال الدخول.'
          : 'The verification code was sent. Check your inbox and enter it here.'
      );
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to send the verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setNotice('');

    if (token.trim().length < 6) {
      setError(isRTL ? 'أدخل كود التحقق المكوّن من 6 أرقام.' : 'Enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await confirmEmailOtp(email, token);
      setNotice(
        isRTL
          ? 'تم تسجيل الدخول بنجاح. يمكنك الآن حفظ معلوماتك وطلباتك.'
          : 'You are signed in now. Your details and orders can be saved from here.'
      );
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to verify the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={[styles.title, isRTL && styles.alignRight]}>{title}</Text>
      <Text style={[styles.body, isRTL && styles.alignRight]}>{isConfigured ? helperText : configError}</Text>

      {isConfigured ? (
        <>
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, isRTL && styles.alignRight]}>
              {step === 'email' ? (isRTL ? 'البريد الإلكتروني' : 'Email address') : (isRTL ? 'كود التحقق' : 'Verification code')}
            </Text>
            <TextInput
              testID={`${testIDPrefix}-${step === 'email' ? 'email' : 'otp'}-input`}
              value={step === 'email' ? email : token}
              onChangeText={step === 'email' ? setEmail : setToken}
              keyboardType={step === 'email' ? 'email-address' : 'number-pad'}
              autoCapitalize="none"
              textAlign={isRTL ? 'right' : 'left'}
              style={styles.input}
              placeholder={
                step === 'email'
                  ? 'name@example.com'
                  : (isRTL ? '123456' : '123456')
              }
            />
          </View>

          {step === 'otp' ? (
            <View style={styles.inlineActions}>
              <ActionButton
                testID={`${testIDPrefix}-verify-button`}
                label={loading ? (isRTL ? 'جارٍ التحقق' : 'Verifying') : (isRTL ? 'تأكيد الدخول' : 'Verify and sign in')}
                onPress={handleVerifyOtp}
                disabled={loading}
                style={styles.flexButton}
              />
              <ActionButton
                testID={`${testIDPrefix}-change-email-button`}
                label={isRTL ? 'تغيير الإيميل' : 'Use another email'}
                onPress={() => {
                  setStep('email');
                  setToken('');
                  setNotice('');
                  setError('');
                }}
                variant="secondary"
                disabled={loading}
                style={styles.flexButton}
              />
            </View>
          ) : (
            <ActionButton
              testID={`${testIDPrefix}-send-button`}
              label={loading ? (isRTL ? 'جارٍ الإرسال' : 'Sending') : (isRTL ? 'إرسال كود الدخول' : 'Send sign-in code')}
              onPress={handleSendOtp}
              disabled={loading}
            />
          )}
        </>
      ) : null}

      {error ? (
        <Text testID={`${testIDPrefix}-error`} style={[styles.error, isRTL && styles.alignRight]}>
          {error}
        </Text>
      ) : null}

      {notice ? (
        <Text testID={`${testIDPrefix}-notice`} style={[styles.notice, isRTL && styles.alignRight]}>
          {notice}
        </Text>
      ) : null}

      {guestLabel && onGuestPress ? (
        <ActionButton
          testID={`${testIDPrefix}-guest-button`}
          label={guestLabel}
          onPress={onGuestPress}
          variant="ghost"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 14,
  },
  title: {
    color: theme.colors.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  body: {
    color: theme.colors.muted,
    lineHeight: 22,
  },
  fieldWrap: {
    gap: 8,
  },
  fieldLabel: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  input: {
    minHeight: 52,
    borderRadius: 20,
    backgroundColor: theme.colors.sand,
    borderWidth: 1,
    borderColor: theme.colors.line,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: theme.colors.text,
  },
  inlineActions: {
    flexDirection: 'row',
    gap: 12,
  },
  flexButton: {
    flex: 1,
  },
  notice: {
    color: theme.colors.success,
    lineHeight: 22,
    fontWeight: '600',
  },
  error: {
    color: theme.colors.danger,
    lineHeight: 22,
    fontWeight: '600',
  },
  alignRight: {
    textAlign: 'right',
  },
});
