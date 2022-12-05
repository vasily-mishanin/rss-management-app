import ModalWindow from '../../components/ModalWindow/ModalWindow';
import classes from './BoardsPage.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import FormBoardColumn from '../../components/FormBoardColumn/FormBoardColumn';
import ListBoards from '../../components/ListBoards/ListBoards';
import { getAllBoardsThunk } from '../../store/reducers/boardsSlice';
import { useEffect } from 'react';

function BoardsPage() {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state.uiReducer);
  const boardsState = useAppSelector((state) => state.boardsReducer);
  const authState = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(getAllBoardsThunk(authState.token));
    }
  }, [authState, dispatch]);

  const handleClose = () => {
    dispatch(uiSliceActions.toggleNewBoardModal(false));
  };

  return (
    <div className={classes.boardsPage}>
      {uiState.showNewBoardModal && (
        <ModalWindow onClose={handleClose}>
          <FormBoardColumn
            onClose={handleClose}
            label='boardName'
            title='New Board Name'
            message='Enter board name in latin letters (3 and more)'
          />
        </ModalWindow>
      )}
      {authState.isLoggedIn && <ListBoards boards={boardsState.boards} />}
    </div>
  );
}

export default BoardsPage;
