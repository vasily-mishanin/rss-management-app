import { baseURL } from '../models/constants';
import type { IColumn, INewColumn, IError, TGetAllColumns } from '../models/types';

//GET ALL COLUMNS
export async function getAllColumns(reqData: TGetAllColumns) {
  try {
    const res = await fetch(`${baseURL}/boards/${reqData.boardId}/columns`, {
      method: 'GET',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${reqData.token}`,
      },
    });
    if (res.ok) {
      console.log('getAllColumns Success');
      const data: IColumn[] = await res.json();
      console.log('getAllColumns', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

//CREATE COLUMN
export async function createColumn(boadId: string, token: string, newColumn: INewColumn) {
  try {
    const res = await fetch(`${baseURL}/boards/${boadId}/columns`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newColumn),
    });
    if (res.ok) {
      console.log('createColumn Success');
      const data: IColumn[] = await res.json();
      console.log('createColumn', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}
