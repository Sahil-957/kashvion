import { Bill, BillCategory, BillStatus } from '@/types/bill';

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const getDerivedStatus = (dueDate: string, currentStatus?: BillStatus): BillStatus => {
  if (currentStatus === 'paid') {
    return 'paid';
  }

  const due = new Date(dueDate);
  const today = new Date();
  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return due < today ? 'overdue' : 'upcoming';
};

export const getNeedsAttentionBills = (bills: Bill[]) => {
  const edge = new Date();
  edge.setDate(edge.getDate() + 3);

  return bills
    .filter((bill) => {
      if (bill.status === 'paid') {
        return false;
      }

      return new Date(bill.dueDate) <= edge;
    })
    .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));
};

export const groupBillsByCategory = (bills: Bill[]) =>
  bills.reduce<Record<BillCategory, Bill[]>>(
    (groups, bill) => {
      groups[bill.category].push(bill);
      return groups;
    },
    {
      Utilities: [],
      Subscriptions: [],
      Finance: [],
      Lifestyle: [],
    }
  );

export const getStatusLabel = (status: BillStatus) => {
  switch (status) {
    case 'overdue':
      return 'Due';
    case 'paid':
      return 'Paid';
    default:
      return 'Active';
  }
};
