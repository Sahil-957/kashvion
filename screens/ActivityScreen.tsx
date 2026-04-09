import { useDeferredValue, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '@/components/Card';
import { CategoryChip } from '@/components/CategoryChip';
import { StatusBadge } from '@/components/StatusBadge';
import { ScreenShell } from '@/components/ScreenShell';
import { useBills } from '@/context/BillsContext';
import { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { colors, typography } from '@/theme';
import { BillCategory } from '@/types/bill';
import { formatCurrency, formatDate } from '@/utils/billHelpers';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Activity'>,
  NativeStackScreenProps<RootStackParamList>
>;

const filters: Array<'All' | BillCategory> = ['All', 'Utilities', 'Subscriptions', 'Finance'];

export function ActivityScreen({ navigation }: Props) {
  const { bills } = useBills();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const deferredSearch = useDeferredValue(search);

  const filteredBills = useMemo(
    () =>
      bills.filter((bill) => {
        const matchesFilter = filter === 'All' ? true : bill.category === filter;
        const query = deferredSearch.trim().toLowerCase();
        const matchesSearch = query ? bill.title.toLowerCase().includes(query) : true;
        return matchesFilter && matchesSearch;
      }),
    [bills, filter, deferredSearch]
  );

  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
        <Text style={styles.subtitle}>Search and filter everything inside your current system.</Text>
      </View>
      <TextInput
        onChangeText={setSearch}
        placeholder="Search bills and subscriptions"
        placeholderTextColor={colors.textSecondary}
        style={styles.search}
        value={search}
      />
      <View style={styles.filters}>
        {filters.map((item) => (
          <CategoryChip
            key={item}
            label={item}
            onPress={() => setFilter(item)}
            selected={filter === item}
          />
        ))}
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filteredBills}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('ItemDetails', { billId: item._id })}>
            <Card style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View style={styles.flexOne}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemMeta}>
                    {item.category} · {formatDate(item.dueDate)}
                  </Text>
                </View>
                <StatusBadge status={item.status} />
              </View>
              <Text style={styles.itemAmount}>{formatCurrency(item.amount)}</Text>
            </Card>
          </Pressable>
        )}
        scrollEnabled={false}
        ListEmptyComponent={
          <Card>
            <Text style={styles.itemTitle}>No items match this view.</Text>
            <Text style={styles.itemMeta}>Try another category or search term.</Text>
          </Card>
        }
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
  search: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    ...typography.body,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
  },
  itemCard: {
    gap: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  flexOne: {
    flex: 1,
  },
  itemTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  itemMeta: {
    ...typography.meta,
    color: colors.textSecondary,
    marginTop: 4,
  },
  itemAmount: {
    ...typography.headingM,
    color: colors.textPrimary,
  },
});
