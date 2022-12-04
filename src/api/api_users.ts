import { baseURL } from '../models/constants';
import type { IError, ILogInSuccess, IUser } from '../models/types';
import { IUpdatedUser } from '../models/types';

// REGISTER

export async function registerUser(user: IUser) {
  const { name, login, password } = user;
  try {
    const res = await fetch(`${baseURL}/auth/signup`, {
      method: 'POST',
      headers: { Accept: 'application.json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, login, password }),
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

//LOGIN

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

//UPDATE
export async function updateUser(user: IUser) {
  const { name, login, password, _id } = user;
  try {
    const res = await fetch(`${baseURL}/users/${_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ name, login, password }),
    });
    if (res.ok) {
      console.log('Update Success');
      const data: IUpdatedUser = await res.json();
      console.log('UpdatedUser', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

//DELETE
export async function deleteUser(userId: string, token: string) {
  try {
    const res = await fetch(`${baseURL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      console.log('Delete Success');
      const data: IUpdatedUser = await res.json();
      console.log('DeletedUser', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}
