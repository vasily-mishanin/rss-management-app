import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  IBoard,
  IColumn,
  IError,
  INewBoard,
  INewColumnProps,
  INewTask,
  ITask,
  TGetAllColumns,
  TGetAllTasks,
} from '../../models/types';
import * as api_boards from '../../api/api_boards';
import * as api_columns from '../../api/api_columns';
import * as api_tasks from '../../api/api_tasks';

interface IBoardsSlice {
  boards: IBoard[];
  columns: IColumn[];
  tasks: ITask[];
  error: IError;
  isLoading: boolean;
}

// BOARDS

export const getAllBoardsThunk = createAsyncThunk('boards/getAllBoards', async (token: string, thunkAPI) => {
  try {
    const payload = await api_boards.getAllBoards(token);
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
      const payload = { ...result };
      return payload;
    } catch (err) {
      console.error(err);
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

// COLUMNS

//CREATE COLUMN
export const createColumnThunk = createAsyncThunk(
  'columns/createColumn',
  async (createData: INewColumnProps, thunkAPI) => {
    const { boardId, token, newColumn } = createData;
    try {
      const result = await api_columns.createColumn(boardId, token, newColumn);
      const payload = { ...result };
      return payload;
    } catch (err) {
      console.error(err);
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//GET ALL COLUMNS
export const getAllColumnsThunk = createAsyncThunk(
  'columns/getAllColumns',
  async (data: TGetAllColumns, thunkAPI) => {
    try {
      const payload = await api_columns.getAllColumns(data);
      return payload;
    } catch (err) {
      console.error(err);
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

// TASKS

// CREATE TASKS
export const createTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async (createData: INewTask, thunkAPI) => {
    try {
      const result = await api_tasks.createTask(createData);
      const payload = { ...result };
      return payload;
    } catch (err) {
      console.error(err);
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

// GET ALL TASKS
export const getAllTasksThunk = createAsyncThunk(
  'tasks/getAllTasks',
  async (reqData: TGetAllTasks, thunkAPI) => {
    try {
      const payload = await api_tasks.getAllTasks(reqData);
      return payload;
    } catch (err) {
      console.error(err);
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState: IBoardsSlice = {
  boards: [],
  columns: [],
  tasks: [],
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
    //BOARDS
    //GET ALL BOARDS
    buider.addCase(getAllBoardsThunk.pending.type, (state, action: PayloadAction<IBoard[]>) => {
      state.isLoading = true;
    });
    buider.addCase(getAllBoardsThunk.fulfilled.type, (state, action: PayloadAction<IBoard[]>) => {
      state.isLoading = false;
      state.boards = action.payload;
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

    //COLUMNS
    //CREATE COLUMN
    buider.addCase(createColumnThunk.pending.type, (state, action: PayloadAction<IColumn>) => {
      state.isLoading = true;
    });
    buider.addCase(createColumnThunk.fulfilled.type, (state, action: PayloadAction<IColumn>) => {
      state.isLoading = false;
      state.columns.push(action.payload);
      state.error = { statusCode: null, message: '' };
    });
    buider.addCase(createColumnThunk.rejected.type, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //GET ALL COLUMNS
    buider.addCase(getAllColumnsThunk.pending.type, (state, action: PayloadAction<IColumn[]>) => {
      state.isLoading = true;
    });
    buider.addCase(getAllColumnsThunk.fulfilled.type, (state, action: PayloadAction<IColumn[]>) => {
      state.isLoading = false;
      state.columns = action.payload;
      state.error = { statusCode: null, message: '' };
    });
    buider.addCase(getAllColumnsThunk.rejected.type, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //TASKS
    //CREATE TASK
    buider.addCase(createTaskThunk.pending.type, (state, action: PayloadAction<ITask>) => {
      state.isLoading = true;
    });
    buider.addCase(createTaskThunk.fulfilled.type, (state, action: PayloadAction<ITask>) => {
      state.isLoading = false;
      state.tasks.push(action.payload);
      state.error = { statusCode: null, message: '' };
    });
    buider.addCase(createTaskThunk.rejected.type, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //GET ALL TASKS
    buider.addCase(getAllTasksThunk.pending.type, (state, action: PayloadAction<ITask[]>) => {
      state.isLoading = true;
    });
    buider.addCase(getAllTasksThunk.fulfilled.type, (state, action: PayloadAction<ITask[]>) => {
      state.isLoading = false;
      state.tasks = mergeTasks(state.tasks, action.payload);
      state.error = { statusCode: null, message: '' };
    });
    buider.addCase(getAllTasksThunk.rejected.type, (state, action: PayloadAction<IError>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const boardsSliceActions = boardsSlice.actions;

export default boardsSlice.reducer;

//helpers
function mergeTasks(tasks1: ITask[], tasks2: ITask[]) {
  let result: ITask[] = [];
  let heap = [...tasks1, ...tasks2];

  heap.forEach((task) => {
    if (result.findIndex((rt) => rt._id === task._id) === -1) {
      result.push(task);
    }
  });

  return result;
}
