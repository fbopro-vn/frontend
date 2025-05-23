import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MonthState {
  selectedMonth: string;
}

const initialState: MonthState = {
  selectedMonth: (new Date().getMonth() + 1).toString().padStart(2, '0'), // tháng mặc định rỗng
};

export const monthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<string>) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setMonth } = monthSlice.actions;
export default monthSlice.reducer;
