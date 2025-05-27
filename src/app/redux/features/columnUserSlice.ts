import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  checkedColumns: string[];
}

const initialState: ColumnState = {
  checkedColumns: [
    "select",
    "username",
    "fullname",
    "role",
    "pone",
    "email",
    "birthday",
    "isActive",
  ], // Các cột mặc định được chọn
};

const columnUserSlice = createSlice({
  name: 'columnUser',
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

export const { toggleColumn } = columnUserSlice.actions;
export default columnUserSlice.reducer;
