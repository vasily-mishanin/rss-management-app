import { ifError } from 'assert';
import { baseURL } from '../models/constants';
import type { IError, ILogInSuccess, IUser } from '../models/types';

export async function registerUser(user: IUser) {
  try {
    const res = await fetch(`${baseURL}/auth/signup`, {
      method: 'POST',
      headers: { Accept: 'application.json', 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const data: IUser = await res.json();
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

export async function logIn(user: IUser) {
  const { login, password } = user;
  try {
    const res = await fetch(`${baseURL}/auth/signin`, {
      method: 'POST',
      headers: { Accept: 'application.json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    if (res.ok) {
      console.log('logIn Success');
      const data: ILogInSuccess = await res.json();
      console.log('loggedIn', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}
