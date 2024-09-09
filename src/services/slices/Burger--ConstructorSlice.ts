import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import {
  TConstructorIngredient,
  TConstructorState,
  TIngredient,
  TOrder
} from '../../utils/types';
import { RootState } from '../store';

interface ICreateOrderResponse {
  order: TOrder;
}

export const createOrder = createAsyncThunk<ICreateOrderResponse, string[]>(
  'burgerconstructor/createOrder',
  async (ingredients: string[]) => {
    try {
      const response = await orderBurgerApi(ingredients);
      return response;
    } catch (error) {
      throw new Error('Ошибка при создании заказа');
    }
  }
);

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  orderRequestFailed: false,
  orderRequestSuccess: false
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
    clearOrder: (state) => {
      state.orderRequest = false;
      state.orderRequestFailed = false;
      state.orderRequestSuccess = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderRequestFailed = false;
        state.orderRequestSuccess = false;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<ICreateOrderResponse>) => {
          state.orderRequest = false;
          state.orderRequestSuccess = true;
          state.orderModalData = action.payload.order;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderRequestFailed = true;
      });
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

export const getOrderRequestFailed = (state: RootState) =>
  state.burgerconstructor.orderRequestFailed;

export const getOrderRequestSuccess = (state: RootState) =>
  state.burgerconstructor.orderRequestSuccess;

export default burgerConstructorSlice.reducer;
