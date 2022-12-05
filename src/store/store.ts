import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import uiReducer from './reducers/uiSlice';
import boardsReducer from './reducers/boardsSlice';

const rootReducer = combineReducers({ authReducer, uiReducer, boardsReducer });

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
