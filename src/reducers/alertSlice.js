import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    message: '',
    variant: null,
    key: null,
    onUpdate: 0,
  },
  reducers: {
    openAlert: (state, { payload: { message, variant, key } }) => {
      return { message, variant, key, onUpdate: Math.random() };
    },
  },
});

export const { openAlert } = alertSlice.actions;

export default alertSlice.reducer;
