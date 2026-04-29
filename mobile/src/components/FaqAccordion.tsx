import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

type FaqAccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqAccordionItem[];
  isRTL: boolean;
  initialOpenId?: string;
  testIDPrefix?: string;
};

export function FaqAccordion({
  items,
  isRTL,
  initialOpenId,
  testIDPrefix = 'faq',
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    initialOpenId ?? items[0]?.id ?? null
  );

  return (
    <View style={styles.stack}>
      {items.map((item) => {
        const isOpen = item.id === openId;

        return (
          <View key={item.id} style={styles.card}>
            <Pressable
              testID={`${testIDPrefix}-trigger-${item.id}`}
              onPress={() => setOpenId(isOpen ? null : item.id)}
              style={[styles.header, isRTL && styles.headerRtl]}
            >
              <Text style={[styles.question, isRTL && styles.alignRight]}>
                {item.question}
              </Text>
              <Ionicons
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={theme.colors.muted}
              />
            </Pressable>
            {isOpen ? (
              <Text
                testID={`${testIDPrefix}-answer-${item.id}`}
                style={[styles.answer, isRTL && styles.alignRight]}
              >
                {item.answer}
              </Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 10,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.colors.line,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  headerRtl: {
    flexDirection: 'row-reverse',
  },
  question: {
    flex: 1,
    color: theme.colors.ink,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  answer: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 23,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  alignRight: {
    textAlign: 'right',
  },
});
