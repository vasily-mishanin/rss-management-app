import classes from './ColumnCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DragIcon from '@mui/icons-material/DragIndicatorSharp';
import type { IColumn, ITask, IUpdatedTask } from '../../models/types';
import { useAppDispatch } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import FormColumnEdit from '../FormColumnEdit/FormColumnEdit';
import ListTasks from '../ListTasks/ListTasks';
import { CircularProgress } from '@mui/material';
import TaskCard from '../TaskCard/TaskCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export interface IColumnCardProps {
  column: IColumn;
  tasks: ITask[];
  index: number;
}

function ColumnCard({ column, index, tasks }: IColumnCardProps) {
  const [formMode, setFormMode] = useState(false);
  const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setCurrentTasks(tasks);
  }, [tasks]);

  const dispatch = useAppDispatch();
  const params = useParams();

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

  //const sortedTasks = sortTasks(currentTasks);

  return (
    <Draggable draggableId={column._id} index={index} key={column._id}>
      {(provided) => (
        <li {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
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

              {currentTasks && (
                <ListTasks columnId={column._id}>
                  {currentTasks.map((task, index) => (
                    <TaskCard task={task} key={task._id} index={index} />
                  ))}
                </ListTasks>
              )}
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
        </li>
      )}
    </Draggable>
  );
}

export default ColumnCard;
