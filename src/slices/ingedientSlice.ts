// src/slices/ingredientsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api'; // Импортируем функцию из burger-api
import { TIngredient } from '@utils-types';

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
}

interface IngredientsState {
  ingredients: TIngredient[];
  currentIngredient: Ingredient | null;
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  currentIngredient: null,
  loading: false,
  error: null
};

export const fetchIngredientsThunk = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients;
    } catch (error) {
      return rejectWithValue('Failed to fetch ingredients');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredientsThunk.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients
  }
});
export const ingredientSelector = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
