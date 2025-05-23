import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  checkedColumns: string[];
}

const initialState: ColumnState = {
  checkedColumns: [
    "select",
    "material_id",
    "material_name",
    "material_group",
    "unit",
    "created_at",
  ], // Các cột mặc định được chọn
};

const columnMerchandiseInputSlice = createSlice({
  name: 'columnMerchandiseInput',
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

export const { toggleColumn } = columnMerchandiseInputSlice.actions;
export default columnMerchandiseInputSlice.reducer;
