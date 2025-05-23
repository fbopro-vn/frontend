import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  checkedColumns: string[];
}

const initialState: ColumnState = {
  checkedColumns: [
    "select",
    "date",
    "order_id",
    "remaining",
    "vat",
    "paid",
    "seller",
    "customer",
    "total",
    "action"
  ], // Các cột mặc định được chọn
};

const columnOrderSlice = createSlice({
  name: 'columnOrder',
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
