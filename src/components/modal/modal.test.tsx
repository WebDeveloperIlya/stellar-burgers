// Modal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { ModalUI } from '../ui';
import { rootReducer } from '../../services/store';

const store = configureStore({
  reducer: {
    reducer: rootReducer
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
    const element = screen.queryByText(/Test Modal/i);
    expect(element).not.toBeNull();

    // Проверка наличия содержимого модального окна
    const element1 = screen.queryByText(/Test Content/i);
    expect(element1).not.toBeNull();

    // Проверка нажатия кнопки закрытия
    fireEvent.click(screen.getByText(/Close/i));
    expect(onClose).toHaveBeenCalled();
  });
});
