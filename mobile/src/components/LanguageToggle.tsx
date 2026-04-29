import { Pressable, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  return (
    <Pressable
      testID="language-toggle"
      onPress={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
      style={styles.button}
    >
      <Text style={styles.label}>{t('common.language')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  label: {
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
});
