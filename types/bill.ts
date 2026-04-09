export const BILL_CATEGORIES = ['Utilities', 'Subscriptions', 'Finance', 'Lifestyle'] as const;
export const BILL_STATUSES = ['upcoming', 'overdue', 'paid'] as const;

export type BillCategory = (typeof BILL_CATEGORIES)[number];
export type BillStatus = (typeof BILL_STATUSES)[number];

export interface Bill {
  _id: string;
  title: string;
  amount: number;
  dueDate: string;
  category: BillCategory;
  status: BillStatus;
  createdAt: string;
}

export interface BillDraft {
  id?: string;
  title: string;
  amount: string;
  dueDate: string;
  category: BillCategory;
  imageSource?: 'camera' | 'gallery';
}
