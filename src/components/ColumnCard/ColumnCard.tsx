import classes from './ColumnCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import type { IColumn, ITask, IUpdatedTask } from '../../models/types';
import { useAppDispatch } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import FormColumnEdit from '../FormColumnEdit/FormColumnEdit';
import ListTasks from '../ListTasks/ListTasks';
import { tasksApi } from '../../services/TaskService';
import { CircularProgress } from '@mui/material';

export interface IColumnCardProps {
  column: IColumn;
  index: number;
}

function ColumnCard({ column, index }: IColumnCardProps) {
  const [formMode, setFormMode] = useState(false);

  const dispatch = useAppDispatch();
  const params = useParams();

  const { data: fetchedTasks } = tasksApi.useGetAllTasksInColumnQuery({
    boardId: params.boardId || '',
    columnId: column._id,
  });

  const [updateSetOfTasks, resultUpdateSetOfTasks] = tasksApi.useUpdateSetOfTasksMutation();

  const onAddTask = () => {
    dispatch(uiSliceActions.toggleShowNewTaskModal(true));
    dispatch(uiSliceActions.setUpdatingColumnId(column._id));
  };

  const handleDeleteColumn = () => {
    dispatch(uiSliceActions.setRemovingColumnId(column._id));
    dispatch(uiSliceActions.setShowConfirmDeleteColumnModal(true));
  };

  const handleEditColumn = () => {
    dispatch(uiSliceActions.setUpdatingColumnId(column._id));
    dispatch(uiSliceActions.setUpdatingColumn(column));
    if (params.boardId) {
      dispatch(uiSliceActions.setUpdatingBoardId(params.boardId));
    }
    setFormMode(true);
  };

  const handleFromClose = () => {
    setFormMode(false);
  };

  const handleUpdateTasksOnDatabase = useCallback(
    (updatedTasks: ITask[]) => {
      const tasksDataForApi: IUpdatedTask[] = updatedTasks.map((task, index) => ({
        _id: task._id,
        order: index,
        columnId: task.columnId,
      }));

      console.log('handleUpdateTasksOnDatabase', tasksDataForApi);

      updateSetOfTasks(tasksDataForApi);
    },
    [updateSetOfTasks]
  );

  console.log('fetchedTasks', fetchedTasks);

  const sortedTasks = sortTasks(fetchedTasks);
  console.log('sortedTasks', sortedTasks);

  return (
    <Card className={classes.column}>
      <CardContent className={classes.content}>
        {!formMode && (
          <div className={classes.titlebox}>
            <Typography
              className={classes.title}
              sx={{ fontSize: '1rem' }}
              color='text.secondary'
              onClick={handleEditColumn}
            >
              {column.title}
            </Typography>

            <IconButton
              className={classes.editIcon}
              color='primary'
              size='small'
              aria-label='pending state icon'
              onClick={handleEditColumn}
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </div>
        )}

        {formMode && <FormColumnEdit onClose={handleFromClose} fieldValue={column.title} />}
        <hr />

        {sortedTasks && <ListTasks tasks={sortedTasks} updateTasksOnDatabase={handleUpdateTasksOnDatabase} />}
      </CardContent>

      <CardActions className={classes.actions}>
        <Button size='small' color='error' onClick={handleDeleteColumn}>
          DELETE
        </Button>

        {resultUpdateSetOfTasks.isLoading && <CircularProgress size='1rem' />}

        <Button size='small' onClick={onAddTask}>
          ADD NEW TASK
        </Button>
      </CardActions>
    </Card>
  );
}

export default ColumnCard;

function sortTasks(tasks: ITask[] | undefined) {
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
