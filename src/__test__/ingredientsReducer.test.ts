import ingredientsSlice from '../services/slices/IngedientSlice';
import { getIngredients } from '../services/slices/IngedientSlice';

describe('ingredientsReducer', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('should handle getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getIngredients.fulfilled', () => {
    const payload = [{ id: '1', name: 'Tomato' }];
    const action = { type: getIngredients.fulfilled.type, payload };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.ingredients).toEqual(payload);
    expect(state.loading).toBe(false);
  });

  it('should handle getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error' }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.error).toBe('Error');
    expect(state.loading).toBe(false);
  });
});
