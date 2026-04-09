import { useCallback, useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { CategoryChip } from '@/components/CategoryChip';
import { InputField } from '@/components/InputField';
import { ScreenShell } from '@/components/ScreenShell';
import { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { colors, typography } from '@/theme';
import { BILL_CATEGORIES, BillDraft } from '@/types/bill';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = BottomTabScreenProps<MainTabParamList, 'Add'>['route'];

const initialDraft: BillDraft = {
  title: '',
  amount: '',
  dueDate: new Date().toISOString(),
  category: 'Utilities',
};

export function AddBillScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const [draft, setDraft] = useState<BillDraft>(route.params?.draft ?? initialDraft);
  const [showPicker, setShowPicker] = useState(false);

  const selectedDate = useMemo(() => new Date(draft.dueDate), [draft.dueDate]);

  useFocusEffect(
    useCallback(() => {
      setDraft(route.params?.draft ?? initialDraft);
    }, [route.params?.draft])
  );

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS !== 'ios') {
      setShowPicker(false);
    }

    if (date) {
      setDraft((current) => ({ ...current, dueDate: date.toISOString() }));
    }
  };

  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.kicker}>Add Bill</Text>
        <Text style={styles.title}>Capture the next item entering your system.</Text>
      </View>

      <View style={styles.uploadRow}>
        <Pressable
          onPress={() => setDraft((current) => ({ ...current, imageSource: 'camera' }))}
          style={styles.uploadCard}>
          <Ionicons color={colors.primary} name="camera-outline" size={22} />
          <Text style={styles.uploadLabel}>Camera</Text>
        </Pressable>
        <Pressable
          onPress={() => setDraft((current) => ({ ...current, imageSource: 'gallery' }))}
          style={styles.uploadCard}>
          <Ionicons color={colors.primary} name="images-outline" size={22} />
          <Text style={styles.uploadLabel}>Gallery</Text>
        </Pressable>
      </View>

      <InputField
        label="Title"
        onChangeText={(title) => setDraft((current) => ({ ...current, title }))}
        placeholder="Electricity Bill"
        value={draft.title}
      />
      <InputField
        keyboardType="numeric"
        label="Amount"
        onChangeText={(amount) => setDraft((current) => ({ ...current, amount }))}
        placeholder="120"
        value={draft.amount}
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Due Date</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateValue}>{selectedDate.toDateString()}</Text>
          <Ionicons color={colors.primary} name="calendar-outline" size={18} />
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
        label="Next Step"
        onPress={() => navigation.navigate('ConfirmBill', { draft })}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    paddingTop: 8,
  },
  kicker: {
    ...typography.label,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    ...typography.headingL,
    color: colors.textPrimary,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadCard: {
    flex: 1,
    minHeight: 110,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadLabel: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
