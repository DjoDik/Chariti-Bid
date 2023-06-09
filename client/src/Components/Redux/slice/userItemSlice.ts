import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {  ItemType, PostIdType, UserItemStateSlice } from '../../types/itemType';
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
    },
    deleteUserItem: (state, action: PayloadAction<ItemType['id']>) => {
        state.userItems = state.userItems.filter((el) => el.id !== action.payload);
      },
  },
});

export const { userItemPosts, deleteUserItem } = UserItemSlice.actions;


export const getUserItemThunk = (id: string): AppThunk => (dispatch) => {
    axios
    .get<ItemType[]>(`/useritem/${id}`)
    .then(({ data }) => dispatch(userItemPosts(data)))
    .catch(console.log);
};
export const deleteThunk =
(id:string): AppThunk =>
(dispatch) => {
    axios
    .delete(`/useritem/${id}`)
    .then(() => dispatch( deleteUserItem(id)))
    .catch(console.log);
};
export default UserItemSlice.reducer;