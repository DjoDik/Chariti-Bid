import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../hooks';
import axios from 'axios';
import { UserType, UserSignUpType } from '../../types/UserTypes';

export type AvatarState = UserType;

const initialState: AvatarState = {};

export const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<UserType>) => {
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setAvatar } = avatarSlice.actions;

export default avatarSlice.reducer;

export const addAvatarThunk =
  (avatar: File): AppThunk =>
  async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);

      const response = await axios.post<UserSignUpType>('/api/avatar', formData);
      const { avatar: newAvatar } = response.data;
      dispatch(setAvatar({ avatar: newAvatar }));
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    }
  };
