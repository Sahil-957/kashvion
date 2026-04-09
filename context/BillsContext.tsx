import {
  createContext,
  PropsWithChildren,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { billsService } from '@/services/bills';
import { Bill, BillDraft } from '@/types/bill';

interface BillsContextValue {
  bills: Bill[];
  loading: boolean;
  error: string | null;
  refreshBills: () => Promise<void>;
  createBill: (draft: BillDraft) => Promise<Bill | null>;
  updateBill: (id: string, draft: BillDraft) => Promise<Bill | null>;
  deleteBill: (id: string) => Promise<void>;
  markBillAsPaid: (bill: Bill) => Promise<Bill | null>;
  getBillById: (id: string) => Bill | undefined;
}

const BillsContext = createContext<BillsContextValue | undefined>(undefined);

export function BillsProvider({ children }: PropsWithChildren) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshBills = useCallback(async () => {
    try {
      setLoading(true);
      const data = await billsService.getBills();
      startTransition(() => {
        setBills(data);
        setError(null);
      });
    } catch {
      setError('Unable to reach the Kashvion system right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshBills();
  }, [refreshBills]);

  const createBill = useCallback(async (draft: BillDraft) => {
    try {
      const created = await billsService.createBill(draft);
      setBills((current) => [created, ...current]);
      setError(null);
      return created;
    } catch {
      setError('We could not save that bill.');
      return null;
    }
  }, []);

  const updateBill = useCallback(async (id: string, draft: BillDraft) => {
    try {
      const updated = await billsService.updateBill(id, draft);
      setBills((current) => current.map((bill) => (bill._id === id ? updated : bill)));
      setError(null);
      return updated;
    } catch {
      setError('We could not update that bill.');
      return null;
    }
  }, []);

  const deleteBill = useCallback(async (id: string) => {
    try {
      await billsService.deleteBill(id);
      setBills((current) => current.filter((bill) => bill._id !== id));
      setError(null);
    } catch {
      setError('We could not delete that bill.');
    }
  }, []);

  const markBillAsPaid = useCallback(async (bill: Bill) => {
    try {
      const updated = await billsService.updateBill(
        bill._id,
        {
          id: bill._id,
          title: bill.title,
          amount: String(bill.amount),
          dueDate: bill.dueDate,
          category: bill.category,
        },
        'paid'
      );
      setBills((current) => current.map((item) => (item._id === bill._id ? updated : item)));
      setError(null);
      return updated;
    } catch {
      setError('We could not mark that bill as paid.');
      return null;
    }
  }, []);

  const value = useMemo(
    () => ({
      bills,
      loading,
      error,
      refreshBills,
      createBill,
      updateBill,
      deleteBill,
      markBillAsPaid,
      getBillById: (id: string) => bills.find((bill) => bill._id === id),
    }),
    [bills, loading, error, refreshBills, createBill, updateBill, deleteBill, markBillAsPaid]
  );

  return <BillsContext.Provider value={value}>{children}</BillsContext.Provider>;
}

export const useBills = () => {
  const context = useContext(BillsContext);
  if (!context) {
    throw new Error('useBills must be used within BillsProvider');
  }

  return context;
};
