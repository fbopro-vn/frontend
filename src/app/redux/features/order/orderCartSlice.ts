import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id_product: string;
  name: string;
  group: string;
  unit: number;
  amount: number;
  salePrice: number;
  costPrice: number;
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
