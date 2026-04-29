import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BRAND_NAME_AR, BRAND_NAME_EN, localizeText } from '@riq/shared';
import { ActionButton } from '../src/components/ActionButton';
import { AccountEntryButton } from '../src/components/AccountEntryButton';
import { LanguageToggle } from '../src/components/LanguageToggle';
import { PageHeader } from '../src/components/PageHeader';
import { ScreenBackground } from '../src/components/ScreenBackground';
import { storefrontContent } from '../src/content/storefront';
import { theme } from '../src/theme';

export default function AboutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const about = storefrontContent.about;

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: Math.max(insets.top, 14) + 10 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <PageHeader
          title={t('about.title')}
          subtitle={t('about.subtitle')}
          align={isRTL ? 'right' : 'left'}
          backButton={{ onPress: () => router.back(), testID: 'about-back-button' }}
        >
          <>
            <AccountEntryButton testID="about-account-action" />
            <LanguageToggle />
          </>
        </PageHeader>

        <View style={styles.hero}>
          <Text style={[styles.brand, isRTL && styles.alignRight]}>
            {isRTL ? BRAND_NAME_AR : BRAND_NAME_EN}
          </Text>
          <Text style={[styles.heroTitle, isRTL && styles.alignRight]}>
            {localizeText(about.intro.title, isRTL)}
          </Text>
          <Text style={[styles.heroText, isRTL && styles.alignRight]}>
            {localizeText(about.intro.body, isRTL)}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {about.stats.map((item) => (
            <View key={item.id} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={[styles.statLabel, isRTL && styles.alignRight]}>
                {localizeText(item.label, isRTL)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <PageHeader
            title={isRTL ? 'مرتكزات التجربة' : 'Experience pillars'}
            subtitle={
              isRTL
                ? 'ثلاث نقاط توضّح لماذا النسخة الحالية منظمة بشكل مختلف للموبايل.'
                : 'Three points that explain why this mobile build is structured differently.'
            }
            align={isRTL ? 'right' : 'left'}
          />
          <View style={styles.cardStack}>
            {about.pillars.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={[styles.cardTitle, isRTL && styles.alignRight]}>
                  {localizeText(item.title, isRTL)}
                </Text>
                <Text style={[styles.cardBody, isRTL && styles.alignRight]}>
                  {localizeText(item.body, isRTL)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <PageHeader
            title={isRTL ? 'القيم التي تحكم التطبيق' : 'The values behind the app'}
            subtitle={
              isRTL
                ? 'قيم عملية مرتبطة بالوضوح وسهولة القرار والاتساق بين المنصتين.'
                : 'Practical values tied to clarity, decision speed, and cross-platform consistency.'
            }
            align={isRTL ? 'right' : 'left'}
          />
          <View style={styles.cardStack}>
            {about.values.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={[styles.cardTitle, isRTL && styles.alignRight]}>
                  {localizeText(item.title, isRTL)}
                </Text>
                <Text style={[styles.cardBody, isRTL && styles.alignRight]}>
                  {localizeText(item.body, isRTL)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <PageHeader
            title={isRTL ? 'كيف وصلنا لهذه النسخة' : 'How this mobile version came together'}
            subtitle={
              isRTL
                ? 'محطات أساسية توضّح مسار بناء التطبيق الحالي.'
                : 'A short timeline describing how the current app structure came together.'
            }
            align={isRTL ? 'right' : 'left'}
          />
          <View style={styles.timelineStack}>
            {about.timeline.map((item, index) => (
              <View key={item.id} style={styles.timelineCard}>
                <View style={styles.timelineBadge}>
                  <Text style={styles.timelineBadgeText}>{index + 1}</Text>
                </View>
                <View style={styles.timelineBody}>
                  <Text style={[styles.cardTitle, isRTL && styles.alignRight]}>
                    {localizeText(item.title, isRTL)}
                  </Text>
                  <Text style={[styles.cardBody, isRTL && styles.alignRight]}>
                    {localizeText(item.body, isRTL)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <PageHeader
            title={isRTL ? 'ما الذي يميز الهيكل الحالي' : 'What the current structure gets right'}
            subtitle={
              isRTL
                ? 'بدائل للمحتوى التسويقي الطويل بشكل مناسب للموبايل.'
                : 'Phone-native substitutes for the heavier long-form web content.'
            }
            align={isRTL ? 'right' : 'left'}
          />
          <View style={styles.cardStack}>
            {about.certifications.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={[styles.cardTitle, isRTL && styles.alignRight]}>
                  {localizeText(item.title, isRTL)}
                </Text>
                <Text style={[styles.cardBody, isRTL && styles.alignRight]}>
                  {localizeText(item.body, isRTL)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomCta}>
          <Text style={[styles.bottomTitle, isRTL && styles.alignRight]}>
            {isRTL ? 'عايز تكمل الطلب أو تتواصل؟' : 'Want to continue or contact the team?'}
          </Text>
          <Text style={[styles.bottomBody, isRTL && styles.alignRight]}>
            {isRTL
              ? 'المحتوى هنا صار أقرب للموبايل، لكن الشراء والدعم ما زالا على بعد خطوة واحدة فقط.'
              : 'The content is now more complete on mobile, while ordering and support remain one tap away.'}
          </Text>
          <View style={[styles.actions, isRTL && styles.actionsRtl]}>
            <ActionButton
              label={t('common.checkout')}
              onPress={() => router.push('/checkout')}
            />
            <ActionButton
              label={t('common.contact')}
              variant="secondary"
              onPress={() => router.push('/contact')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingBottom: 40,
    gap: 18,
  },
  section: {
    gap: 14,
  },
  hero: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.card,
    padding: 20,
    gap: 10,
  },
  brand: {
    color: theme.colors.white,
    fontSize: 30,
    fontWeight: '900',
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  heroText: {
    color: '#d7e9f7',
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 8,
  },
  statValue: {
    color: theme.colors.accent,
    fontSize: 26,
    fontWeight: '900',
  },
  statLabel: {
    color: theme.colors.muted,
    lineHeight: 21,
  },
  cardStack: {
    gap: 12,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 8,
  },
  cardTitle: {
    color: theme.colors.ink,
    fontSize: 17,
    fontWeight: '800',
  },
  cardBody: {
    color: theme.colors.muted,
    lineHeight: 22,
  },
  timelineStack: {
    gap: 12,
  },
  timelineCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  timelineBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.sandStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineBadgeText: {
    color: theme.colors.accent,
    fontWeight: '800',
  },
  timelineBody: {
    flex: 1,
    gap: 8,
  },
  bottomCta: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 10,
  },
  bottomTitle: {
    color: theme.colors.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  bottomBody: {
    color: theme.colors.muted,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  actionsRtl: {
    flexDirection: 'row-reverse',
  },
  alignRight: {
    textAlign: 'right',
  },
});
