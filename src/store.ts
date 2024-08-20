// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';
import ingredientSlice from './slices/ingedientSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
    ingredients: ingredientSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


