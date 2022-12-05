import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IBoard, IError, INewBoard } from '../../models/types';
import * as api_boards from '../../api/api_boards';

interface IBoardsSlice {
  boards: IBoard[];
  error: IError;
  isLoading: boolean;
}

export const getAllBoardsThunk = createAsyncThunk('boards/getAllBoards', async (token: string, thunkAPI) => {
  try {
    const payload = await api_boards.getAllBoards(token);
    console.log('getAllBoardsThunk-result', payload);
    return payload;
  } catch (err) {
    console.error(err);
    throw thunkAPI.rejectWithValue(err);
  }
});

export const createBoardThunk = createAsyncThunk(
  'boards/createBoard',
  async (newBoard: INewBoard, thunkAPI) => {
    try {
      const result = await api_boards.createBoard(newBoard);
      console.log('createBoardThunk-result', result);
      const payload = { ...result };
      return payload;
    } catch (err) {
      console.error(err);
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState: IBoardsSlice = {
  boards: [],
  error: { statusCode: null, message: '' },
  isLoading: false,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = { statusCode: null, message: '' };
    },
  },
  extraReducers: (buider) => {
    //GET ALL BOARDS
    buider.addCase(getAllBoardsThunk.pending.type, (state, action: PayloadAction<IBoard[]>) => {
      state.isLoading = true;
    });
    buider.addCase(getAllBoardsThunk.fulfilled.type, (state, action: PayloadAction<IBoard[]>) => {
      state.isLoading = false;
      state.boards = [...action.payload];
      state.error = { statusCode: null, message: '' };
    });
    buider.addCase(getAllBoardsThunk.rejected.type, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //CREATE BOARD
    buider.addCase(createBoardThunk.pending.type, (state, action: PayloadAction<IBoard>) => {
      state.isLoading = true;
    });
    buider.addCase(createBoardThunk.fulfilled.type, (state, action: PayloadAction<IBoard>) => {
      state.isLoading = false;
      state.boards.push(action.payload);
      state.error = { statusCode: null, message: '' };
    });
    buider.addCase(createBoardThunk.rejected.type, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const boardsSliceActions = boardsSlice.actions;

export default boardsSlice.reducer;

// //helpers
// function setLocalStorage(item: string, value: object) {
//   const storedValue = JSON.stringify(value);
//   localStorage.setItem(item, storedValue);
// }

// function getFromLocalStorage<T>(item: string) {
//   const storedValue = localStorage.getItem(item);
//   const value = storedValue ? (JSON.parse(storedValue) as T) : null;
//   return value;
// }
