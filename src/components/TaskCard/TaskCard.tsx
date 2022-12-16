import classes from './TaskCard.module.scss';
import React, { useRef } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';

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
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from '../../models/ItemTypes';

export interface ITaskCardProps {
  task: ITask;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  task: ITask;
  type: string;
}

function TaskCard({ task, index, moveTask }: ITaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: () => ({ task, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index; // which is moving
      const hoverIndex = index; // over wich card

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
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
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Card ref={ref} className={classes.taskcard} onClick={handleTaskClick} style={{ opacity }}>
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
  );
}

export default TaskCard;
