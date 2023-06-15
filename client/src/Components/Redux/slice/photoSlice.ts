import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../hooks';
import axios from 'axios';
import { FotoType, ItemType } from '../../types/itemType';
import { addUserItemPosts } from './userItemSlice';

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
    setPhotos: (state, action: PayloadAction<FotoType[]>) => {
      state.photos = action.payload;
    },
    addPhotos: (state, action: PayloadAction<FotoType[]>) => {
      state.photos.push(...action.payload);
    },
    deletePhoto: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.photos.findIndex((photo) => photo.id === action.payload.id);
      if (index !== -1) {
        state.photos.splice(index, 1);
      }
    },
  },
});

export const { addPhotos, setPhotos, deletePhoto } = photoSlice.actions;

export const getSetPhotosThunk =
  (id: string): AppThunk =>
  (dispatch) => {
    axios
      .get<FotoType[]>(`/add/photos/${id}`)
      .then(({ data }) => dispatch(setPhotos(data)))
      .catch(console.log);
  };
export const getDeletePhotoThunk =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await axios.delete(`/add/photos/${id}`);
      dispatch(deletePhoto({ id }));
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  };
export const addPhotoThunk =
  (itemId: string, photos: File[]): AppThunk =>
  async (dispatch) => {
    try {
      if (!photos) {
        throw new Error('No photos provided');
      }

      const formData = new FormData();
      photos.forEach((photo) => {
        formData.append('photos', photo);
      });

      const response = await axios.post<FotoType[]>(`/add/photos/${itemId}`, formData);
      const newPhotos = response.data;

      dispatch(addPhotos(newPhotos)); // Добавляем фотографии в Redux-стейт
    } catch (error) {
      console.error('Failed to upload photos:', error);
    }
  };

export default photoSlice.reducer;
