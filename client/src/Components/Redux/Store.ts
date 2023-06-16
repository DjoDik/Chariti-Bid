import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import itemReducer from './slice/itemSlice';
import userReducer from '../Redux/slice/userSlice';
import sortReducer from '../Redux/slice/sortSlice';
import UserItemReducer from '../Redux/slice/userItemSlice';
import modalReducer from './slice/modalSlice';
import rootSaga from './sagas/rootSaga';
import avatarReducer from './slice/avatarSlice';
import topReducer from './slice/topSlice';
import chatReducer from './slice/chatSlice';
import photoReducer from './slice/photoSlice';
import timerReducer from './slice/TimerSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    item: itemReducer,
    user: userReducer,
    sort: sortReducer,
    userItem: UserItemReducer,
    modal: modalReducer,
    avatar: avatarReducer,
    top: topReducer,
    chat: chatReducer,
    photo: photoReducer,
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
