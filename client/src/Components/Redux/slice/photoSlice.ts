import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../hooks';
import axios from 'axios';
import { FotoType } from '../../types/itemType';

export type PhotoState = {
  photos: FotoType[];
};

const initialState: PhotoState = {
  photos: [],
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    addPhotos: (state, action: PayloadAction<FotoType[]>) => {
      state.photos.push(...action.payload);
    },
  },
});

export const { addPhotos } = photoSlice.actions;

export const addPhotoThunk =
  (photos: File[]): AppThunk =>
  async (dispatch) => {
    try {
      const formData = new FormData();
      photos.forEach((photo) => {
        formData.append('photos', photo);
      });

      const response = await axios.post<FotoType[]>('/photos', formData);
      const newPhotos = response.data;

      dispatch(addPhotos(newPhotos)); // Добавляем фотографии в Redux-стейт
    } catch (error) {
      console.error('Failed to upload photos:', error);
    }
  };

export default photoSlice.reducer;
