import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserSignUpType, UserType } from '../../types/UserTypes';
import type { AppThunk } from '../hooks';

export type UserState = UserType & { status: boolean };

const initialState: UserState = { status: false };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    changePassword: (
      state,
      action: PayloadAction<{
        oldPassword: string;
        newPassword: string;
        email: string;
        userName: string;
        newPhone:string;
      }>,
    ) => {
      state.password = action.payload.newPassword;
    },
  },
});

export const { setUser, changePassword } = userSlice.actions;

export default userSlice.reducer;

export const checkUserThunk = (): AppThunk => (dispatch) => {
  axios<UserType>('/user/check')
    .then(({ data }) => dispatch(setUser({ ...data, status: true })))
    .catch(() => dispatch(setUser({ status: true })));
};

export const signUpThunk =
  (input: UserSignUpType): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/user/signup', input)
      .then(({ data }) => dispatch(setUser({ ...data, status: true })))
      .catch(() => dispatch(setUser({ status: true })));
  };

export const loginThunk =
  (input: UserSignUpType): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/user/login', input)
      .then(({ data }) => dispatch(setUser({ ...data, status: true })))
      .catch(() => dispatch(setUser({ status: true })));
  };

export const logoutThunk = (): AppThunk => (dispatch) => {
  axios('/user/logout')
    .then(() => dispatch(setUser({ status: true })))
    .catch(() => dispatch(setUser({ status: true })));
};
export const changePasswordThunk =
  (newPassword: string): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/user/change-password', newPassword)
      .then(({ data }) => dispatch(changePassword(data.password)))
      .catch((error) => {
        console.log(error);
      });
  };
