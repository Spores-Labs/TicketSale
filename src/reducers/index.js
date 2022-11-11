import { configureStore } from '@reduxjs/toolkit';
import alert from './alertSlice';
import profile from './profileSlice';

export const store = configureStore({
  reducer: {
    alert,
    profile,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});
