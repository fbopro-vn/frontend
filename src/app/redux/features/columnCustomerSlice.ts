import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  checkedColumns: string[];
}

const initialState: ColumnState = {
  checkedColumns: [
    "id",
    "name",
    "phone",
    "address",
    "createdAt"
  ], // Các cột mặc định được chọn
};

const columnCustomerSlice = createSlice({
  name: 'columnCustomer',
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

export const { toggleColumn } = columnCustomerSlice.actions;
export default columnCustomerSlice.reducer;
