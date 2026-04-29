import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../features/auth/AuthProvider';
import { ActionButton } from './ActionButton';

type AccountEntryButtonProps = {
  testID?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function AccountEntryButton({
  testID = 'account-entry-button',
  variant = 'secondary',
}: AccountEntryButtonProps) {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const isRTL = i18n.language === 'ar';

  return (
    <ActionButton
      testID={testID}
      label={
        isAuthenticated
          ? (isRTL ? 'حسابي' : 'Account')
          : (isRTL ? 'سجّل' : 'Sign in')
      }
      variant={variant}
      onPress={() => router.push('/account')}
    />
  );
}
