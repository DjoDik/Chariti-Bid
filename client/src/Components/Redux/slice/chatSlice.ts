import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ChatStateSlice, ChatType, ItemStateSlice, ItemType, itemFormType } from '../../types/itemType';
import { AppThunk, useAppSelector } from '../hooks';


const initialState: ChatStateSlice = {
    chat: [],
    
  }; 


export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatPosts: (state, action: PayloadAction<ChatType[]>) => {
      state.chat = action.payload;
    },
    updateMessage:( state, action:PayloadAction<ChatType>) => {
        state.chat = state.chat.map((el) => el.id !== action.payload.id ? el : action.payload )
      }
   
}
});

export const { chatPosts } = chatSlice.actions;

export default chatSlice.reducer;

export const getChatMessageThunk = (id:string): AppThunk => (dispatch) => {
  axios
  .get<ChatType[]>(`/basket/${id}`)
    .then(({ data }) => dispatch(chatPosts(data)))
    .catch(console.log);
};



