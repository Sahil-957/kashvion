import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { InputField } from '@/components/InputField';
import { ScreenShell } from '@/components/ScreenShell';
import { colors, typography } from '@/theme';

interface AuthScreenProps {
  onAuthenticate: () => void;
}

export function AuthScreen({ onAuthenticate }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.kicker}>Secure Access</Text>
        <Text style={styles.title}>Welcome back to Kashvion</Text>
        <Text style={styles.subtitle}>Sign in to manage bills, reminders, and subscriptions.</Text>
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
        <Button
          disabled={!email || !password}
          label="Sign In"
          onPress={onAuthenticate}
          style={styles.primaryButton}
        />
        <Button
          label="Continue with Google"
          onPress={onAuthenticate}
          variant="outline"
          style={styles.googleButton}
        />
        <View style={styles.googleIcon}>
          <Ionicons color={colors.primary} name="logo-google" size={18} />
        </View>
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: 10,
    marginTop: 60,
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
    gap: 18,
    marginTop: 24,
  },
  primaryButton: {
    marginTop: 6,
  },
  googleButton: {
    marginTop: 4,
  },
  googleIcon: {
    position: 'absolute',
    left: 34,
    bottom: 25,
  },
});
