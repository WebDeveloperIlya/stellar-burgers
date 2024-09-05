import { userOrdersHistorySlice } from '../services/slices/OrdersHistory';
import { ordersHistory } from '../services/slices/OrdersHistory';

describe('ordersHistoryReducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  it('should handle ordersHistory.pending', () => {
    const action = { type: ordersHistory.pending.type };
    const state = userOrdersHistorySlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle ordersHistory.fulfilled', () => {
    const payload = [{ id: '1', name: 'Order1' }];
    const action = { type: ordersHistory.fulfilled.type, payload };
    const state = userOrdersHistorySlice.reducer(initialState, action);
    expect(state.orders).toEqual(payload);
    expect(state.loading).toBe(false);
  });

  it('should handle ordersHistory.rejected', () => {
    const action = {
      type: ordersHistory.rejected.type,
      error: { message: 'Error' }
    };
    const state = userOrdersHistorySlice.reducer(initialState, action);
    expect(state.error).toBe('Error');
    expect(state.loading).toBe(false);
  });
});
