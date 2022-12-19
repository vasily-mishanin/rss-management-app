import classes from './TaskCard.module.scss';
import React, { useRef } from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Card } from '@mui/material';
import DragIcon from '@mui/icons-material/DragIndicatorSharp';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useDispatch } from 'react-redux';
import { ITask } from '../../models/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface ITaskCardProps {
  task: ITask;
  id: string;
}

function TaskCard({ task }: ITaskCardProps) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task._id,
    data: {
      type: 'task',
      task: task,
    },
  });

  const showDeleteTaskModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(uiSliceActions.setShowConfirmDeleteTaskModal(true));
    dispatch(uiSliceActions.setRemovingTaskId(task._id));
  };

  const handleTaskClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(uiSliceActions.toggleShowUpdateTaskModal(true));
    dispatch(uiSliceActions.setUpdatingTaskId(task._id));
    dispatch(uiSliceActions.setUpdatingColumnId(task.columnId));
    dispatch(uiSliceActions.setUpdatingTask(task));
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      disablePadding
      className={classes.listitem}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
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
          onClick={showDeleteTaskModal}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Card>
    </ListItem>
  );
}

export default TaskCard;
