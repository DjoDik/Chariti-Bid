import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemType } from '../../types/itemType';

export type ItemState = ItemType[];

const initialState: ItemState = [];

export const itemSlice = createSlice({
  name: 'Item',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<ItemType[]>) => action.payload,
  },
});

export const getPostsThunk = (): AppThunk => (dispatch) => {
  axios<ItemType[]>('/api/posts')
    .then(({ data }) => dispatch(setPosts(data)))
    .catch(console.log);
};