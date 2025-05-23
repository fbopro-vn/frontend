// store/slices/purchaseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Material = {
  material_id: string;
  material_name: string;
  amount: number;
  costPrice: number;
  total_price: number;
};

type PurchaseState = {
  selectedMaterials: Material[];
  vat: number;
  paid_amount: number;
  paymentMethod: string; 
};

const initialState: PurchaseState = {
  selectedMaterials: [],
  vat: 0,
  paid_amount: 0,
  paymentMethod: 'Chuyển khoản công ty',
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    addMaterial: (state, action: PayloadAction<Omit<Material, 'amount' | 'costPrice' | 'total_price'>>) => {
      const exists = state.selectedMaterials.find(p => p.material_id === action.payload.material_id);
      if (!exists) {
        state.selectedMaterials.push({
          ...action.payload,
          amount: 1,
          costPrice: 0,
          total_price: 0,
        });
      }
    },
    updateAmount: (state, action: PayloadAction<{ material_id: string; amount: number }>) => {
      const material = state.selectedMaterials.find(p => p.material_id === action.payload.material_id);
      if (material) {
        material.amount = action.payload.amount;
        material.total_price = material.amount * material.costPrice;
      }
    },
    updateCostPrice: (state, action: PayloadAction<{ material_id: string; costPrice: number }>) => {
      const material = state.selectedMaterials.find(p => p.material_id === action.payload.material_id);
      if (material) {
        material.costPrice = action.payload.costPrice;
        material.total_price = material.amount * material.costPrice;
      }
    },
    updateVat: (state, action: PayloadAction<number>) => {
      state.vat = action.payload;
    },
    updatePaidAmount: (state, action: PayloadAction<number>) => {
      state.paid_amount = action.payload; 
    },
    updatePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    removeMaterial: (state, action: PayloadAction<string>) => {
      state.selectedMaterials = state.selectedMaterials.filter(p => p.material_id !== action.payload);
    },
    resetPurchase: () => initialState,
  },
});

export const {
  addMaterial,
  updateAmount,
  updateCostPrice,
  updateVat,
  updatePaidAmount,
  updatePaymentMethod,
  removeMaterial,
  resetPurchase,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
