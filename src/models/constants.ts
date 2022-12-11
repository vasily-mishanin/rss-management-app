export const baseURL = 'https://rss-react-final-task-backend-production-19cf.up.railway.app';

export enum endpoints {
  USERS = 'users',
  BOARDS = 'boards',
  COLUMNS = 'columns',
  TASKS = 'tasks',
}

export enum methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum form_mode {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
}

export enum form_subject {
  BOARD = 'BOARD',
  COLUMN = 'COLUMN',
  TASK = 'TASK',
}

export const VALIDATE_name_REGEXPR = /^[А-Яа-яA-Za-z!@#$%^&*()0-9 ]{3,}$/;
export const VALIDATE_description_REGEXPR = /^[А-Яа-яA-Za-z!@#$%^&*()0-9 ]{5,}$/;
