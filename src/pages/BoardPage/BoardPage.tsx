import { Button, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classes from './BoardPage.module.scss';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import FormBoardColumn from '../../components/FormBoardColumn/FormBoardColumn';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import ListColumns from '../../components/ListColumns/ListColumns';
import { form_mode, form_subject } from '../../models/constants';
import {
  FormDataTypes,
  IColumn,
  IKanbanColumn,
  INewColumn,
  INewTask,
  ITask,
  IUpdatedColumn,
  IUpdatedTask,
} from '../../models/types';
import { columnsApi } from '../../services/ColumnService';
import Confirmation from '../../components/Confirmation/Confirmation';
import { boardsApi } from '../../services/BoardsService';
import FormNewTask from '../../components/FormNewTask/FormNewTask';
import { tasksApi } from '../../services/TaskService';
import { useCallback } from 'react';

function BoardPage() {
  const params = useParams<{ boardId: string }>();
  const dispatch = useAppDispatch();
  const uiSlice = useAppSelector((s) => s.uiReducer);

  const { data: currentBoard } = boardsApi.useGetBoardByIdQuery(params.boardId || '');

  //re FETCH ALL COLUMNS
  const {
    data: fetchedColumns,
    error,
    isLoading,
    isFetching,
  } = columnsApi.useGetAllColumnsQuery(params.boardId || '');

  // re Fetch ALL TASKS
  const { data: fetchedTasks } = tasksApi.useGetAllTasksInBoardQuery({ boardId: params.boardId || '' });

  // create Kanban
  let kanbanColumns: IKanbanColumn[] = [];
  if (fetchedColumns && fetchedTasks) {
    kanbanColumns = createKanbanColumns(fetchedColumns, fetchedTasks);
  }

  console.log('KANBAN Columns', kanbanColumns);

  const [addNewColumn, resultAddNewColumn] = columnsApi.useAddNewColumnMutation();
  const [deleteColumn, resultDeleteColumn] = columnsApi.useDeleteColumnByIdMutation();

  const [addNewTask, resultAddNewTask] = tasksApi.useAddNewTaskMutation();
  const [deleteTask, resultDeleteTask] = tasksApi.useDeleteTaskByIdMutation();
  const [updateTask, resultUpdateTask] = tasksApi.useUpdateTaskMutation();
  const [updateColumns, resultUpdateColumns] = columnsApi.useUpdateSetOfColumnsMutation();
  const [updateSetOfTasks, resultUpdateSetOfTasks] = tasksApi.useUpdateSetOfTasksMutation();

  const handleUpdateColumnsinDatabase = (updatedColumns: IColumn[]) => {
    const dataForApi: IUpdatedColumn[] = updatedColumns.map((column, index) => ({
      _id: column._id,
      order: index,
    }));

    console.log('handleUpdateColumnsinDatabase', dataForApi);
    updateColumns(dataForApi);
  };

  const handleUpdateTasksOnDatabase = (updatedTasks: ITask[]) => {
    const tasksDataForApi: IUpdatedTask[] = updatedTasks.map((task, index) => ({
      _id: task._id,
      order: index,
      columnId: task.columnId,
    }));

    updateSetOfTasks(tasksDataForApi);
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
        {kanbanColumns && (
          <ListColumns
            columns={kanbanColumns}
            updateColumnsOnDatabase={handleUpdateColumnsinDatabase}
            updateTasksOnDatabase={handleUpdateTasksOnDatabase}
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
      {resultUpdateSetOfTasks.isLoading && <CircularProgress size='1rem' />}
    </div>
  );
}

export default BoardPage;

//////////

const sortColumns = (columns: IColumn[]) => {
  if (columns.length > 0) {
    let sortedColumns = [...columns].sort((a, b) => a.order - b.order);
    return sortedColumns;
  }
  return [];
};

function mapTasksColumn(columnId: string, allTasks: ITask[]) {
  return allTasks.filter((t) => t.columnId === columnId);
}

function sortTasksByOrder(tasks: ITask[] | undefined) {
  if (tasks && tasks.length > 0) {
    let sortedTasks = [...tasks].sort((a, b) => a.order - b.order);
    //console.log('sortedTasks', sortedTasks)
    if (sortedTasks[1] && sortedTasks[1].order === 0) {
      sortedTasks[1] = { ...sortedTasks[1], order: 100 };
    }
    sortedTasks = sortedTasks.sort((a, b) => a.order - b.order);
    return sortedTasks;
  }
  return [];
}

function createKanbanColumns(columns: IColumn[], tasks: ITask[]) {
  const sortedColumns = sortColumns(columns);
  const kanbanColumns = sortedColumns.map((column) => {
    const columnsTasks = mapTasksColumn(column._id, tasks);
    const newKanbanColumn: IKanbanColumn = {
      column: column,
      tasks: sortTasksByOrder(columnsTasks),
    };
    return newKanbanColumn;
  });
  return kanbanColumns;
}
