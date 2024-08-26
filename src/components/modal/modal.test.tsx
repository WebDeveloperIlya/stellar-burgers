// Modal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { ModalUI } from '../ui';

const store = configureStore({
  reducer: {
    // добавьте редьюсеры по необходимости
  }
});

describe('Modal', () => {
  it('should render modal with title and close button', () => {
    const onClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal title='Test Modal' onClose={onClose}>
            <div>Test Content</div>
          </Modal>
        </MemoryRouter>
      </Provider>
    );

    // Проверка наличия заголовка модального окна
    expect(screen.getByText(/Test Modal/i)).toBeInTheDocument();

    // Проверка наличия содержимого модального окна
    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();

    // Проверка нажатия кнопки закрытия
    fireEvent.click(screen.getByText(/Close/i));
    expect(onClose).toHaveBeenCalled();
  });
});
