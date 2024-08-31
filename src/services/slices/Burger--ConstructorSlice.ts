import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorState,
  TConstructorIngredient,
  TOrder
} from '../../utils/types';
import { RootState } from '../store';

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerconstructor',
  initialState,
  reducers: {
    addToConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      if (ingredient.type === 'top') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeFromConstructor: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload
      );
    },
    reorderConstructor: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [movedIngredient] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedIngredient);
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;
      if (!state.ingredients.some((ing) => ing._id === ingredient._id)) {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const tmp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = tmp;
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const tmp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = tmp;
      }
    },
    createOrder: (state, action: PayloadAction<TOrder>) => {
      state.orderRequest = true;
      state.orderModalData = action.payload;
    },
    clearOrder: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  }
});

export const {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor,
  removeIngredient,
  addIngredient,
  moveUpIngredient,
  moveDownIngredient,
  createOrder,
  clearOrder
} = burgerConstructorSlice.actions;

// Selectors
export const getConstructorItems = (state: RootState) => ({
  bun: state.burgerconstructor.bun,
  ingredients: state.burgerconstructor.ingredients
});

export const getOrderRequest = (state: RootState) =>
  state.burgerconstructor.orderRequest;

export const getOrderModalData = (state: RootState): TOrder | null =>
  state.burgerconstructor.orderModalData;

export default burgerConstructorSlice.reducer;
