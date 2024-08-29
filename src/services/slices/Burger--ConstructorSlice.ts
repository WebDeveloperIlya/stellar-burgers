import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorState, TConstructorIngredient } from '../../utils/types';
import { RootState } from 'services/store';

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
      if (ingredient.type === 'bun') {
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
    }
  }
});

export const {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} = burgerConstructorSlice.actions;

// Selectors
export const getConstructorItems = (state: RootState) => ({
  bun: state.burgerconstructor.bun,
  ingredients: state.burgerconstructor.ingredients
});

export const getOrderRequest = (state: RootState) =>
  state.burgerconstructor.orderRequest;

export const getOrderModalData = (state: RootState) =>
  state.burgerconstructor.orderModalData;

export default burgerConstructorSlice.reducer;
