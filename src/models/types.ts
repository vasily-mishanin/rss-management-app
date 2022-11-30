export interface IError {
  statusCode: number | null;
  message: string;
}

export interface IUser {
  _id?: string;
  login: string;
  password: string;
  name?: string;
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
}
