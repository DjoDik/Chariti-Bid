import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemStateSlice, ItemType, itemFormType } from '../../types/itemType';
import { AppThunk, useAppSelector } from '../hooks';


const initialState ={
   top: []
}


export const topSlice = createSlice({
  name: 'top',
  initialState,
  reducers: {
    topPosts: (state, action: PayloadAction<ItemType[]>) => {
      state.top = action.payload;
    },
   
}
});

export const { topPosts } = topSlice.actions;

export default topSlice.reducer;

export const getTopItemThunk = (): AppThunk => (dispatch) => {
  axios<ItemType[]>('/top')
    .then(({ data }) => dispatch(topPosts(data)))
    .catch(console.log);
};



