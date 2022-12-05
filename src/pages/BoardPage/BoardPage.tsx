import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllColumnsThunk } from '../../store/reducers/boardsSlice';
import classes from './BoardPage.module.scss';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import FormBoardColumn from '../../components/FormBoardColumn/FormBoardColumn';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import ListColumns from '../../components/ListColumns/ListColumns';
import { useEffect } from 'react';

function BoardPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((s) => s.authReducer);
  const uiState = useAppSelector((s) => s.uiReducer);
  const boardsState = useAppSelector((s) => s.boardsReducer);
  const currentBoard = boardsState.boards.find((board) => board._id === params.boardId);
  console.log(params);

  //FETCH ALL COLUMNS
  useEffect(() => {
    if (params.boardId && authState.isLoggedIn) {
      console.log('useEffect');
      const reqData = { token: authState.token, boardId: params.boardId };
      dispatch(getAllColumnsThunk(reqData));
    }
  }, [authState, dispatch, params.boardId]);

  const handleAddColumn = () => {
    dispatch(uiSliceActions.toggleNewBoardModal());
  };

  const handleClose = () => {
    dispatch(uiSliceActions.toggleNewBoardModal());
  };

  return (
    <div className={classes.board}>
      <h2>{currentBoard?.title}</h2>

      {uiState.showNewBoardModal && (
        <ModalWindow onClose={handleClose}>
          <FormBoardColumn
            onClose={handleClose}
            label='columnName'
            title='New Column Title'
            message='Enter column title in latin letters (3 or more)'
          />
        </ModalWindow>
      )}

      <div className={classes.columns}>
        <ListColumns columns={boardsState.columns} />
        <Button className={classes.addBtn} variant='contained' color='success' onClick={handleAddColumn}>
          ADD NEW COLUMN
        </Button>
      </div>
    </div>
  );
}

export default BoardPage;
