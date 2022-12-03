export interface IError {
  statusCode: number | null;
  message: string;
}

export interface IUser {
  _id: string;
  login: string;
  password: string;
  name: string;
  token?: string;
}

export interface IAuth {
  user: IUser;
  token: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: IError;
  authDate: string;
}

export interface ILogInSuccess {
  token: string;
  _id: string;
}

export interface IUpdatedUser {
  _id: string;
  name: string;
  login: string;
}
