import { feedDataSlice } from '../services/slices/FeedSlice';
import { getFeedData } from '../services/slices/FeedSlice';

describe('feedDataReducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
    loading: false,
    modalOrder: null
  };

  it('should handle getFeedData.pending', () => {
    const action = { type: getFeedData.pending.type };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should handle getFeedData.fulfilled', () => {
    const payload = {
      orders: [{ id: '1', name: 'Order1' }],
      total: 1,
      totalToday: 1
    };
    const action = { type: getFeedData.fulfilled.type, payload };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(payload.total);
    expect(state.totalToday).toBe(payload.totalToday);
    expect(state.loading).toBe(false);
  });

  it('should handle getFeedData.rejected', () => {
    const action = {
      type: getFeedData.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedDataSlice.reducer(initialState, action);
    expect(state.error).toBe('Error');
    expect(state.loading).toBe(false);
  });
});
