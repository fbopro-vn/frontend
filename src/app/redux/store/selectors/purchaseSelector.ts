// store/selectors/purchaseSelectors.ts
import { RootState } from '../store';

export const selectSelectedMaterials = (state: RootState) => state.purchase.selectedMaterials;
export const selectTotalAmount = (state: RootState) => state.purchase.selectedMaterials.reduce((acc, p) => acc + p.total_price, 0);
export const selectVat = (state: RootState) => state.purchase.vat;
export const selectPaymentMethod = (state: RootState) => state.purchase.paymentMethod;
export const selectPaidAmount = (state: RootState) => state.purchase.paid_amount;
export const selectTotalPayable = (state: RootState) => selectTotalAmount(state) + selectVat(state)*selectTotalAmount(state)/100;
export const selectDebt = (state: RootState) => selectPaidAmount(state) - selectTotalPayable(state);
