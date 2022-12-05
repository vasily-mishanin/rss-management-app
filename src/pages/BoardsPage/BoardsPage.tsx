import ModalWindow from '../../components/ModalWindow/ModalWindow';
import classes from './BoardsPage.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import FormBoardColumn from '../../components/FormBoardColumn/FormBoardColumn';
import ListBoards from '../../components/ListBoards/ListBoards';

function BoardsPage() {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state.uiReducer);
  const boardsState = useAppSelector((state) => state.boardsReducer);

  console.log(boardsState);

  const handleClose = () => {
    dispatch(uiSliceActions.toggleNewBoardModal());
  };

  return (
    <div className={classes.boardsPage}>
      {uiState.showNewBoardModal && (
        <ModalWindow onClose={handleClose}>
          <FormBoardColumn onClose={handleClose} />
        </ModalWindow>
      )}
      <ListBoards boards={boardsState.boards} />
    </div>
  );
}

export default BoardsPage;
