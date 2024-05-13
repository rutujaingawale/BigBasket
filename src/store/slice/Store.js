// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSclice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
