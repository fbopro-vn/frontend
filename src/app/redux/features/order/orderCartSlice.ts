import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  group: string;
  unit: string;
  amount: number;
  salePrice: number;
  costPrice: number;
  stockQuantity: number;
}

interface CartState {
  products: Product[]; // ✅ chỉ giữ products đơn giản
}

const initialState: CartState = {
  products: [],
};

const orderCartSlice = createSlice({
  name: 'orderCart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = orderCartSlice.actions;
export default orderCartSlice.reducer;
