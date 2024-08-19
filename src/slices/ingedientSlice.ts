// src/slices/ingredientsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredients } from '../utils/burger-api'; // Импортируем функцию из burger-api

interface IngredientsState {
  buns: any[]; 
  mains: any[]; 
  sauces: any[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: null,
};

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await fetchIngredients();
      return ingredients;
    } catch (error) {
      return rejectWithValue('Failed to fetch ingredients');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setBuns: (state, action: PayloadAction<any[]>) => { // Adjust type accordingly
      state.buns = action.payload;
    },
    setMains: (state, action: PayloadAction<any[]>) => { // Adjust type accordingly
      state.mains = action.payload;
    },
    setSauces: (state, action: PayloadAction<any[]>) => { // Adjust type accordingly
      state.sauces = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        // Разделение ингредиентов на категории
        const buns = action.payload.filter(ingredient => ingredient.type === 'bun');
        const mains = action.payload.filter(ingredient => ingredient.type === 'main');
        const sauces = action.payload.filter(ingredient => ingredient.type === 'sauce');
        
        state.buns = buns;
        state.mains = mains;
        state.sauces = sauces;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setBuns, setMains, setSauces } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
