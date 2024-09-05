import { rootReducer } from '../services/store';
import { AnyAction } from 'redux';
import { feedDataSlice } from '../services/slices/FeedSlice';
import ingredientsSlice from '../services/slices/IngedientSlice';
import { userStateSlice } from '../services/slices/UserSlice';
import { userOrdersHistorySlice } from '../services/slices/OrdersHistory';

describe('rootReducer', () => {
  it('should return the initial state when called with an undefined state and unknown action', () => {
    const initialState = {
      burgerconstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null
      },
      [feedDataSlice.name]: {
        orders: [],
        total: 0,
        totalToday: 0,
        error: null,
        loading: false,
        modalOrder: null
      },
      [ingredientsSlice.name]: {
        ingredients: [],
        loading: false,
        error: null
      },
      [userStateSlice.name]: {
        isAuthChecked: false,
        isAuthenticated: false,
        user: null,
        loginUserError: null,
        loginUserRequest: false
      },
      [userOrdersHistorySlice.name]: {
        orders: [],
        loading: false,
        error: null
      }
    };

    const state = rootReducer(undefined, {} as AnyAction);
    expect(state).toEqual(initialState);
  });
});
