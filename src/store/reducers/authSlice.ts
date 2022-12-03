import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IAuth, IError, ILogInSuccess, IUser } from '../../models/types';
import * as api_users from '../../api/api_users';

type LocalStorage = {
  login: string;
  token: string;
  authDate: string;
};

const USER = 'user';
const TOKEN_LIFETIME_HOURS = 2;

const calculatePassedHours = (dateA: Date, dateB: Date) => {
  const passedMilliseconds = dateA.getTime() - dateB.getTime();
  const passedHours = passedMilliseconds / 3600000;
  return passedHours;
};

export const registerUserThunk = createAsyncThunk('auth/registerUser', async (user: IUser, thunkAPI) => {
  try {
    const result = await api_users.registerUser(user);
    const payload = { ...result, password: user.password };
    console.log('result', payload);
    return payload;
  } catch (err) {
    console.error(err);
    throw thunkAPI.rejectWithValue(err);
  }
});

export const signInUserThunk = createAsyncThunk('auth/signInUser', async (user: IUser, thunkAPI) => {
  try {
    const result = await api_users.logIn(user);
    console.log('signInUserThunk', result);
    return { login: user.login, token: result.token };
  } catch (err) {
    console.error(err);
    throw thunkAPI.rejectWithValue(err);
  }
});

const getLocalStorageUser = () => getFromLocalStorage<LocalStorage>(USER);

export const isStoredTokenValid = () => {
  const user = getLocalStorageUser();
  if (user) {
    const lastLoggedInDate = new Date(user.authDate);
    const now = new Date();
    const passedHours = calculatePassedHours(now, lastLoggedInDate);
    console.log('passedHours', passedHours);
    return passedHours < TOKEN_LIFETIME_HOURS;
  }
  return false;
};

if (!isStoredTokenValid()) {
  localStorage.removeItem(USER);
}

const getInitialState = (): IAuth => {
  const storedUser = getLocalStorageUser();
  return {
    user: {
      login: storedUser ? storedUser.login : '',
      password: '',
    },
    token: storedUser ? storedUser.token : '',
    isLoggedIn: !!storedUser?.token,
    isLoading: false,
    error: { statusCode: null, message: '' },
    authDate: storedUser ? storedUser.authDate : '',
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    signOut: (state) => {
      localStorage.removeItem(USER);
      return getInitialState();
    },
    clearError: (state) => {
      state.error = { statusCode: null, message: '' };
    },
  },
  extraReducers: (buider) => {
    //REGISTER
    buider.addCase(registerUserThunk.pending.type, (state, action: PayloadAction<IUser>) => {
      state.isLoading = true;
    });
    buider.addCase(registerUserThunk.fulfilled.type, (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = { statusCode: null, message: '' };
    });
    buider.addCase(registerUserThunk.rejected.type, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //SIGNIN
    buider.addCase(signInUserThunk.pending.type, (state, action: PayloadAction<ILogInSuccess>) => {
      state.isLoading = true;
    });
    buider.addCase(
      signInUserThunk.fulfilled.type,
      (state, action: PayloadAction<{ login: string; token: string }>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user.login = action.payload.login;
        state.isLoggedIn = true;
        const date = new Date();
        state.authDate = date.toISOString();
        const userLocalStorage: LocalStorage = {
          login: state.user.login,
          token: state.token,
          authDate: state.authDate,
        };
        state.error = { statusCode: null, message: '' };
        setLocalStorage(USER, userLocalStorage);
      }
    );
    buider.addCase(signInUserThunk.rejected.type, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    });
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;

//helpers
function setLocalStorage(item: string, value: object) {
  const storedValue = JSON.stringify(value);
  localStorage.setItem(item, storedValue);
}

function getFromLocalStorage<T>(item: string) {
  const storedValue = localStorage.getItem(item);
  const value = storedValue ? (JSON.parse(storedValue) as T) : null;
  return value;
}
