import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../Store';
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
  },
  extraReducers: (builder) => {
    builder.addCase(getSortedItems.fulfilled, (state, action) => {
      state.allProduct = action.payload;
    });
  },
});

export const { setSelectedCategory } = sortSlice.actions;

export const selectItems = (state: RootState) => state.sort.allProduct;
export const selectSelectedCategory = (state: RootState) => state.sort.selectedCategory;

export default sortSlice.reducer;

export const SortItemThunk = (id: string): AppThunk => (
  dispatch: Dispatch<any>,
  getState: () => RootState
): void => {
  dispatch(getSortedItems(id))
    .then(() => {
      dispatch(setSelectedCategory(''));
    })
    .catch(console.log);
};
