import { createSlice } from '@reduxjs/toolkit';
import { storageService } from 'services/storage';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    signIn: (state, { payload }) => {
      state = { ...state, ...payload, isLoggedIn: true };
      localStorage.setItem('profile', JSON.stringify(state));
      return state;
    },
    signInWithSuffix: (state, { payload }) => {
      state = { ...state, ...payload.data, isLoggedIn: true };
      localStorage.setItem(`profile${payload.suffix}`, JSON.stringify(state));
      return state;
    },
    signOut: (state) => {
      state = { isLoggedIn: false };
      localStorage.removeItem('profile');
      // remove other profiles
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('profile_')) localStorage.removeItem(key);
      });
      storageService.clearOrder();
      return state;
    },
  },
});

export const { signIn, signInWithSuffix, signOut } = profileSlice.actions;

export default profileSlice.reducer;
