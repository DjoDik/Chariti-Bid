import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './slice/itemSlice'
import userReducer from '../Redux/slice/userSlice';
import sortReducer from '../Redux/slice/sortSlice'
export const store = configureStore({
  reducer: {
    item: itemReducer,
    user: userReducer,
    sort: sortReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;