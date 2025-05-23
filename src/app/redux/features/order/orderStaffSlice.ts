    // features/order/orderStaffSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StaffInfo {
  id: string;
  name: string;
  role: string;
  [key: string]: any;
}

interface StaffState {
  staff: StaffInfo | null;
}

const initialState: StaffState = {
  staff: null,
};

const orderStaffSlice = createSlice({
  name: 'orderStaff',
  initialState,
  reducers: {
    setStaffInfo(state, action: PayloadAction<StaffInfo>) {
      state.staff = action.payload;
    },
    clearStaffInfo(state) {
      state.staff = null;
    },
  },
});

export const { setStaffInfo, clearStaffInfo } = orderStaffSlice.actions;
export default orderStaffSlice.reducer;
