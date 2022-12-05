import classes from './ColumnCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { IColumn } from '../../models/types';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import FormNewTask from '../FormNewTask/FormNewTask';
import { useParams } from 'react-router-dom';
import { getAllTasksThunk } from '../../store/reducers/boardsSlice';
import { useEffect } from 'react';

function ColumnCard({ column }: { column: IColumn }) {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((s) => s.authReducer);
  const uiState = useAppSelector((s) => s.uiReducer);
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
    dispatch(uiSliceActions.toggleNewTaskModal(true));
  };

  const handleClose = () => {
    dispatch(uiSliceActions.toggleNewTaskModal(false));
  };

  const tasks = boardsState.tasks.filter((task) => task.columnId === column._id);

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }} className={classes.column}>
      <CardContent className={classes.content}>
        <Typography sx={{ fontSize: '1rem' }} color='text.secondary' gutterBottom>
          {column.title}
        </Typography>
      </CardContent>

      {tasks.map((task) => (
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <hr />
        </div>
      ))}

      <CardActions className={classes.actions}>
        <Button size='small' color='error'>
          DELETE
        </Button>
        <Button size='small' onClick={onAddTask}>
          ADD NEW TASK
        </Button>
      </CardActions>

      {uiState.showNewTaskModal && (
        <ModalWindow onClose={handleClose}>
          <FormNewTask onClose={handleClose} columnId={column._id} />
        </ModalWindow>
      )}
    </Card>
  );
}

export default ColumnCard;
