import classes from './ColumnCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import type { IColumn } from '../../models/types';

import ModalWindow from '../ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormColumnEdit from '../FormColumnEdit/FormColumnEdit';
import ListTasks from '../ListTasks/ListTasks';
import { tasksApi } from '../../services/TaskService';

function ColumnCard({ column }: { column: IColumn }) {
  const [formMode, setFormMode] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((s) => s.authReducer);
  const uiSlice = useAppSelector((s) => s.uiReducer);
  const params = useParams();

  const {
    data: tasks,
    isLoading,
    isFetching,
    error,
  } = tasksApi.useGetAllTasksInColumnQuery({ boardId: params.boardId || '', columnId: column._id });

  const onAddTask = () => {
    dispatch(uiSliceActions.toggleShowNewTaskModal(true));
    dispatch(uiSliceActions.setUpdatingColumnId(column._id));
  };

  const handleDeleteColumn = () => {
    dispatch(uiSliceActions.setRemovingColumnId(column._id));
    dispatch(uiSliceActions.setShowConfirmDeleteColumnModal(true));
  };

  const handleEditColumn = () => {
    ('handleEditColumn');
    dispatch(uiSliceActions.setUpdatingColumnId(column._id));
    if (params.boardId) {
      dispatch(uiSliceActions.setUpdatingBoardId(params.boardId));
    }
    setFormMode(true);
  };

  const handleFromClose = () => {
    setFormMode(false);
  };

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

        <hr />

        {formMode && <FormColumnEdit onClose={handleFromClose} fieldValue={column.title} />}

        {tasks && <ListTasks tasks={tasks} />}
      </CardContent>

      <CardActions className={classes.actions}>
        <Button size='small' color='error' onClick={handleDeleteColumn}>
          DELETE
        </Button>

        <Button size='small' onClick={onAddTask}>
          ADD NEW TASK
        </Button>
      </CardActions>
    </Card>
  );
}

export default ColumnCard;
