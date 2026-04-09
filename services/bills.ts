import { api } from '@/services/api';
import { Bill, BillDraft } from '@/types/bill';
import { getDerivedStatus } from '@/utils/billHelpers';

const mapDraftToPayload = (draft: BillDraft, statusOverride?: string) => ({
  title: draft.title.trim(),
  amount: Number(draft.amount),
  dueDate: new Date(draft.dueDate).toISOString(),
  category: draft.category,
  status: statusOverride ?? getDerivedStatus(draft.dueDate),
});

export const billsService = {
  async getBills(status?: string) {
    const response = await api.get<Bill[]>('/bills', { params: status ? { status } : undefined });
    return response.data;
  },
  async createBill(draft: BillDraft) {
    const response = await api.post<Bill>('/bills', mapDraftToPayload(draft));
    return response.data;
  },
  async updateBill(id: string, draft: BillDraft, statusOverride?: string) {
    const response = await api.put<Bill>(`/bills/${id}`, mapDraftToPayload(draft, statusOverride));
    return response.data;
  },
  async deleteBill(id: string) {
    await api.delete(`/bills/${id}`);
  },
};
