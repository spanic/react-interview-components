/* eslint-disable no-param-reassign, fp/no-mutation */
import {createSlice} from '@reduxjs/toolkit';

const totalInitData = {
  totalPrice: 12.99,
};

const totalSlice = createSlice({
  name: 'total',
  initialState: totalInitData,
  reducers: {
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const {setTotalPrice} = totalSlice.actions;

export default totalSlice.reducer;
