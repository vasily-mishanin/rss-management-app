import { baseURL } from '../models/constants';
import type { IBoard, IError, INewBoard } from '../models/types';

//GET ALL BOARDS
export async function getAllBoards(token: string) {
  try {
    const res = await fetch(`${baseURL}/boards`, {
      method: 'GET',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      console.log('getAllBoards Success');
      const data: IBoard[] = await res.json();
      console.log('getAllBoards', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

//CREATE BOARD
export async function createBoard(newBoardData: INewBoard) {
  const boardForDataBase = {
    title: newBoardData.title,
    owner: newBoardData.owner,
    users: newBoardData.users,
  };
  try {
    const res = await fetch(`${baseURL}/boards`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newBoardData.token}`,
      },
      body: JSON.stringify(boardForDataBase),
    });
    if (res.ok) {
      console.log('createBoard Success');
      const data: IBoard = await res.json();
      console.log('createdBoard', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

//GET BOARD
export async function getBoard(boardId: string, token: string) {
  try {
    const res = await fetch(`${baseURL}/${boardId}`, {
      method: 'GET',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      console.log('getBoard Success');
      const data: IBoard = await res.json();
      console.log('getBoard', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

//UPDATE BOARD
export async function updateBoard(boardId: string, updatedBoard: INewBoard, token: string) {
  try {
    const res = await fetch(`${baseURL}/${boardId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedBoard),
    });
    if (res.ok) {
      console.log('updatedBoard Success');
      const data: IBoard = await res.json();
      console.log('updatedBoard', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

//DELETE BOARD
export async function deleteBoard(boardId: string, token: string) {
  try {
    const res = await fetch(`${baseURL}/${boardId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      console.log('deleteBoard Success');
      const data: IBoard = await res.json();
      console.log('deleteBoard', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}
