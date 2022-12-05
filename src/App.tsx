import React, { useEffect } from 'react';
import classes from './App.module.scss';
import { Outlet } from 'react-router-dom';
import MainNavigation from './layout/MainNavigation/MainNavigation';
import Footer from './layout/Footer/Footer';
import { useNavigate } from 'react-router-dom';
//import * as apiUser from './api/api_users';
import type { IUser } from './models/types';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { authSliceActions, isStoredTokenValid } from './store/reducers/authSlice';
import { storeScroll } from './helpers/headerAnimation';

// Update scroll position for first time
storeScroll();

function App() {
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigate('/welcome');
    }
    if (!isStoredTokenValid()) {
      dispatch(authSliceActions.signOut());
    }
  }, []);

  return (
    <div className={classes.app}>
      <header className={classes.app__header}>
        <MainNavigation />
      </header>
      <main className={classes.app__main}>
        <Outlet />
      </main>
      <footer className={classes.app__footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
