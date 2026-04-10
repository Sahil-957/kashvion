import { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { BrandLogo } from '@/components/BrandLogo';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { StatusBadge } from '@/components/StatusBadge';
import { ScreenShell } from '@/components/ScreenShell';
import { useBills } from '@/context/BillsContext';
import { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { colors, typography } from '@/theme';
import {
  formatCurrency,
  formatDate,
  getNeedsAttentionBills,
  groupBillsByCategory,
} from '@/utils/billHelpers';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function DashboardScreen({ navigation }: Props) {
  const { bills, loading, error } = useBills();
  const needsAttention = useMemo(() => getNeedsAttentionBills(bills), [bills]);
  const grouped = useMemo(() => groupBillsByCategory(bills), [bills]);

  if (loading) {
    return (
      <ScreenShell>
        <View style={styles.centeredState}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good evening</Text>
          <Text style={styles.title}>Your system is organized.</Text>
        </View>
        <Pressable style={styles.avatar}>
          <BrandLogo variant="mark" height={28} width={28} />
        </Pressable>
      </View>

      <Card style={styles.systemCard}>
        <Text style={styles.systemLabel}>System Status</Text>
        <Text style={styles.systemTitle}>
          {needsAttention.length > 0
            ? `${needsAttention.length} items need attention`
            : 'Everything looks stable'}
        </Text>
        <Text style={styles.systemText}>
          {error ?? 'Track upcoming bills, subscriptions, and finance items in one calm dashboard.'}
        </Text>
      </Card>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Needs Attention</Text>
          <Pressable onPress={() => navigation.navigate('Activity')}>
            <Text style={styles.link}>View all</Text>
          </Pressable>
        </View>
        {needsAttention.length === 0 ? (
          <Card>
            <Text style={styles.emptyTitle}>No urgent bills right now.</Text>
            <Text style={styles.emptyText}>Add your next bill to keep the system proactive.</Text>
          </Card>
        ) : (
          needsAttention.slice(0, 3).map((bill) => (
            <Card key={bill._id} style={styles.attentionCard}>
              <View style={styles.rowBetween}>
                <View style={styles.flexOne}>
                  <Text style={styles.billTitle}>{bill.title}</Text>
                  <Text style={styles.billMeta}>{formatDate(bill.dueDate)}</Text>
                </View>
                <StatusBadge status={bill.status} />
              </View>
              <View style={styles.rowBetween}>
                <Text style={styles.amount}>{formatCurrency(bill.amount)}</Text>
                <Button
                  label={bill.status === 'overdue' ? 'Review' : 'Pay Now'}
                  onPress={() => navigation.navigate('ItemDetails', { billId: bill._id })}
                  variant={bill.status === 'overdue' ? 'outline' : 'primary'}
                  style={styles.inlineButton}
                />
              </View>
            </Card>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Classified Categories</Text>
        {Object.entries(grouped).map(([category, items]) => (
          <Card key={category} style={styles.categoryCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.categoryCount}>
                <Ionicons color={colors.primary} name="folder-open-outline" size={14} />
                <Text style={styles.categoryCountLabel}>{items.length}</Text>
              </View>
            </View>
            {items.length === 0 ? (
              <Text style={styles.emptyText}>No items classified here yet.</Text>
            ) : (
              items.slice(0, 3).map((bill) => (
                <Pressable
                  key={bill._id}
                  onPress={() => navigation.navigate('ItemDetails', { billId: bill._id })}
                  style={styles.billRow}>
                  <View style={styles.flexOne}>
                    <Text style={styles.billRowTitle}>{bill.title}</Text>
                    <Text style={styles.billMeta}>{formatCurrency(bill.amount)}</Text>
                  </View>
                  <StatusBadge status={bill.status} />
                </Pressable>
              ))
            )}
          </Card>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  centeredState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 520,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...typography.meta,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  title: {
    ...typography.headingL,
    color: colors.textPrimary,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  systemCard: {
    backgroundColor: colors.surface,
    gap: 8,
  },
  systemLabel: {
    ...typography.label,
    color: colors.primary,
  },
  systemTitle: {
    ...typography.headingM,
    color: colors.textPrimary,
  },
  systemText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.headingM,
    color: colors.textPrimary,
  },
  link: {
    ...typography.label,
    color: colors.primary,
  },
  attentionCard: {
    gap: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  flexOne: {
    flex: 1,
  },
  billTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  billMeta: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 4,
  },
  amount: {
    ...typography.headingM,
    color: colors.textPrimary,
  },
  inlineButton: {
    minHeight: 44,
    minWidth: 112,
  },
  emptyTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 6,
  },
  categoryCard: {
    gap: 12,
  },
  categoryTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  categoryCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryCountLabel: {
    ...typography.meta,
    color: colors.primary,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingTop: 8,
  },
  billRowTitle: {
    ...typography.body,
    color: colors.textPrimary,
  },
});
