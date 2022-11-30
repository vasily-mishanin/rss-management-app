import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

test('renders App', () => {
  render(
    <Provider store={setupStore()}>
      <App />
    </Provider>,
    { wrapper: BrowserRouter }
  );
  const linkElement = screen.getByText(/GirAff/i);
  expect(linkElement).toBeInTheDocument();
});
