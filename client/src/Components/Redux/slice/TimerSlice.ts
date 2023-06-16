import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { timerStateSlice } from '../../types/itemType';

const initialState: timerStateSlice = {
  id: 0,
};

export const timerSlice = createSlice({
  name: 'Timer',
  initialState,
  reducers: {
    setStoreTimer: (state, action: PayloadAction<timerStateSlice>) => { 
      state.id = action.payload.id;
    },
  },
});

export const { setStoreTimer } = timerSlice.actions;

export default timerSlice.reducer;
