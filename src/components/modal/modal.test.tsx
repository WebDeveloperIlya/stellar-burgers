import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal';

beforeEach(() => {
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', 'modals');
  document.body.appendChild(portalContainer);
});

afterEach(() => {
  const portalContainer = document.getElementById('modals');
  if (portalContainer) {
    document.body.removeChild(portalContainer);
  }
});

test('renders Modal component', () => {
  render(<Modal title='Test Modal' onClose={() => {}} />);
  expect(screen.queryByText(/Test Modal/i)).toBeNull();
});

test('closes modal on escape key press', () => {
  const onClose = jest.fn();
  render(<Modal title='Test Modal' onClose={onClose} />);

  fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});
