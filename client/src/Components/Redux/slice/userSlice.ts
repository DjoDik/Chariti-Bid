import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserSignUpType, UserType } from '../../types/UserTypes';
import type { AppThunk } from '../hooks';

export interface UserState {
  user: UserType;
  status: boolean;
}

const initialState: UserState = {
  user: {
    email: '',
    password: '',
    phone: '',
    onlinestatus: false,
  },
  status: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.status = action.payload.status;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const checkUserThunk = (): AppThunk => (dispatch) => {
  axios<UserType>('/user/check')
    .then(({ data }) => dispatch(setUser({ user: data, status: true })))
    .catch(() => dispatch(setUser({ status: true, user: initialState.user })));
};

export const signUpThunk =
  (input: UserSignUpType): AppThunk =>
  (dispatch) => {
    console.log('signupthunk');

    axios
      .post<UserType>('/user/signup', input)
      .then(({ data }) => dispatch(setUser({ user: data, status: true })))
      .catch(() => dispatch(setUser({ status: true, user: initialState.user })));
  };

export const loginThunk =
  (input: UserSignUpType): AppThunk =>
  (dispatch) => {
    console.log('loginthunk');
    axios
      .post<UserType>('/user/login', input)
      .then(({ data }) => dispatch(setUser({ user: data, status: true })))
      .catch(() => dispatch(setUser({ status: true, user: initialState.user })));
  };

export const logoutThunk = (): AppThunk => (dispatch) => {
  axios('/api/user/logout')
    .then(() => dispatch(setUser({ status: true, user: initialState.user })))
    .catch(() => dispatch(setUser({ status: true, user: initialState.user })));
};
