import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../hooks';
import axios from 'axios';
import { UserType, UserSignUpType } from '../../types/UserTypes';

export type AvatarState = UserType['avatar'];

const initialState: AvatarState = '';

export const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setAvatar } = avatarSlice.actions;

export const addAvatarThunk =
  (avatar: File): AppThunk =>
  async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);

      const response = await axios.post<UserSignUpType>('/api/avatar', formData);

      const {
        user: { avatar: newAvatar },
      } = response.data;
      dispatch(setAvatar(`http://localhost:3001/${newAvatar}`)); // Обновляем аватар пользователя в Redux-стейте
      handleAvatarChange(`http://localhost:3001/${newAvatar}`); // Вызываем функцию для обновления аватара в компоненте UserProfilePage
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    }
  };

export const getAvatarThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await axios.get<UserType>('/api/avatar');
    const { avatar: currentAvatar } = response.data;

    dispatch(setAvatar(`http://localhost:3001/${currentAvatar}`)); // Обновляем аватар пользователя в Redux-стейте
  } catch (error) {
    console.error('Failed to fetch avatar:', error);
  }
};

export const handleAvatarChange =
  (newAvatar: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAvatar(newAvatar));
  };

export default avatarSlice.reducer;
