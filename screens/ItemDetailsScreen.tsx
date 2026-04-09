import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { ScreenShell } from '@/components/ScreenShell';
import { useBills } from '@/context/BillsContext';
import { RootStackParamList } from '@/navigation/types';
import { colors, typography } from '@/theme';
import { formatCurrency, formatDate } from '@/utils/billHelpers';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetails'>;

export function ItemDetailsScreen({ navigation, route }: Props) {
  const { getBillById, deleteBill, markBillAsPaid } = useBills();
  const bill = getBillById(route.params.billId);

  if (!bill) {
    return (
      <ScreenShell>
        <Card>
          <Text style={styles.title}>Bill not found</Text>
          <Text style={styles.meta}>Refresh the dashboard and try again.</Text>
        </Card>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.title}>{bill.title}</Text>
        <StatusBadge status={bill.status} />
      </View>

      <Card style={styles.detailCard}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>{formatCurrency(bill.amount)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Due date</Text>
          <Text style={styles.value}>{formatDate(bill.dueDate)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{bill.category}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.value}>{formatDate(bill.createdAt)}</Text>
        </View>
      </Card>

      <View style={styles.actionGroup}>
        <Button
          label="Mark as paid"
          onPress={async () => {
            const updated = await markBillAsPaid(bill);
            if (updated) {
              navigation.goBack();
            }
          }}
        />
        <Button
          label="Edit"
          onPress={() =>
            navigation.navigate('ConfirmBill', {
              billId: bill._id,
              draft: {
                id: bill._id,
                title: bill.title,
                amount: String(bill.amount),
                dueDate: bill.dueDate,
                category: bill.category,
              },
            })
          }
          variant="outline"
        />
        <Button
          label="Delete"
          onPress={() =>
            Alert.alert('Delete item', 'Remove this item from Kashvion?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                  await deleteBill(bill._id);
                  navigation.goBack();
                },
              },
            ])
          }
          variant="secondary"
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 12,
  },
  title: {
    ...typography.headingL,
    color: colors.textPrimary,
  },
  meta: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailCard: {
    gap: 18,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
  value: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  actionGroup: {
    gap: 12,
  },
});
