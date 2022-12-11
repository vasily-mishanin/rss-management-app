import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import uiReducer from './reducers/uiSlice';
import boardsReducer from './reducers/boardsSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { boardsApi } from '../services/BoardsService';
import { columnsApi } from '../services/ColumnService';

// const rootReducer = combineReducers();

//export const setupStore = () => {

const kanbanMiddleware = [boardsApi.middleware, columnsApi.middleware];

export const store = configureStore({
  reducer: {
    authReducer,
    uiReducer,
    boardsReducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(kanbanMiddleware),
});
//};

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
