import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemType, UserItemStateSlice } from '../../types/itemType';
import { AppThunk } from '../hooks';

const initialState: UserItemStateSlice = {
  userItems: []
};

export const UserItemSlice = createSlice({
  name: 'userItem',
  initialState,
  reducers: {
    userItemPosts: (state, action: PayloadAction<ItemType[]>) => {
      state.userItems = action.payload;
    },
    deleteUserItem: (state, action: PayloadAction<ItemType['id']>) => {
      state.userItems = state.userItems.filter((el) => el.id !== action.payload);
    },
    editUserItem: (state, action: PayloadAction<ItemType>) => {
      state.userItems = state.userItems.map((item) => (item.id !== action.payload.id ? item : action.payload));
    },
  },
});

export const { userItemPosts, deleteUserItem, editUserItem } = UserItemSlice.actions;

export const getUserItemThunk = (id: string): AppThunk => (dispatch) => {
  axios
    .get<ItemType[]>(`/useritem/${id}`)
    .then(({ data }) => dispatch(userItemPosts(data)))
    .catch(console.log);
};

export const deleteThunk = (id: number): AppThunk => (dispatch) => {
  axios
    .delete(`/useritem/${id}`)
    .then(() => dispatch(deleteUserItem(id)))
    .catch(console.log);
};

export const editThunk = (editedPost: ItemType): AppThunk => (dispatch) => {
  axios
    .patch(`/useritem/${editedPost.id}`, editedPost)
    .then(() => dispatch(editUserItem(editedPost)))
    .catch(console.log);
};

export default UserItemSlice.reducer;
