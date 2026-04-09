import { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@/components/Button';
import { CategoryChip } from '@/components/CategoryChip';
import { Card } from '@/components/Card';
import { InputField } from '@/components/InputField';
import { ScreenShell } from '@/components/ScreenShell';
import { useBills } from '@/context/BillsContext';
import { RootStackParamList } from '@/navigation/types';
import { colors, typography } from '@/theme';
import { BILL_CATEGORIES, BillDraft } from '@/types/bill';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmBill'>;

export function ConfirmBillScreen({ navigation, route }: Props) {
  const { createBill, updateBill } = useBills();
  const [draft, setDraft] = useState<BillDraft>(route.params.draft);
  const [submitting, setSubmitting] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const selectedDate = useMemo(() => new Date(draft.dueDate), [draft.dueDate]);

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS !== 'ios') {
      setShowPicker(false);
    }

    if (date) {
      setDraft((current) => ({ ...current, dueDate: date.toISOString() }));
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const response = route.params.billId
      ? await updateBill(route.params.billId, draft)
      : await createBill(draft);
    setSubmitting(false);

    if (response) {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.title}>Confirm & Save</Text>
        <Text style={styles.subtitle}>Refine the bill details before adding it to your system.</Text>
      </View>

      <Card style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Preview</Text>
        <Text style={styles.summaryTitle}>{draft.title || 'Untitled item'}</Text>
        <Text style={styles.summaryMeta}>{draft.amount ? `$${draft.amount}` : '$0'} pending</Text>
      </Card>

      <InputField
        label="Title"
        onChangeText={(title) => setDraft((current) => ({ ...current, title }))}
        value={draft.title}
      />
      <InputField
        keyboardType="numeric"
        label="Amount"
        onChangeText={(amount) => setDraft((current) => ({ ...current, amount }))}
        value={draft.amount}
      />
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Date</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateValue}>{selectedDate.toDateString()}</Text>
        </Pressable>
        {showPicker ? (
          <DateTimePicker
            display={Platform.select({ ios: 'spinner', default: 'default' })}
            mode="date"
            onChange={handleDateChange}
            value={selectedDate}
          />
        ) : null}
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.chipWrap}>
          {BILL_CATEGORIES.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              onPress={() => setDraft((current) => ({ ...current, category }))}
              selected={draft.category === category}
            />
          ))}
        </View>
      </View>

      <Button
        disabled={!draft.title.trim() || !draft.amount.trim()}
        label="Confirm & Save"
        loading={submitting}
        onPress={handleSubmit}
      />
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
  summaryCard: {
    backgroundColor: '#FFF9E6',
    gap: 6,
  },
  summaryLabel: {
    ...typography.label,
    color: colors.warning,
  },
  summaryTitle: {
    ...typography.headingM,
    color: colors.textPrimary,
  },
  summaryMeta: {
    ...typography.body,
    color: colors.textSecondary,
  },
  fieldGroup: {
    gap: 10,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
  },
  dateButton: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  dateValue: {
    ...typography.body,
    color: colors.textPrimary,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
