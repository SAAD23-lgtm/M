import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter, useSegments } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../features/auth/AuthProvider';
import { theme } from '../theme';

export function FloatingAccountShortcut() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const isRTL = i18n.language === 'ar';
  const insideTabs = segments[0] === '(tabs)';

  if (pathname === '/account') {
    return null;
  }

  const bottomOffset = insideTabs
    ? Math.max(insets.bottom, 10) + 68
    : Math.max(insets.bottom, 10) + 18;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View style={[styles.wrap, { bottom: bottomOffset }]}>
        <Pressable
          testID="floating-account-shortcut"
          onPress={() => router.push('/account')}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Ionicons
            name={isAuthenticated ? 'person-circle-outline' : 'mail-open-outline'}
            size={18}
            color={theme.colors.white}
          />
          <Text style={styles.label}>
            {isAuthenticated
              ? (isRTL ? 'حسابي' : 'Account')
              : (isRTL ? 'سجّل بالإيميل' : 'Sign in with email')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 18,
    left: 18,
    alignItems: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#10253f',
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
  label: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
