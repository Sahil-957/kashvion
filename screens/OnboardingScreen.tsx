import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenShell } from '@/components/ScreenShell';
import { colors, typography } from '@/theme';

const slides = [
  {
    eyebrow: 'Calm oversight',
    title: 'Your life admin, classified and clear.',
    description:
      'Track bills, subscriptions, and essentials in one structured system with premium clarity.',
  },
  {
    eyebrow: 'Smart visibility',
    title: 'See what needs attention before it turns urgent.',
    description:
      'Kashvion surfaces upcoming dues, organizes every category, and keeps your routine steady.',
  },
];

interface OnboardingScreenProps {
  onContinue: () => void;
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  return (
    <ScreenShell>
      <View style={styles.hero}>
        <Text style={styles.brand}>Kashvion</Text>
        <Text style={styles.eyebrow}>{slide.eyebrow}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      <Card style={styles.previewCard}>
        <Text style={styles.previewTitle}>System Status</Text>
        <Text style={styles.previewMeta}>3 items need attention</Text>
        <View style={styles.previewLine} />
        <View style={styles.previewDotRow}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: colors.secondary }]} />
          <View style={[styles.dot, { backgroundColor: colors.tertiary }]} />
        </View>
      </Card>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((item, slideIndex) => (
            <View
              key={item.title}
              style={[styles.pageDot, slideIndex === index ? styles.pageDotActive : null]}
            />
          ))}
        </View>
        <Button
          label={isLast ? 'Get Started' : 'Next'}
          onPress={() => (isLast ? onContinue() : setIndex((current) => current + 1))}
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 10,
    paddingTop: 24,
  },
  brand: {
    ...typography.label,
    color: colors.primary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  eyebrow: {
    ...typography.meta,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    ...typography.headingXL,
    color: colors.textPrimary,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
  previewCard: {
    marginTop: 12,
    backgroundColor: '#FDFDFD',
    gap: 10,
  },
  previewTitle: {
    ...typography.headingM,
    color: colors.textPrimary,
  },
  previewMeta: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  previewLine: {
    height: 140,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
  },
  previewDotRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  footer: {
    marginTop: 'auto',
    gap: 18,
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
});
