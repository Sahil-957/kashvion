import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandLogo } from '@/components/BrandLogo';
import { Card } from '@/components/Card';
import { ScreenShell } from '@/components/ScreenShell';
import { colors } from '@/theme';

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

  const pageWidth = useMemo(() => Math.max(width, 320), [width]);
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
      <View className="flex-1 overflow-hidden bg-background pt-4">
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          disableIntervalMomentum
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={onMomentumEnd}
          getItemLayout={(_, itemIndex) => ({
            length: pageWidth,
            offset: pageWidth * itemIndex,
            index: itemIndex,
          })}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1, overflow: 'hidden' }}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <View
              className="overflow-hidden"
              style={{ width: pageWidth, paddingBottom: 190, paddingHorizontal: SIDE_PADDING }}>
              <View className="gap-4">
                <View className="gap-2.5">
                  <View className="flex-row items-center gap-3">
                    <View className="rounded-2xl bg-[#F1ECFA] px-2 py-2">
                      <BrandLogo variant="mark" width={40} height={40} />
                    </View>
                    <Text className="font-manrope text-[26px] leading-[30px] text-primary">
                      Kashvion
                    </Text>
                  </View>
                  <Text className="font-inter-medium text-xs uppercase tracking-[1.1px] text-tertiary">
                    {item.eyebrow}
                  </Text>
                  <Text className="max-w-[96%] font-manrope-extrabold text-[40px] leading-[46px] tracking-[-0.8px] text-text-primary">
                    {item.title}
                  </Text>
                  <Text className="max-w-[94%] font-inter text-[16px] leading-[28px] text-text-secondary">
                    {item.description}
                  </Text>
                </View>

                <Card style={{ padding: 18 }}>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="font-manrope text-2xl leading-[30px] text-text-primary">
                        {item.cardTitle}
                      </Text>
                      <Text className="mt-1 font-inter-medium text-[15px] leading-[22px] text-text-secondary">
                        {item.cardSubtitle}
                      </Text>
                    </View>
                    <View
                      className="h-[34px] w-[34px] items-center justify-center rounded-full"
                      style={{ backgroundColor: item.accent }}>
                      <Ionicons color={colors.surface} name="sparkles-outline" size={16} />
                    </View>
                  </View>

                  <View
                    className="mt-3 rounded-[20px] p-4"
                    style={{ minHeight: 200, backgroundColor: item.tone }}>
                    {item.mode === 'overview' ? (
                      <>
                        <View className="flex-row items-center justify-between">
                          <View>
                            <Text className="font-inter-medium text-xs uppercase tracking-[1px] text-text-secondary">
                              Utilities
                            </Text>
                            <Text className="mt-1 font-manrope-extrabold text-5xl leading-[38px] text-text-primary">
                              $120
                            </Text>
                          </View>
                          <View className="rounded-full bg-[#FFE3DB] px-3.5 py-2">
                            <Text className="font-inter-medium text-[15px] leading-[22px] text-danger">
                              Due today
                            </Text>
                          </View>
                        </View>
                        <View className="mt-[18px] flex-row gap-3">
                          <View className="flex-1 rounded-[18px] bg-surface p-[14px]">
                            <Ionicons color={colors.primary} name="wallet-outline" size={18} />
                            <Text className="mt-2 font-manrope text-lg leading-6 text-text-primary">
                              Finance
                            </Text>
                            <Text className="mt-1 font-inter text-[15px] leading-[22px] text-text-secondary">
                              2 tracked
                            </Text>
                          </View>
                          <View className="flex-1 rounded-[18px] bg-surface p-[14px]">
                            <Ionicons color={colors.warning} name="time-outline" size={18} />
                            <Text className="mt-2 font-manrope text-lg leading-6 text-text-primary">
                              Upcoming
                            </Text>
                            <Text className="mt-1 font-inter text-[15px] leading-[22px] text-text-secondary">
                              48 hrs
                            </Text>
                          </View>
                        </View>
                      </>
                    ) : null}

                    {item.mode === 'timeline' ? (
                      <View className="gap-3">
                        {[
                          { label: 'Internet', date: 'Apr 12', icon: 'wifi-outline' as const },
                          { label: 'Netflix', date: 'Apr 14', icon: 'tv-outline' as const },
                          { label: 'Card Bill', date: 'Apr 17', icon: 'card-outline' as const },
                        ].map((entry) => (
                          <View
                            key={entry.label}
                            className="flex-row items-center gap-3 rounded-2xl bg-surface p-[14px]">
                            <View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-[#E9EEFF]">
                              <Ionicons color={colors.primary} name={entry.icon} size={16} />
                            </View>
                            <View className="flex-1">
                              <Text className="font-inter-medium text-[15px] leading-[22px] text-text-primary">
                                {entry.label}
                              </Text>
                              <Text className="mt-0.5 font-inter-medium text-xs leading-4 text-text-secondary">
                                {entry.date}
                              </Text>
                            </View>
                            <Ionicons color={colors.textSecondary} name="chevron-forward" size={16} />
                          </View>
                        ))}
                      </View>
                    ) : null}

                    {item.mode === 'steps' ? (
                      <View className="flex-row items-center justify-between">
                        {[
                          { label: 'Capture', icon: 'camera-outline' as const, bg: '#E6EEFF' },
                          { label: 'Review', icon: 'create-outline' as const, bg: '#FFF7DB' },
                          { label: 'Save', icon: 'checkmark-outline' as const, bg: '#EAF8EF' },
                        ].map((step, stepIndex) => (
                          <View key={step.label} className="relative flex-1 items-center">
                            <View
                              className="h-14 w-14 items-center justify-center rounded-[18px]"
                              style={{ backgroundColor: step.bg }}>
                              <Ionicons color={colors.primary} name={step.icon} size={20} />
                            </View>
                            <Text className="mt-2.5 font-inter-medium text-[15px] leading-[22px] text-text-primary">
                              {step.label}
                            </Text>
                            {stepIndex < 2 ? (
                              <View className="absolute right-[-8px] top-5">
                                <Ionicons color={colors.textSecondary} name="arrow-forward" size={16} />
                              </View>
                            ) : null}
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>

                  <View className="mt-[14px] flex-row gap-2.5">
                    {slides.map((slide, slideIndex) => (
                      <View
                        key={slide.id}
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: slideIndex === index ? slide.accent : colors.border,
                        }}
                      />
                    ))}
                  </View>
                </Card>
              </View>
            </View>
          )}
        />

        <View
          className="absolute bottom-0 left-0 right-0 border-t border-[#ECECF2] bg-background px-6 pt-3"
          style={{ paddingBottom: bottomInset }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-2">
              {slides.map((slide, slideIndex) => (
                <Pressable
                  key={slide.id}
                  onPress={() => goToSlide(slideIndex)}
                  className={slideIndex === index ? 'h-1 w-6 rounded-full bg-primary' : 'h-1 w-6 rounded-full bg-[#D8DDE7]'}
                />
              ))}
            </View>
            {!isLast ? (
              <Pressable onPress={onContinue}>
                <Text className="font-inter-semibold text-[13px] leading-[18px] text-text-secondary">
                  Skip
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </ScreenShell>
  );
}
