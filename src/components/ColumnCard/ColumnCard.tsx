import classes from './ColumnCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { IColumn } from '../../models/types';

import ModalWindow from '../ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useParams } from 'react-router-dom';
import { getAllTasksThunk } from '../../store/reducers/boardsSlice';
import { useEffect, useState } from 'react';
import FormColumnEdit from '../FormColumnEdit/FormColumnEdit';

function ColumnCard({ column }: { column: IColumn }) {
  const [formMode, setFromMode] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((s) => s.authReducer);
  const uiSlice = useAppSelector((s) => s.uiReducer);
  const boardsState = useAppSelector((s) => s.boardsReducer);
  const params = useParams();

  //FETCH ALL TASKS
  useEffect(() => {
    if (params.boardId && authState.isLoggedIn) {
      const reqData = { token: authState.token, boardId: params.boardId, columnId: column._id };
      dispatch(getAllTasksThunk(reqData));
    }
  }, [authState, dispatch, params.boardId]);

  const onAddTask = () => {
    dispatch(uiSliceActions.toggleShowNewTaskModal(true));
    dispatch(uiSliceActions.setUpdatingColumnId(column._id));
  };

  const handleDeleteColumn = () => {
    dispatch(uiSliceActions.setRemovingColumnId(column._id));
    dispatch(uiSliceActions.setShowConfirmDeleteColumnModal(true));
  };

  const handleEditColumn = () => {
    console.log('handleEditColumn');
    dispatch(uiSliceActions.setUpdatingColumnId(column._id));
    if (params.boardId) {
      dispatch(uiSliceActions.setUpdatingBoardId(params.boardId));
    }
    setFromMode(true);
  };

  const handleFromClose = () => {
    setFromMode(false);
  };

  const tasks = boardsState.tasks.filter((task) => task.columnId === column._id);

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

        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <hr />
            </li>
          ))}
        </ul>
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
