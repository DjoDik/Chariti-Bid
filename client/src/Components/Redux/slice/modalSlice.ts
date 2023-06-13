import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    itemId: 0,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    setItem: (state, action: PayloadAction<number>) => {
      state.itemId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal, setItem } = modalSlice.actions;

export default modalSlice.reducer;
