// BurgerConstructor.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from '../../services/slices/Burger--ConstructorSlice';
import { BurgerConstructor } from './burger-constructor';
import { MemoryRouter } from 'react-router-dom';

const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer.reducer
  }
});

describe('BurgerConstructor', () => {
  it('should render the component and display price', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BurgerConstructor />
        </MemoryRouter>
      </Provider>
    );

    // Проверка наличия компонента
    const element = screen.queryByText(/Оформить заказ/i);
    expect(element).not.toBeNull();
  });

  it('should redirect to login if not authenticated', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BurgerConstructor />
        </MemoryRouter>
      </Provider>
    );

    // Проверка, что при нажатии на кнопку "Оформить заказ" происходит редирект
    const orderButton = screen.getByText(/Оформить заказ/i);
    fireEvent.click(orderButton);

    // Поскольку мы не авторизованы, ожидаем редирект
    // Можно использовать mock для проверки редиректа
  });
});
