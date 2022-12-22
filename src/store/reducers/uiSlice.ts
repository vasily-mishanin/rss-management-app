import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn, ITask } from '../../models/types';

interface IUISlice {
  showNewSubjectModal: boolean;
  showUpdateBoardModal: boolean;
  showNewTaskModal: boolean;
  showUpdateTaskModal: boolean;
  showConfirmDeleteBoardModal: boolean;
  showConfirmDeleteColumnModal: boolean;
  showConfirmDeleteTaskModal: boolean;

  removingBoardId: string;
  updatingBoardId: string;

  removingColumnId: string;
  updatingColumnId: string;

  removingTaskId: string;
  updatingTaskId: string;

  updatingTask: ITask;
  updatingColumn: IColumn;
  updatingBoardTitle: string;
}

const initialTask = {
  _id: '',
  boardId: '',
  columnId: '',
  title: '',
  description: '',
  userId: '',
  order: 0,
  users: [''],
};

const initialColumn = { _id: '', boardId: '', title: '', order: 0 };

const initialState: IUISlice = {
  showNewSubjectModal: false,
  showUpdateBoardModal: false,
  showNewTaskModal: false,
  showUpdateTaskModal: false,
  showConfirmDeleteBoardModal: false,
  showConfirmDeleteColumnModal: false,
  showConfirmDeleteTaskModal: false,

  removingBoardId: '',
  updatingBoardId: '',

  removingColumnId: '',
  updatingColumnId: '',

  removingTaskId: '',
  updatingTaskId: '',

  updatingTask: initialTask,
  updatingColumn: initialColumn,
  updatingBoardTitle: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowNewSubjectModal: (state, action: PayloadAction<boolean>) => {
      state.showNewSubjectModal = action.payload;
    },
    setShowUpdateBoardModal: (state, action: PayloadAction<boolean>) => {
      state.showUpdateBoardModal = action.payload;
    },

    toggleShowNewTaskModal: (state, action: PayloadAction<boolean>) => {
      state.showNewTaskModal = action.payload;
    },

    toggleShowUpdateTaskModal: (state, action: PayloadAction<boolean>) => {
      state.showUpdateTaskModal = action.payload;
    },

    toggleShowConfirmDeleteBoardModal: (state, action: PayloadAction<boolean>) => {
      state.showConfirmDeleteBoardModal = action.payload;
    },

    setShowConfirmDeleteColumnModal: (state, action: PayloadAction<boolean>) => {
      state.showConfirmDeleteColumnModal = action.payload;
    },

    setShowConfirmDeleteTaskModal: (state, action: PayloadAction<boolean>) => {
      state.showConfirmDeleteTaskModal = action.payload;
    },

    setRemovingBoardId: (state, action: PayloadAction<string>) => {
      state.removingBoardId = action.payload;
    },
    setUpdatingBoardId: (state, action: PayloadAction<string>) => {
      state.updatingBoardId = action.payload;
    },

    setUpdatingBoardTitle: (state, action: PayloadAction<string>) => {
      state.updatingBoardTitle = action.payload;
    },

    setRemovingColumnId: (state, action: PayloadAction<string>) => {
      state.removingColumnId = action.payload;
    },

    setUpdatingColumnId: (state, action: PayloadAction<string>) => {
      state.updatingColumnId = action.payload;
    },

    setRemovingTaskId: (state, action: PayloadAction<string>) => {
      state.removingTaskId = action.payload;
    },

    setUpdatingTaskId: (state, action: PayloadAction<string>) => {
      state.updatingTaskId = action.payload;
    },

    setUpdatingTask: (state, action: PayloadAction<ITask>) => {
      state.updatingTask = action.payload;
    },

    setUpdatingColumn: (state, action: PayloadAction<IColumn>) => {
      state.updatingColumn = action.payload;
    },

    resetUpdatingTask: (state) => {
      state.updatingTask = initialTask;
      state.updatingTaskId = '';
    },

    resetUpdatingColumn: (state) => {
      state.updatingColumn = initialColumn;
      state.updatingColumnId = '';
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
