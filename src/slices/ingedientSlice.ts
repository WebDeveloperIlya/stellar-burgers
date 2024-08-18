// ingredientsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IngredientsState {
  buns: any[]; 
  mains: any[]; 
  sauces: any[]; 
}

const initialState: IngredientsState = {
  buns: [],
  mains: [],
  sauces: []
};

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
  }
});

export const { setBuns, setMains, setSauces } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
