// features/order/orderTabSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TabState {
  activeTab: string;
  activeOrderId: string | null;
}

const initialState: TabState = {
  activeTab: 'dat_hang',
  activeOrderId: null,
};

const orderTabSlice = createSlice({
  name: 'orderTab',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    setActiveOrderId(state, action: PayloadAction<string | null>) {
      state.activeOrderId = action.payload;
    },
  },
});

export const { setActiveTab, setActiveOrderId } = orderTabSlice.actions;
export default orderTabSlice.reducer;
