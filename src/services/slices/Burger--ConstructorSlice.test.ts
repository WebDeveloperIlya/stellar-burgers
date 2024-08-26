import { createOrder } from './Burger--ConstructorSlice';
import { orderBurgerApi } from '../../utils/burger-api';

import { Middleware } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { AnyAction } from 'redux';

const middlewares: Middleware<{}, any, AnyAction>[] = [thunk];
const mockStore = configureMockStore(middlewares);

describe('createOrder async action', () => {
  it('should dispatch the correct actions on success', async () => {
    const store = mockStore({});

    (orderBurgerApi as jest.Mock).mockResolvedValue({
      order: {
        number: 123,
        name: 'Test Burger'
      },
      name: 'Test Burger'
    });

    await store.dispatch(
      createOrder(['ingredient1', 'ingredient2']) as unknown as AnyAction
    );

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'order/createOrder/pending'
    });
    expect(actions[1]).toEqual({
      type: 'order/createOrder/fulfilled',
      payload: {
        order: {
          number: 123,
          name: 'Test Burger'
        },
        name: 'Test Burger'
      }
    });
  });
});
