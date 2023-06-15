import { createSlice, createAsyncThunk, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../hooks';
import { ItemType } from '../../types/itemType';

interface SortState {
  allProduct: ItemType[];
  selectedCategory: string;
}

const initialState: SortState = {
  allProduct: [],
  selectedCategory: '',
};

export const getSortedItems = createAsyncThunk(
  'sort/getSortedItems',
  async (id: string) => {
    const response = await axios.get<ItemType[]>(`/sort/${id}`);
    return response.data;
  }
);

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateItemPrice:( state, action:PayloadAction<ItemType>) => {
      state.allProduct = state.allProduct.map((el) => el.id !== action.payload.id ? el : action.payload )
    },
    addSortProduct: (state, action:PayloadAction<ItemType>) => {
      state.allProduct = [action.payload, ...state.allProduct]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSortedItems.fulfilled, (state, action) => {
      state.allProduct = action.payload;
    });
  },
 
});

export const { setSelectedCategory,updateItemPrice, addSortProduct } = sortSlice.actions;

export default sortSlice.reducer;

export const SortItemThunk = (id: string): AppThunk => (
  dispatch: Dispatch<any>,
): void => {
  dispatch(getSortedItems(id))
    .then(() => {
      dispatch(setSelectedCategory(''));
    })
    .catch(console.log);
};
