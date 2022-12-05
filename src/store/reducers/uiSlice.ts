import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNewBoardModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNewBoardModal: (state) => {
      state.showNewBoardModal = !state.showNewBoardModal;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
