import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AuthPage from './pages/AuthPage/AuthPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BoardsPage from './pages/BoardsPage/BoardsPage';
//import * as api_boards from './api/api_boards';
import BoardPage from './pages/BoardPage/BoardPage';

const ROUTES = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <BoardsPage /> },
      { path: 'welcome', element: <WelcomePage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'login', element: <AuthPage mode='LOGIN' /> },
      { path: 'register', element: <AuthPage mode='REGISTER' /> },
      { path: 'boards/:boardId', element: <BoardPage /> },
    ],
  },
];

const router = createHashRouter(ROUTES);

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
