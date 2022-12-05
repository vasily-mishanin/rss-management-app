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

export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface INewBoard {
  token: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface INewColumn {
  title: string;
  order: number;
}

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface INewColumnProps {
  boardId: string;
  token: string;
  newColumn: INewColumn;
}

export type TGetAllColumns = {
  token: string;
  boardId: string;
};

export interface INewTask {
  boardId: string;
  columnId: string;
  token: string;

  newTask: {
    title: string;
    order: number;
    description: string;
    userId: number;
    users: string[];
  };
}

export type TGetAllTasks = {
  token: string;
  boardId: string;
  columnId: string;
};
