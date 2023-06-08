import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type PostsState = PostType[];

const initialState: PostsState = [];

export const itemSlice = createSlice({
  name: 'Item',
  initialState,
  reducers: {
      
  },
});