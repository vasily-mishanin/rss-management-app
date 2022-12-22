import classes from './TaskCard.module.scss';
import React from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Card } from '@mui/material';
import DragIcon from '@mui/icons-material/DragIndicatorSharp';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useDispatch } from 'react-redux';
import { ITask } from '../../models/types';
import { Draggable } from 'react-beautiful-dnd';
import ItemTypes from '../../models/ItemTypes';
//////

export interface ITaskCardProps {
  task: ITask;
  //id: string;
  index: number;
}

function TaskCard({ task, index }: ITaskCardProps) {
  const dispatch = useDispatch();

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

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => {
        return (
          <li
            //  disablePadding
            className={classes.listitem}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            key={task._id}
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
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Card>
          </li>
        );
      }}
    </Draggable>
  );
}

export default TaskCard;
