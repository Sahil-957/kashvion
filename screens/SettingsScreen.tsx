import { Switch, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { ScreenShell } from '@/components/ScreenShell';
import { colors, typography } from '@/theme';

interface SettingsScreenProps {
  onSignOut: () => void;
}

export function SettingsScreen({ onSignOut }: SettingsScreenProps) {
  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Tune your profile, reminders, and calm automation.</Text>
      </View>

      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>K</Text>
        </View>
        <View>
          <Text style={styles.name}>Kashvion User</Text>
          <Text style={styles.email}>hello@kashvion.com</Text>
        </View>
      </Card>

      <Card style={styles.settingCard}>
        <View style={styles.settingRow}>
          <View style={styles.settingCopy}>
            <Text style={styles.settingTitle}>Reminder notifications</Text>
            <Text style={styles.settingText}>Keep due items surfaced before they become urgent.</Text>
          </View>
          <Switch thumbColor={colors.surface} trackColor={{ true: colors.primary }} value />
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingCopy}>
            <Text style={styles.settingTitle}>Weekly summary</Text>
            <Text style={styles.settingText}>Receive a concise snapshot of upcoming obligations.</Text>
          </View>
          <Switch thumbColor={colors.surface} trackColor={{ true: colors.primary }} value />
        </View>
      </Card>

      <Card style={styles.settingCard}>
        <Text style={styles.settingTitle}>Preferences</Text>
        <Text style={styles.settingText}>
          Premium light mode, structured categories, and minimal surfaces are active.
        </Text>
      </Card>

      <Button label="Sign Out" onPress={onSignOut} variant="outline" />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  title: {
    ...typography.headingL,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    ...typography.headingM,
    color: colors.surface,
  },
  name: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  email: {
    ...typography.body,
    color: colors.textSecondary,
  },
  settingCard: {
    gap: 18,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  settingCopy: {
    flex: 1,
    gap: 6,
  },
  settingTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  settingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
