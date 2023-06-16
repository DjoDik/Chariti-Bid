import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FotoType, ItemType, UserItemStateSlice } from '../../types/itemType';
import { AppThunk } from '../hooks';

const initialState: UserItemStateSlice = {
  userItems: [],
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
      state.userItems = state.userItems.map((item) =>
        item.id !== action.payload.id
          ? item
          : { ...action.payload, FotoGaleries: item.FotoGaleries },
      );
    },
    addUserItemPosts: (state, action: PayloadAction<ItemType>) => {
      state.userItems = [...state.userItems, action.payload];
    },
    updatePhoto: (state, action: PayloadAction<FotoType[]>) => {
      console.log({ payload: action.payload });
      const index = state.userItems.findIndex((el) => el.id === action.payload[0].item_id);
      if (index !== -1) state.userItems[index].FotoGaleries = action.payload;
    },
  },
});

export const { userItemPosts, deleteUserItem, editUserItem, addUserItemPosts, updatePhoto } =
  UserItemSlice.actions;

export const getUserItemThunk =
  (id: string): AppThunk =>
  (dispatch) => {
    axios
      .get<ItemType[]>(`/useritem/${id}`)
      .then(({ data }) => dispatch(userItemPosts(data)))
      .catch(console.log);
  };

export const deleteThunk =
  (id: string): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/useritem/${id}`)
      .then(() => dispatch(deleteUserItem(id)))
      .catch(console.log);
  };

export const editThunk =
  (editedPost: ItemType): AppThunk =>
  (dispatch) => {
    axios
      .patch(`/useritem/${editedPost.id}`, editedPost)
      .then(() => dispatch(editUserItem(editedPost)))
      .catch(console.log);
  };

export default UserItemSlice.reducer;
