import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandLogo } from '@/components/BrandLogo';
import { Card } from '@/components/Card';
import { InputField } from '@/components/InputField';
import { ScreenShell } from '@/components/ScreenShell';
import { colors, typography } from '@/theme';

interface LoginScreenProps {
  onAuthenticate: () => void;
  onBack?: () => void;
  onGoToSignup: () => void;
}

export function LoginScreen({ onAuthenticate, onBack, onGoToSignup }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = !!email.trim() && !!password.trim();

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset will be connected once the auth backend is ready.');
  };

  return (
    <ScreenShell style={styles.screen}>
      {onBack ? (
        <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
          <Ionicons color={colors.textPrimary} name="arrow-back" size={22} />
        </Pressable>
      ) : null}

      <View style={styles.header}>
        <BrandLogo height={56} style={styles.logo} width={200} />
        <Text style={styles.kicker}>Welcome Back</Text>
        <Text style={styles.title}>Log in to Kashvion</Text>
        <Text style={styles.subtitle}>
          Use your email and password, or tap Google to continue with your connected account.
        </Text>
      </View>

      <Card style={styles.card}>
        <InputField
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="hello@kashvion.com"
          value={email}
        />
        <InputField
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
        />
        <Pressable accessibilityRole="button" onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          disabled={!canSubmit}
          onPress={onAuthenticate}
          style={({ pressed }) => [
            styles.actionButton,
            styles.primaryButton,
            !canSubmit ? styles.disabledButton : null,
            pressed && canSubmit ? styles.pressed : null,
          ]}>
          <Text style={styles.primaryButtonLabel}>Login</Text>
        </Pressable>
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerLabel}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.googleRow}>
          <Pressable
            accessibilityLabel="Login with Google"
            accessibilityRole="button"
            onPress={onAuthenticate}
            style={({ pressed }) => [styles.googleButton, pressed ? styles.pressed : null]}>
            <Ionicons color={colors.primary} name="logo-google" size={22} />
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onGoToSignup}
          style={({ pressed }) => [
            styles.actionButton,
            styles.secondaryButton,
            pressed ? styles.pressed : null,
          ]}>
          <Text style={styles.secondaryButtonLabel}>Create Account</Text>
        </Pressable>
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 14,
    paddingTop: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  logo: {
    marginBottom: 4,
  },
  kicker: {
    ...typography.label,
    color: colors.tertiary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.headingXL,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 320,
  },
  card: {
    gap: 14,
    marginTop: 10,
  },
  forgotPassword: {
    ...typography.label,
    color: colors.tertiary,
    textAlign: 'right',
    marginTop: -4,
  },
  primaryButton: {
    marginTop: -2,
    backgroundColor: colors.primary,
  },
  primaryButtonLabel: {
    ...typography.bodyMedium,
    color: colors.surface,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 2,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabel: {
    ...typography.meta,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  googleRow: {
    alignItems: 'center',
  },
  googleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
  },
  secondaryButton: {
    marginTop: -2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  secondaryButtonLabel: {
    ...typography.bodyMedium,
    color: colors.ink,
  },
  actionButton: {
    minHeight: 52,
    width: '100%',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  disabledButton: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
