
// features/order/orderCustomerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
  [key: string]: any;
}

interface CustomerState {
  customer: CustomerInfo | null;
}

const initialState: CustomerState = {
  customer: null,
};

const orderCustomerSlice = createSlice({
  name: 'orderCustomer',
  initialState,
  reducers: {
    setCustomerInfo(state, action: PayloadAction<CustomerInfo>) {
      state.customer = action.payload;
    },
    clearCustomerInfo(state) {
      state.customer = null;
    },
  },
});

export const { setCustomerInfo, clearCustomerInfo } = orderCustomerSlice.actions;
export default orderCustomerSlice.reducer;