import { StyleSheet, Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { theme } from '../theme';

type EmptyStateProps = {
  title: string;
  body: string;
  ctaLabel: string;
  onPress: () => void;
};

export function EmptyState({ title, body, ctaLabel, onPress }: EmptyStateProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Riq</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <ActionButton label={ctaLabel} onPress={onPress} style={{ alignSelf: 'stretch' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.sandStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.accent,
    fontWeight: '800',
    fontSize: 20,
  },
  title: {
    color: theme.colors.ink,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  body: {
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
