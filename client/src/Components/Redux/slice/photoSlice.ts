import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../hooks';

export const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photo: null,
    error: null,
  },
  reducers: {
    setPhoto: (state, action: PayloadAction<FormData>) => {

    },
  },
});

export const { setPhoto } = photoSlice.actions;

export default photoSlice.reducer;

export const addPhotoThunk =
  (imgArr: File): AppThunk =>
  async (dispatch) => {
    console.log('imgArr', imgArr);
    
    
    try {
      const formData = new FormData();
      console.log('пустая дата', formData);
      formData.append('photo', imgArr);
      console.log('что то добавили', formData);
      const response = await axios.post('/api/photo', formData);

      dispatch(setPhoto(formData));
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    }
  };
