import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { store } from './store/store';
import { HTML5Backend } from 'react-dnd-html5-backend';

test('renders App', () => {
  render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>,
    { wrapper: BrowserRouter }
  );
  const linkElement = screen.getByText(/GirAff/i);
  expect(linkElement).toBeInTheDocument();
});
