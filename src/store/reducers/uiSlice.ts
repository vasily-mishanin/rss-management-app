import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  showNewBoardModal: false,
  showNewTaskModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNewBoardModal: (state, action: PayloadAction<boolean>) => {
      state.showNewBoardModal = action.payload;
    },
    toggleNewTaskModal: (state, action: PayloadAction<boolean>) => {
      state.showNewTaskModal = action.payload;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
