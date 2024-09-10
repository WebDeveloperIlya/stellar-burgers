import {
  userStateSlice,
  userApi,
  logInUser,
  logOutUser,
  updateUser,
  toRegisterUser
} from '../services/slices/UserSlice';

describe('userStateReducer', () => {
  const initialState = {
    isAuthChecked: false,
    isAuthenticated: false,
    user: null,
    loginUserError: null,
    loginUserRequest: false
  };

  it('should handle userApi.pending', () => {
    const action = { type: userApi.pending.type };
    const state = userStateSlice.reducer(initialState, action);
    expect(state.isAuthenticated).toBe(false);
    expect(state.loginUserRequest).toBe(true);
  });

  it('should handle userApi.fulfilled', () => {
    const payload = { user: { id: '1', name: 'John Doe' } };
    const action = { type: userApi.fulfilled.type, payload };
    const state = userStateSlice.reducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(payload.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserRequest).toBe(false);
  });

  it('should handle userApi.rejected', () => {
    const action = { type: userApi.rejected.type, error: { message: 'Error' } };
    const state = userStateSlice.reducer(initialState, action);
    expect(state.loginUserError).toBe('Error');
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserRequest).toBe(false);
  });
});
