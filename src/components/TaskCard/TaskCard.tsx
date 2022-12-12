import classes from './TaskCard.module.scss';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Card } from '@mui/material';
import DragIcon from '@mui/icons-material/DragIndicatorSharp';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useDispatch } from 'react-redux';
import { ITask } from '../../models/types';

export interface ITaskCardProps {
  task: ITask;
}

function TaskCard({ task }: ITaskCardProps) {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(uiSliceActions.setShowConfirmDeleteTaskModal(true));
    dispatch(uiSliceActions.setRemovingTaskId(task._id));
  };

  const handleTaskClick = () => {
    dispatch(uiSliceActions.toggleShowUpdateTaskModal(true));
    dispatch(uiSliceActions.setUpdatingTaskId(task._id));
    dispatch(uiSliceActions.setUpdatingColumnId(task.columnId));
  };

  return (
    <Card className={classes.taskcard} onClick={handleTaskClick}>
      <ListItemIcon className={classes.listicon}>
        <DragIcon fontSize='small' />
      </ListItemIcon>

      <ListItemText primary={task.title} />

      <IconButton
        className={classes.closeicon}
        color='secondary'
        size='small'
        aria-label='close edit form'
        onClick={onClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </Card>
  );
}

export default TaskCard;
