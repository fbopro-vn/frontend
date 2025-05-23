
// features/order/orderModalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  activeModal: string | null;
}

const initialState: ModalState = {
  activeModal: null,
};

const orderModalSlice = createSlice({
  name: 'orderModal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = orderModalSlice.actions;
export default orderModalSlice.reducer;
