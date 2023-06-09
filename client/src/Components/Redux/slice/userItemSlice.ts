import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {  ItemType, UserItemStateSlice } from '../../types/itemType';
import { AppThunk } from '../hooks';



const initialState: UserItemStateSlice = {
  
  userItems:[]
};

export const UserItemSlice = createSlice({
  name: 'userItem',
  initialState,
  reducers: {
    userItemPosts: (state, action: PayloadAction<ItemType[]>) => {
      state.userItems = action.payload
    }
  },
});

export const { userItemPosts } = UserItemSlice.actions;

export default UserItemSlice.reducer;

export const getUserItemThunk = (id: string): AppThunk => (dispatch) => {
    axios
      .get<ItemType[]>(`/useritem/${id}`)
      .then(({ data }) => dispatch(userItemPosts(data)))
      .catch(console.log);
  };