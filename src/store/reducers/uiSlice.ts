import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  showNewSubjectModal: false,
  showUpdateBoardModal: false,
  showNewTaskModal: false,
  showUpdateTaskModal: false,
  showConfirmDeleteBoardModal: false,
  showConfirmDeleteColumnModal: false,

  removingBoardId: '',
  updatingBoardId: '',

  removingColumnId: '',
  updatingColumnId: '',

  removingTaskId: '',
  updatingTaskId: '',
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

    setRemovingBoardId: (state, action: PayloadAction<string>) => {
      state.removingBoardId = action.payload;
    },
    setUpdatingBoardId: (state, action: PayloadAction<string>) => {
      state.updatingBoardId = action.payload;
    },

    setRemovingColumnId: (state, action: PayloadAction<string>) => {
      state.removingColumnId = action.payload;
    },

    setUpdatingColumnId: (state, action: PayloadAction<string>) => {
      state.updatingColumnId = action.payload;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
