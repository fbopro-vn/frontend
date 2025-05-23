import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  checkedColumns: string[];
}

const initialState: ColumnState = {
  checkedColumns: [
    "select", 
    "provider_id",
    "provider",
    "phone",
    "address",
    "debt",
    "total_buy"
  ], // Các cột mặc định được chọn
};

const columnProviderSlice = createSlice({
  name: 'columnProvider',
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

export const { toggleColumn } = columnProviderSlice.actions;
export default columnProviderSlice.reducer;
