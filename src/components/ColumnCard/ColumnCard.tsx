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
import { useRef, useState } from 'react';
import FormColumnEdit from '../FormColumnEdit/FormColumnEdit';
import ListTasks from '../ListTasks/ListTasks';
import { tasksApi } from '../../services/TaskService';
import { CircularProgress } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import ItemTypes from '../../models/ItemTypes';

export interface IColumnCardProps {
  column: IColumn;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  column: IColumn;
  type: string;
}

function ColumnCard({ column, index, moveColumn }: IColumnCardProps) {
  const [formMode, setFormMode] = useState(false);

  const dispatch = useAppDispatch();
  const params = useParams();

  const { data: fetchedTasks } = tasksApi.useGetAllTasksInColumnQuery({
    boardId: params.boardId || '',
    columnId: column._id,
  });

  const [updateSetOfTasks, resultUpdateSetOfTasks] = tasksApi.useUpdateSetOfTasksMutation();

  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.COLUMN,
    item: () => ({ column, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ handlerId, isOver }, dropRef] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null; isOver: boolean }
  >({
    accept: ItemTypes.COLUMN,
    drop: (item, monitor) => {
      console.log(item);
    },
    collect: (monitor) => ({ handlerId: monitor.getHandlerId(), isOver: !!monitor.isOver() }),
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      let dragIndex = item.index; // which is moving
      let hoverIndex = index; // over wich card

      console.log('item', item, hoverIndex);

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get HORIZONTAL middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the left
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging left, only move when the cursor is left 50%
      // When dragging right, only move when the cursor is right 50%

      // Dragging right
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging left
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      //alert(`Now moveColumn dragIndex ${dragIndex}, hoverIndex ${hoverIndex}`);
      moveColumn(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // item.index = hoverIndex;
      // hoverIndex = item.index;
      [item.index, hoverIndex] = [hoverIndex, item.index];
    },
  });

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

  const handleUpdateTasks = (updatedTasks: ITask[]) => {
    const tasksDataForApi: IUpdatedTask[] = updatedTasks.map((task) => ({
      _id: task._id,
      order: task.order,
      columnId: task.columnId,
    }));

    updateSetOfTasks(tasksDataForApi);
  };

  dragRef(dropRef(ref));

  return (
    <Card
      ref={ref}
      className={classes.column}
      style={isOver ? { boxShadow: '0 6px 10px 3px rgba(3, 3, 3, 0.2)' } : {}}
    >
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

        {fetchedTasks && <ListTasks tasks={fetchedTasks} updateTasks={handleUpdateTasks} />}
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
