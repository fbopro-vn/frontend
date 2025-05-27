import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  checkedColumns: string[];
}

const initialState: ColumnState = {
  checkedColumns: [
    "select",
    "id",
    "product",
    "product_group",
    "unit",
    "costPrice",
    "salePrice",
    "stockQuantity",
    "created_at",
  ], // Các cột mặc định được chọn
};

const columnMerchandiseOutputSlice = createSlice({
  name: 'columnMerchandiseOutput',
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

export const { toggleColumn } = columnMerchandiseOutputSlice.actions;
export default columnMerchandiseOutputSlice.reducer;
