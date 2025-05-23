import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  checkedColumns: string[];
}

const initialState: ColumnState = {
  checkedColumns: [
    "select",
    "purchase_id",
    "date",
    "vat",
    "total",
    "amount_paid",
    "remaining_payment",
    // "paymentMethod",
    // "paymentStatus",
    "provider",
  ], // Các cột mặc định được chọn
};

const columnOrderSlice = createSlice({
  name: 'columnExpense',
  initialState,
  reducers: {
    toggleColumn: (state, action: PayloadAction<string>) => {
      const column = action.payload;
      if (state.checkedColumns.includes(column)) {
        state.checkedColumns = state.checkedColumns.filter(c => c !== column);
      } else {
        state.checkedColumns.push(column);
      }
    },
  },
});

export const { toggleColumn } = columnOrderSlice.actions;
export default columnOrderSlice.reducer;
