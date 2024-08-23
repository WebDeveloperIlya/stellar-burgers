import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';
import constructorReducer from './slices/constructorSlice';
import ingredientSlice from './slices/ingedientSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
    constructor: constructorReducer,
    ingredients: ingredientSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
