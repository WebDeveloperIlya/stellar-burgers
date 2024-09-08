import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorState,
  TIngredient,
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
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
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
      state = initialState;
    }
  }
});

export const {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor,
  removeIngredient,
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
