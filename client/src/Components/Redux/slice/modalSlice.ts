import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    itemId: 0,
    itemIdPhoto: 0,
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
    setItemPhoto: (state, action: PayloadAction<number>) => {
      state.itemIdPhoto = action.payload;
    },
  },
});

export const { openModal, closeModal, setItem, setItemPhoto } = modalSlice.actions;

export default modalSlice.reducer;
