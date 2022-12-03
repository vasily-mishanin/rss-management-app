import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import AuthPage from './pages/AuthPage/AuthPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Profile from './pages/Profile/Profile';

const store = setupStore();

const ROUTES = [
  {
    path: '/',
    element: <App />,
    children: [
      // { path: '/', element: 'Addition MAIN Route' },
      { path: 'welcome', element: <WelcomePage /> },
      { path: 'new-board', element: <h1>NEW BOARD</h1> },
      { path: 'profile', element: <Profile /> },
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
