import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../hooks';
import axios from 'axios';
import { UserType, UserSignUpType } from '../../types/UserTypes';

export type AvatarState = UserType;

const initialState: AvatarState = {
  avatar: null,
};

export const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string | null>) => {
      state.avatar = action.payload;
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
      const { avatar: newAvatar } = response.data;

      dispatch(setAvatar(newAvatar)); // Обновляем аватар пользователя в Redux-стейте
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    }
  };

export const getAvatarThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await axios.get<UserType>('/api/avatar');
    const { avatar: currentAvatar } = response.data;

    dispatch(setAvatar(currentAvatar)); // Обновляем аватар пользователя в Redux-стейте
  } catch (error) {
    console.error('Failed to fetch avatar:', error);
  }
};

export default avatarSlice.reducer;
