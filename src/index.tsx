import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import AuthPage from './pages/AuthPage/AuthPage';

const store = setupStore();

const ROUTES = [
  {
    path: '/',
    element: <App />,
    children: [
      // { path: '/', element: 'Addition MAIN Route' },
      { path: 'welcome', element: <h1>Welcome</h1> },
      { path: 'boards', element: <h1>Boards</h1> },
      { path: 'login', element: <AuthPage mode='LOGIN' /> },
      { path: 'register', element: <AuthPage mode='REGISTER' /> },
    ],
  },
];

const router = createBrowserRouter(ROUTES);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
