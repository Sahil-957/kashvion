import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';

interface ScreenShellProps extends PropsWithChildren {
  style?: ViewStyle;
  scrollable?: boolean;
}

export function ScreenShell({ children, style, scrollable = true }: ScreenShellProps) {
  const insets = useSafeAreaInsets();

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom + 24, 40) },
        style,
      ]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', default: undefined })}
        style={styles.flex}>
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    gap: 20,
  },
});
