import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  checkedColumns: string[];
}

const initialState: ColumnState = {
  checkedColumns: [
    "select",
    "date",
    'invoice_id',
    'vat',
    "remaining",
    "price",
    "paid",
    "customer",
    "seller",
    "total"
  ], // Các cột mặc định được chọn
};

const columnInvoiceSlice = createSlice({
  name: 'columnInvoice',
  initialState,
  reducers: {
    toggleColumn: (state, action: PayloadAction<string>) => {
      const column = action.payload;
      console.log('Toggling column:', column);  // Kiểm tra giá trị column
      if (state.checkedColumns.includes(column)) {
        state.checkedColumns = state.checkedColumns.filter(c => c !== column);
      } else {
        state.checkedColumns.push(column);
      }
    },
  },
});

export const { toggleColumn } = columnInvoiceSlice.actions;
export default columnInvoiceSlice.reducer;
