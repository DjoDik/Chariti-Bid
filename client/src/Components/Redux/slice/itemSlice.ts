import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemType } from '../../types/itemType';
import { AppThunk } from '../hooks';

export type ItemState = ItemType[];

const initialState: ItemState = [];

export const itemSlice = createSlice({
  name: 'Item',
  initialState,
  reducers: {
    itemPosts: (state, action: PayloadAction<ItemType[]>) => action.payload,
  },
});

export const { itemPosts } = itemSlice.actions;

export default itemSlice.reducer;

export const getItemThunk = (): AppThunk => (dispatch) => {
  axios<ItemType[]>('/')
    .then(({ data }) => dispatch(itemPosts(data)))
    .catch(console.log);
};