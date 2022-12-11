import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classes from './BoardPage.module.scss';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import FormBoardColumn from '../../components/FormBoardColumn/FormBoardColumn';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import ListColumns from '../../components/ListColumns/ListColumns';
import { form_mode, form_subject } from '../../models/constants';
import { FormDataTypes, INewColumn } from '../../models/types';
import { columnsApi } from '../../services/ColumnService';
import Confirmation from '../../components/Confirmation/Confirmation';
import { boardsApi } from '../../services/BoardsService';
import FormNewTask from '../../components/FormNewTask/FormNewTask';

function BoardPage() {
  const params = useParams<{ boardId: string }>();
  const dispatch = useAppDispatch();
  const uiSlice = useAppSelector((s) => s.uiReducer);

  const { data: currentBoard } = boardsApi.useGetBoardByIdQuery(params.boardId || '');

  //ReFETCH ALL COLUMNS
  const {
    data: fetchedColumns,
    error,
    isLoading,
    isFetching,
  } = columnsApi.useGetAllColumnsQuery(params.boardId || '');

  const [addNewColumn, resultAddNewColumn] = columnsApi.useAddNewColumnMutation();
  const [deleteColumn, resultDeleteColumn] = columnsApi.useDeleteColumnByIdMutation();

  const handleShowModal = () => {
    dispatch(uiSliceActions.setShowNewSubjectModal(true));
  };

  const handleClose = () => {
    dispatch(uiSliceActions.setShowNewSubjectModal(false));
    dispatch(uiSliceActions.setShowUpdateBoardModal(false));
    dispatch(uiSliceActions.setShowConfirmDeleteColumnModal(false));
    dispatch(uiSliceActions.toggleShowNewTaskModal(false));
  };

  function handleOnFormSubmit(data: FormDataTypes, mode: form_mode, subject: form_subject) {
    if (subject === form_subject.COLUMN && mode === form_mode.ADD) {
      console.log('COLUMN handleOnFormSubmit', { data });
      addNewColumn(data as INewColumn);
    }
  }

  const handleConfirmDeleteColumn = () => {
    if (params.boardId) {
      deleteColumn({ boardId: params.boardId, columnId: uiSlice.removingColumnId });
    }
    handleClose();
  };

  const handleAddNewTask = (data: FormDataTypes) => {
    console.log('handleAddNewTask', { data });
  };

  return (
    <div className={classes.board}>
      <h2>{currentBoard?.title}</h2>

      {uiSlice.showNewSubjectModal && (
        <ModalWindow onClose={handleClose}>
          <FormBoardColumn
            mode={form_mode.ADD}
            subject={form_subject.COLUMN}
            label='columnName'
            title='New Column Title'
            message='Enter column title in latin letters (3 or more)'
            description={undefined}
            onClose={handleClose}
            onFormSubmit={handleOnFormSubmit}
          />
        </ModalWindow>
      )}

      {uiSlice.showConfirmDeleteColumnModal && (
        <ModalWindow onClose={handleClose}>
          <Confirmation
            questionText='Are you sure you want to delete this column?'
            onCancel={handleClose}
            onConfirm={handleConfirmDeleteColumn}
          />
        </ModalWindow>
      )}

      {uiSlice.showNewTaskModal && (
        <ModalWindow onClose={handleClose}>
          <FormNewTask
            onClose={handleClose}
            onFormSubmit={handleAddNewTask}
            mode={form_mode.ADD}
            subject={form_subject.TASK}
          />
        </ModalWindow>
      )}

      {uiSlice.showUpdateTaskModal && (
        <ModalWindow onClose={handleClose}>
          <FormNewTask
            onClose={handleClose}
            onFormSubmit={handleAddNewTask}
            mode={form_mode.UPDATE}
            subject={form_subject.TASK}
          />
        </ModalWindow>
      )}

      <div className={classes.columns}>
        {fetchedColumns && <ListColumns columns={fetchedColumns} />}

        <Button className={classes.addBtn} variant='contained' color='success' onClick={handleShowModal}>
          ADD NEW COLUMN
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}
      {resultDeleteColumn.isLoading && <p>Deleting Column...</p>}
      {resultAddNewColumn.isLoading && <p>Adding Column...</p>}
    </div>
  );
}

export default BoardPage;
