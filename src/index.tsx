import React from 'react';
import App from './components/app/app';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/store';
import { fetchIngredients } from './services/api';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

console.log(fetchIngredients());

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
