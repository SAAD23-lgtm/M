import { PropsWithChildren } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { ActionButton } from './ActionButton';

type PageHeaderProps = PropsWithChildren<{
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'right';
  backButton?: {
    onPress: () => void;
    testID?: string;
  };
  action?: {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    testID?: string;
  };
}>;

export function PageHeader({
  overline,
  title,
  subtitle,
  align = 'left',
  backButton,
  action,
  children,
}: PageHeaderProps) {
  return (
    <View style={styles.wrapper}>
      {backButton ? (
        <Pressable
          testID={backButton.testID}
          onPress={backButton.onPress}
          style={styles.backButton}
        >
          <Ionicons
            name={align === 'right' ? 'arrow-forward' : 'arrow-back'}
            size={18}
            color={theme.colors.accent}
          />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        {overline ? (
          <Text style={[styles.overline, align === 'right' && styles.alignRight]}>
            {overline}
          </Text>
        ) : null}
        <Text style={[styles.title, align === 'right' && styles.alignRight]}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, align === 'right' && styles.alignRight]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action || children ? (
        <View style={styles.actions}>
          {action ? (
            <ActionButton
              label={action.label}
              onPress={action.onPress}
              variant={action.variant ?? 'secondary'}
              testID={action.testID}
            />
          ) : null}
          {children}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  actions: {
    paddingTop: 4,
    gap: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  overline: {
    color: theme.colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: theme.colors.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 10,
  },
  alignRight: {
    textAlign: 'right',
  },
});
