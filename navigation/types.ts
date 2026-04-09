import { BillDraft } from '@/types/bill';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  MainTabs: undefined;
  ConfirmBill: { draft: BillDraft; billId?: string };
  ItemDetails: { billId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Add: { draft?: BillDraft } | undefined;
  Activity: undefined;
  Settings: undefined;
};
