import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemStateSlice, ItemType, itemFormType } from '../../types/itemType';
import { AppThunk, useAppSelector } from '../hooks';

const initialState: ItemStateSlice = {
  top: [],
  sortedTop: [],
};

export const topSlice = createSlice({
  name: 'top',
  initialState,
  reducers: {
    topPosts: (state, action: PayloadAction<ItemType[]>) => {
      state.top = action.payload;
      state.sortedTop = action.payload;
    },
    updateItemPrice: (state, action: PayloadAction<ItemType>) => {
      state.top = state.top.map((el) => (el.id !== action.payload.id ? el : action.payload));
      state.sortedTop = state.sortedTop.map((el) => (el.id !== action.payload.id ? el : action.payload));
    },
    sortTopItems: (state) => {
      state.sortedTop = [...state.sortedTop].sort((a, b) => b.price - a.price);
    },
    updateSellStatus: (state, action: PayloadAction<{ id: number; sellStatus: boolean }>) => {
      state.top = state.top.map((el) =>
        el.id !== action.payload.id ? el : { ...el, sellStatus: action.payload.sellStatus }
      );
      state.sortedTop = state.sortedTop.map((el) =>
        el.id !== action.payload.id ? el : { ...el, sellStatus: action.payload.sellStatus }
      );
    },
  },
});

export const { topPosts, updateItemPrice, sortTopItems,updateSellStatus } = topSlice.actions;

export default topSlice.reducer;

export const getTopItemThunk = (): AppThunk => (dispatch) => {
  axios<ItemType[]>('/top')
    .then(({ data }) => dispatch(topPosts(data)))
    .catch(console.log);
};
