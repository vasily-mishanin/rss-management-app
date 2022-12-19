import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classes from './BoardPage.module.scss';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import FormBoardColumn from '../../components/FormBoardColumn/FormBoardColumn';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import ListColumns from '../../components/ListColumns/ListColumns';
import { form_mode, form_subject } from '../../models/constants';
import { FormDataTypes, IColumn, INewColumn, INewTask, ITask, IUpdatedColumn } from '../../models/types';
import { columnsApi } from '../../services/ColumnService';
import Confirmation from '../../components/Confirmation/Confirmation';
import { boardsApi } from '../../services/BoardsService';
import FormNewTask from '../../components/FormNewTask/FormNewTask';
import { tasksApi } from '../../services/TaskService';
import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core';

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

  const [addNewTask, resultAddNewTask] = tasksApi.useAddNewTaskMutation();
  const [deleteTask, resultDeleteTask] = tasksApi.useDeleteTaskByIdMutation();
  const [updateTask, resultUpdateTask] = tasksApi.useUpdateTaskMutation();
  const [updateColumns, resultUpdateColumns] = columnsApi.useUpdateSetOfColumnsMutation();

  const handleUpdateColumnsinDatabase = (updatedColumns: IColumn[]) => {
    const dataForApi: IUpdatedColumn[] = updatedColumns.map((column, index) => ({
      _id: column._id,
      order: index,
    }));
    console.log('handleUpdateColumnsinDatabase', dataForApi);

    updateColumns(dataForApi);
  };

  const handleShowModal = () => {
    dispatch(uiSliceActions.setShowNewSubjectModal(true));
  };

  const handleClose = () => {
    dispatch(uiSliceActions.setShowNewSubjectModal(false));
    dispatch(uiSliceActions.setShowUpdateBoardModal(false));
    dispatch(uiSliceActions.setShowConfirmDeleteColumnModal(false));
    dispatch(uiSliceActions.toggleShowNewTaskModal(false));
    dispatch(uiSliceActions.setShowConfirmDeleteTaskModal(false));
    dispatch(uiSliceActions.toggleShowUpdateTaskModal(false));
  };

  function handleOnFormSubmit(data: FormDataTypes, mode: form_mode, subject: form_subject) {
    if (subject === form_subject.COLUMN && mode === form_mode.ADD) {
      addNewColumn(data as INewColumn);
    }
  }

  const handleConfirmDeleteColumn = () => {
    if (params.boardId) {
      deleteColumn({ boardId: params.boardId, columnId: uiSlice.removingColumnId });
    }
    handleClose();
  };

  const handleConfirmDeleteTask = () => {
    if (params.boardId) {
      deleteTask({ boardId: params.boardId, columnId: params.boardId, taskId: uiSlice.removingTaskId });
    }
    handleClose();
  };

  const handleAddNewTask = (data: FormDataTypes) => {
    addNewTask(data as INewTask);
  };

  const handleUpdateTask = (data: FormDataTypes) => {
    updateTask(data as ITask);
  };

  // const handleDragOver = (event: DragOverEvent) => {
  //   console.log('---------------------handleDragOver');
  //   const { active, over } = event;

  //   if (
  //     over &&
  //     over.data.current &&
  //     active.data.current &&
  //     over.data.current.accepts.includes(active.data.current.type)
  //   ) {
  //     // do stuff
  //     console.log('-------// do stuff--------------handleDragOver');
  //   }
  // };

  console.log('fetchedColumns', fetchedColumns);

  return (
    <div className={classes.board}>
      <div className={classes.navigation}>
        <Link to='/'>Boards/</Link>
        <span>{currentBoard?.title}</span>
      </div>

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
            onFormSubmit={handleUpdateTask}
            mode={form_mode.UPDATE}
            subject={form_subject.TASK}
          />
        </ModalWindow>
      )}

      {uiSlice.showConfirmDeleteTaskModal && (
        <ModalWindow onClose={handleClose}>
          <Confirmation
            questionText='Are you sure you want to delete this task?'
            onCancel={handleClose}
            onConfirm={handleConfirmDeleteTask}
          />
        </ModalWindow>
      )}

      <div className={classes.columns}>
        {fetchedColumns && (
          <ListColumns
            columns={sortColumns(fetchedColumns)}
            updateColumnsOnDatabase={handleUpdateColumnsinDatabase}
          />
        )}

        <Button className={classes.addBtn} variant='contained' color='success' onClick={handleShowModal}>
          ADD NEW COLUMN
        </Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {resultDeleteColumn.isLoading && <p>Deleting Column...</p>}
      {resultAddNewColumn.isLoading && <p>Adding Column...</p>}
      {resultDeleteTask.isLoading && <p>Deleting Task...</p>}
      {resultAddNewTask.isLoading && <p>Adding Task...</p>}
      {resultUpdateTask.isLoading && <p>Updating Task...</p>}
      {resultUpdateColumns.isLoading && <p>Updating Columns...</p>}
    </div>
  );
}

export default BoardPage;

const sortColumns = (columns: IColumn[]) => {
  if (columns.length > 0) {
    let sortedColumns = [...columns].sort((a, b) => a.order - b.order);
    // // if new columns with order=0 added
    // if (sortedColumns[1] && sortedColumns[1].order === 0) {
    //   sortedColumns[1] = { ...sortedColumns[1], order: sortedColumns.length - 1 };
    // }
    // sortedColumns = sortedColumns.sort((a, b) => a.order - b.order);
    console.log('sortColumns', sortedColumns);

    return sortedColumns;
  }
  return [];
};
