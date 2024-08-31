import { store } from './store';
import { fetchIngredients } from './api';
import { RootState } from './store';

const mockResponse = { data: [{ id: 1, name: 'Tomato' }] };
const errorMessage = 'Failed to fetch';

beforeEach(() => {
  (global as any).fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('should handle FETCH_INGREDIENTS_SUCCESS action correctly', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    json: () => Promise.resolve(mockResponse)
  });

  await store.dispatch(fetchIngredients() as any);

  const state: RootState = store.getState();
  expect(state.ingredients).toEqual(mockResponse.data);
});

test('should handle FETCH_INGREDIENTS_FAILURE action correctly', async () => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

  await store.dispatch(fetchIngredients() as any);

  const state: RootState = store.getState();
  expect(state.ingredients).toEqual([]);
});
