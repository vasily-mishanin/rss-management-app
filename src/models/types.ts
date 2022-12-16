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
  description?: string;
}

export interface INewBoard {
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
  boardId: string;
  title: string;
  order: number;
}

export type IUpdatedColumn = Pick<IColumn, '_id' | 'order'>;

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

export type INewTask = Omit<ITask, '_id'>;

export type IUpdatedTask = Pick<ITask, '_id' | 'order' | 'columnId'>;

export type TGetAllColumns = {
  token: string;
  boardId: string;
};

export type TGetAllTasks = {
  token: string;
  boardId: string;
  columnId: string;
};

export type FormDataTypes = INewBoard | IBoard | INewColumn | IColumn | INewTask | ITask;
