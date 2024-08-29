import {
  addToConstructor,
  burgerConstructorSlice,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} from './Burger--ConstructorSlice';
import { TConstructorState, TConstructorIngredient } from '../../utils/types';

describe('constructorSlice', () => {
  const ingredient1: TConstructorIngredient = {
    id: '123',
    _id: '123',
    name: 'Tomato',
    type: 'vegetable',
    proteins: 2,
    fat: 0.2,
    carbohydrates: 3.5,
    calories: 20,
    price: 1.5,
    image: 'tomato.jpg',
    image_large: 'tomato_large.jpg',
    image_mobile: 'tomato_mobile.jpg'
  };

  const ingredient2: TConstructorIngredient = {
    id: '456',
    _id: '456',
    name: 'Lettuce',
    type: 'vegetable',
    proteins: 1,
    fat: 0.1,
    carbohydrates: 2.0,
    calories: 10,
    price: 1.0,
    image: 'lettuce.jpg',
    image_large: 'lettuce_large.jpg',
    image_mobile: 'lettuce_mobile.jpg'
  };

  const bun: TConstructorIngredient = {
    id: '789',
    _id: '789',
    name: 'Brioche Bun',
    type: 'bun',
    proteins: 2,
    fat: 0.2,
    carbohydrates: 3.5,
    calories: 20,
    price: 1.5,
    image: 'bun.jpg',
    image_large: 'bun_large.jpg',
    image_mobile: 'bun_mobile.jpg'
  };

  it('should handle addToConstructor action to add an ingredient', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addToConstructor(ingredient1)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('should handle addToConstructor action to add a bun', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addToConstructor(bun)
    );
    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('should handle removeFromConstructor action', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient1],
      orderRequest: false,
      orderModalData: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeFromConstructor(0)
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  it('should handle reorderConstructor action', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient1, ingredient2],
      orderRequest: false,
      orderModalData: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      reorderConstructor({ from: 0, to: 1 })
    );
    expect(newState.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('should handle resetConstructor action', () => {
    const initialState: TConstructorState = {
      bun,
      ingredients: [ingredient1],
      orderRequest: false,
      orderModalData: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      resetConstructor()
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null
    });
  });
});
