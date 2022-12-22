import ModalWindow from '../../components/ModalWindow/ModalWindow';
import classes from './BoardsPage.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import FormBoardColumn from '../../components/FormBoardColumn/FormBoardColumn';
import ListBoards from '../../components/ListBoards/ListBoards';
import { boardsApi } from '../../services/BoardsService';
import Confirmation from '../../components/Confirmation/Confirmation';
import { form_mode, form_subject } from '../../models/constants';
import { IBoard, INewBoard, FormDataTypes } from '../../models/types';
import { useTranslation, Trans } from 'react-i18next';

function BoardsPage() {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state.uiReducer);
  const authState = useAppSelector((state) => state.authReducer);
  const { data: boards } = boardsApi.useGetAllBoardsQuery('');
  const [addNewBoard, resultAddBoard] = boardsApi.useAddNewBoardMutation();
  const [updateBoard, resultUpdateBoard] = boardsApi.useUpdateBoardMutation();
  const [deleteBoardById, resultDeleteBoard] = boardsApi.useDeleteBoardByIdMutation();
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    dispatch(uiSliceActions.setShowNewSubjectModal(false));
    dispatch(uiSliceActions.toggleShowConfirmDeleteBoardModal(false));
    dispatch(uiSliceActions.setShowUpdateBoardModal(false));
    dispatch(uiSliceActions.setUpdatingBoardTitle(''));
  };

  const handleDeleteBoard = async () => {
    dispatch(uiSliceActions.toggleShowConfirmDeleteBoardModal(false));
    await deleteBoardById(uiState.removingBoardId);
  };

  function handleOnFormSubmit(data: FormDataTypes, mode: form_mode, subject: form_subject) {
    if (subject === form_subject.BOARD && mode === form_mode.ADD) {
      addNewBoard(data as INewBoard);
    }

    if (subject === form_subject.BOARD && mode === form_mode.UPDATE) {
      updateBoard(data as IBoard);
    }
  }

  return (
    <div className={classes.boardsPage}>
      {uiState.showNewSubjectModal && (
        <ModalWindow onClose={handleClose}>
          <FormBoardColumn
            mode={form_mode.ADD}
            subject={form_subject.BOARD}
            label='boardName'
            title={i18n.resolvedLanguage === 'ru' ? 'Название доски' : 'Board Title'}
            message={
              i18n.resolvedLanguage === 'ru'
                ? 'Введите название доски (3 и более букв)'
                : 'Enter board title  (3 and more letters)'
            }
            onClose={handleClose}
            onFormSubmit={handleOnFormSubmit}
          />
        </ModalWindow>
      )}

      {uiState.showConfirmDeleteBoardModal && (
        <ModalWindow onClose={handleClose}>
          <Confirmation
            questionText={
              i18n.resolvedLanguage === 'ru'
                ? 'Уверены, что хотите удаить эту доску'
                : 'Are you sure you want to remove this board?'
            }
            onConfirm={handleDeleteBoard}
            onCancel={handleClose}
          />
        </ModalWindow>
      )}

      {uiState.showUpdateBoardModal && (
        <ModalWindow onClose={handleClose}>
          <FormBoardColumn
            mode={form_mode.UPDATE}
            subject={form_subject.BOARD}
            label='boardName'
            title={i18n.resolvedLanguage === 'ru' ? 'Название новой доски' : 'New Board Title'}
            message={
              i18n.resolvedLanguage === 'ru'
                ? 'Введите название доски (3 и более букв)'
                : 'Enter new board title (3 and more)'
            }
            onClose={handleClose}
            onFormSubmit={handleOnFormSubmit}
            updatingBoardTitle={uiState.updatingBoardTitle || ''}
          />
        </ModalWindow>
      )}

      {authState.isLoggedIn && boards && <ListBoards boards={boards} />}

      {resultDeleteBoard.isLoading && <p className={classes.spinner}>Loading...</p>}
      {resultAddBoard.isLoading && <p className={classes.spinner}>Loading...</p>}
      {resultUpdateBoard.isLoading && <p className={classes.spinner}>Loading...</p>}
    </div>
  );
}

export default BoardsPage;
