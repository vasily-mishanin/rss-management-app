import classes from './ColumnCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import type { IColumn, ITask } from '../../models/types';
import { useAppDispatch } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormColumnEdit from '../FormColumnEdit/FormColumnEdit';
import ListTasks from '../ListTasks/ListTasks';
import { CircularProgress } from '@mui/material';
import TaskCard from '../TaskCard/TaskCard';
import { Draggable } from 'react-beautiful-dnd';
import { columnsApi } from '../../services/ColumnService';
import { useTranslation, Trans } from 'react-i18next';

export interface IColumnCardProps {
  column: IColumn;
  tasks: ITask[];
  index: number;
}

function ColumnCard({ column, index, tasks }: IColumnCardProps) {
  const [formMode, setFormMode] = useState(false);
  const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks);
  const [currentTitle, setCurrentTitle] = useState<string>(column.title);

  const { t, i18n } = useTranslation();

  const [updateColumn, resultUpdateColumn] = columnsApi.useUpdateColumnMutation();

  useEffect(() => {
    setCurrentTasks(tasks);
    setCurrentTitle(column.title);
  }, [tasks, column]);

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
    setFormMode(true);
  };

  const handleFormClose = () => {
    setFormMode(false);
  };

  const handleEditColumnSubmit = (title: string) => {
    setCurrentTitle(title);
    const newColumn: IColumn = {
      ...column,
      title: title,
    };
    updateColumn(newColumn);
  };

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
                    {currentTitle}
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

              {formMode && (
                <FormColumnEdit
                  onClose={handleFormClose}
                  fieldValue={currentTitle}
                  onSubmit={handleEditColumnSubmit}
                />
              )}

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
                <Trans i18nKey='delete'>DELETE</Trans>
              </Button>

              {resultUpdateColumn.isLoading && <CircularProgress size='1rem' />}

              <Button size='small' onClick={onAddTask}>
                <Trans i18nKey='addNewTask'>ADD NEW TASK</Trans>
              </Button>
            </CardActions>
          </Card>
        </li>
      )}
    </Draggable>
  );
}

export default ColumnCard;
