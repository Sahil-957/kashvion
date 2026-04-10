import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenShell } from '@/components/ScreenShell';
import { colors, typography } from '@/theme';

const SIDE_PADDING = 24;
const slides = [
  {
    id: 'overview',
    eyebrow: 'Calm Oversight',
    title: 'Organize your bills without the chaos.',
    description:
      'Track payments, subscriptions, and due dates in one place with a calmer daily view.',
    cardTitle: 'Today at a glance',
    cardSubtitle: '3 items need attention',
    tone: '#EEF2FF',
    accent: colors.primary,
    mode: 'overview' as const,
  },
  {
    id: 'focus',
    eyebrow: 'Smart Visibility',
    title: 'See what needs attention before it gets urgent.',
    description:
      'Upcoming and overdue items stay visible so you can act before anything slips.',
    cardTitle: 'Priority queue',
    cardSubtitle: 'Sorted by due date',
    tone: '#FFF7DB',
    accent: colors.secondary,
    mode: 'timeline' as const,
  },
  {
    id: 'capture',
    eyebrow: 'Smooth Capture',
    title: 'Add, confirm, and save new bills in a simple flow.',
    description:
      'Capture a bill, refine the details, and keep your system updated in just a few taps.',
    cardTitle: 'Capture flow',
    cardSubtitle: 'Camera to confirmation',
    tone: '#FFF1E3',
    accent: colors.tertiary,
    mode: 'steps' as const,
  },
];

interface OnboardingScreenProps {
  onContinue: () => void;
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList<(typeof slides)[number]>>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);

  const pageWidth = useMemo(() => Math.max(width - SIDE_PADDING * 2, 280), [width]);
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 14 : 20);
  const isLast = index === slides.length - 1;

  const goToSlide = useCallback(
    (nextIndex: number, animated = true) => {
      indexRef.current = nextIndex;
      setIndex(nextIndex);
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * pageWidth,
        animated,
      });
    },
    [pageWidth]
  );

  const onMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
      indexRef.current = nextIndex;
      setIndex(nextIndex);
    },
    [pageWidth]
  );

  return (
    <ScreenShell scrollable={false}>
      <View style={styles.screen}>
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={onMomentumEnd}
          getItemLayout={(_, itemIndex) => ({
            length: pageWidth,
            offset: pageWidth * itemIndex,
            index: itemIndex,
          })}
          contentContainerStyle={styles.sliderContent}
          style={styles.slider}
          renderItem={({ item }) => (
            <View style={[styles.page, { width: pageWidth }]}>
              <View style={styles.hero}>
                <Text style={styles.brand}>KASHVION</Text>
                <Text style={styles.eyebrow}>{item.eyebrow}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>

              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardTitle}>{item.cardTitle}</Text>
                    <Text style={styles.cardSubtitle}>{item.cardSubtitle}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: item.accent }]}>
                    <Ionicons color={colors.surface} name="sparkles-outline" size={16} />
                  </View>
                </View>

                <View style={[styles.visual, { backgroundColor: item.tone }]}>
                  {item.mode === 'overview' ? (
                    <>
                      <View style={styles.overviewTop}>
                        <View>
                          <Text style={styles.visualLabel}>Utilities</Text>
                          <Text style={styles.visualAmount}>$120</Text>
                        </View>
                        <View style={styles.alertPill}>
                          <Text style={styles.alertText}>Due today</Text>
                        </View>
                      </View>
                      <View style={styles.metricRow}>
                        <View style={styles.metricCard}>
                          <Ionicons color={colors.primary} name="wallet-outline" size={18} />
                          <Text style={styles.metricTitle}>Finance</Text>
                          <Text style={styles.metricMeta}>2 tracked</Text>
                        </View>
                        <View style={styles.metricCard}>
                          <Ionicons color={colors.warning} name="time-outline" size={18} />
                          <Text style={styles.metricTitle}>Upcoming</Text>
                          <Text style={styles.metricMeta}>48 hrs</Text>
                        </View>
                      </View>
                    </>
                  ) : null}

                  {item.mode === 'timeline' ? (
                    <View style={styles.timeline}>
                      {[
                        { label: 'Internet', date: 'Apr 12', icon: 'wifi-outline' as const },
                        { label: 'Netflix', date: 'Apr 14', icon: 'tv-outline' as const },
                        { label: 'Card Bill', date: 'Apr 17', icon: 'card-outline' as const },
                      ].map((entry) => (
                        <View key={entry.label} style={styles.timelineRow}>
                          <View style={styles.timelineIcon}>
                            <Ionicons color={colors.primary} name={entry.icon} size={16} />
                          </View>
                          <View style={styles.timelineCopy}>
                            <Text style={styles.timelineTitle}>{entry.label}</Text>
                            <Text style={styles.timelineMeta}>{entry.date}</Text>
                          </View>
                          <Ionicons color={colors.textSecondary} name="chevron-forward" size={16} />
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {item.mode === 'steps' ? (
                    <View style={styles.steps}>
                      {[
                        { label: 'Capture', icon: 'camera-outline' as const, bg: '#E6EEFF' },
                        { label: 'Review', icon: 'create-outline' as const, bg: '#FFF7DB' },
                        { label: 'Save', icon: 'checkmark-outline' as const, bg: '#EAF8EF' },
                      ].map((step, stepIndex) => (
                        <View key={step.label} style={styles.stepWrap}>
                          <View style={[styles.stepIcon, { backgroundColor: step.bg }]}>
                            <Ionicons color={colors.primary} name={step.icon} size={20} />
                          </View>
                          <Text style={styles.stepLabel}>{step.label}</Text>
                          {stepIndex < 2 ? (
                            <View style={styles.stepConnector}>
                              <Ionicons color={colors.textSecondary} name="arrow-forward" size={16} />
                            </View>
                          ) : null}
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>

                <View style={styles.innerDots}>
                  {slides.map((slide, slideIndex) => (
                    <View
                      key={slide.id}
                      style={[
                        styles.innerDot,
                        { backgroundColor: slideIndex === index ? slide.accent : colors.border },
                      ]}
                    />
                  ))}
                </View>
              </Card>
            </View>
          )}
        />

        <View style={[styles.footer, { paddingBottom: bottomInset }]}>
          <View style={styles.footerTop}>
            <View style={styles.pagination}>
              {slides.map((slide, slideIndex) => (
                <Pressable
                  key={slide.id}
                  onPress={() => goToSlide(slideIndex)}
                  style={[styles.pageDot, slideIndex === index ? styles.pageDotActive : null]}
                />
              ))}
            </View>
            {!isLast ? (
              <Pressable onPress={onContinue}>
                <Text style={styles.skip}>Skip</Text>
              </Pressable>
            ) : null}
          </View>
          <Button
            label={isLast ? 'Get Started' : 'Next'}
            onPress={() => {
              if (isLast) {
                onContinue();
                return;
              }

              goToSlide(index + 1);
            }}
            style={styles.button}
          />
        </View>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: SIDE_PADDING,
  },
  slider: {
    flex: 1,
  },
  sliderContent: {
    flexGrow: 1,
  },
  page: {
    gap: 20,
    paddingBottom: 150,
  },
  hero: {
    gap: 10,
  },
  brand: {
    ...typography.label,
    color: colors.primary,
    letterSpacing: 2,
  },
  eyebrow: {
    ...typography.meta,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  title: {
    ...typography.headingXL,
    color: colors.textPrimary,
    fontSize: 28,
    lineHeight: 36,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
  },
  card: {
    gap: 14,
    padding: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    ...typography.headingL,
    color: colors.textPrimary,
  },
  cardSubtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: 4,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visual: {
    minHeight: 220,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visualLabel: {
    ...typography.meta,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  visualAmount: {
    ...typography.headingXL,
    color: colors.textPrimary,
    marginTop: 4,
  },
  alertPill: {
    borderRadius: 999,
    backgroundColor: '#FFE3DB',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  alertText: {
    ...typography.bodyMedium,
    color: colors.danger,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  metricCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 8,
  },
  metricTitle: {
    ...typography.headingM,
    color: colors.textPrimary,
  },
  metricMeta: {
    ...typography.body,
    color: colors.textSecondary,
  },
  timeline: {
    gap: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: 14,
  },
  timelineIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9EEFF',
  },
  timelineCopy: {
    flex: 1,
  },
  timelineTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  timelineMeta: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 2,
  },
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepWrap: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    marginTop: 10,
  },
  stepConnector: {
    position: 'absolute',
    right: -8,
    top: 20,
  },
  innerDots: {
    flexDirection: 'row',
    gap: 10,
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  footer: {
    position: 'absolute',
    left: SIDE_PADDING,
    right: SIDE_PADDING,
    bottom: 0,
    backgroundColor: colors.background,
    paddingTop: 12,
    gap: 12,
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  pageDot: {
    width: 24,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#D8DDE7',
  },
  pageDotActive: {
    backgroundColor: colors.primary,
  },
  skip: {
    ...typography.label,
    color: colors.textSecondary,
  },
  button: {
    minHeight: 52,
  },
});
