import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemStateSlice, ItemType, itemFormType } from '../../types/itemType';
import { AppThunk } from '../hooks';
import { addUserItemPosts } from './userItemSlice';
import { setItem } from './modalSlice';
import { addSortProduct } from './sortSlice';

const initialState: ItemStateSlice = {
  allProduct: [],
};

export const itemSlice = createSlice({
  name: 'Item',
  initialState,
  reducers: {
    itemPosts: (state, action: PayloadAction<ItemType[]>) => {
      state.allProduct = action.payload;
    },
    addPost: (state, action: PayloadAction<ItemType>) => {
      state.allProduct.forEach((el) => {
        if (el.category_id === action.payload.category_id) {
          el.Items = [action.payload, ...state.allProduct];
        }
      });
    },
  },
});

export const { itemPosts, addPost} = itemSlice.actions;

export default itemSlice.reducer;

export const getItemThunk = (): AppThunk => (dispatch) => {
  axios<ItemType[]>('/')
    .then(({ data }) => dispatch(itemPosts(data)))
    .catch(console.log);
};

export const addItemThunk =
  (inputs: itemFormType): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.post<ItemType>('/useritem', inputs);
      const newItem = response.data;

      dispatch(addPost(newItem));
      dispatch(addUserItemPosts(newItem));
      // dispatch(addSortProduct(newItem));
      dispatch(setItem(newItem.id)); // Передача ID добавленного товара в санку addPhotos

      // Здесь можете добавить другие операции или санки
    } catch (error) {
      console.log('Failed to add item:', error);
    }
  };



