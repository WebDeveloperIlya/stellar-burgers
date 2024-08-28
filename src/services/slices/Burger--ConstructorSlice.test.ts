import { createOrder } from './Burger--ConstructorSlice';
import { orderBurgerApi } from '../../utils/burger-api';
import { Middleware } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store'; // Замените на правильный импорт типа RootState

// Определяем типы для ThunkAction и ThunkDispatch
type ThunkActionType = ThunkAction<void, RootState, unknown, Action<string>>;
type ThunkDispatchType = ThunkDispatch<RootState, unknown, Action<string>>;

const middlewares: Middleware<{}, RootState, ThunkDispatchType>[] = [thunk];
const mockStore = configureMockStore<RootState, ThunkDispatchType>(middlewares);

describe('createOrder async action', () => {
  it('should dispatch the correct actions on success', async () => {
    const store = mockStore();

    // Мокаем API
    (orderBurgerApi as jest.Mock).mockResolvedValue({
      order: {
        number: 123,
        name: 'Test Burger'
      },
      name: 'Test Burger'
    });

    // Диспатчим асинхронное действие
    await store.dispatch(
      createOrder(['ingredient1', 'ingredient2']) as ThunkActionType
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
