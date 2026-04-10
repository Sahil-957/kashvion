import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '@/theme';
import { BillStatus } from '@/types/bill';
import { getStatusLabel } from '@/utils/billHelpers';

interface StatusBadgeProps {
  status: BillStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, statusStyles[status]]}>
      <Text style={[styles.label, textStyles[status]]}>{getStatusLabel(status)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  label: {
    ...typography.meta,
  },
});

const statusStyles = StyleSheet.create({
  upcoming: {
    backgroundColor: '#ECEFFD',
  },
  overdue: {
    backgroundColor: '#FBEDEB',
  },
  paid: {
    backgroundColor: '#EEF5F0',
  },
});

const textStyles = StyleSheet.create({
  upcoming: {
    color: colors.primary,
  },
  overdue: {
    color: colors.danger,
  },
  paid: {
    color: colors.success,
  },
});
