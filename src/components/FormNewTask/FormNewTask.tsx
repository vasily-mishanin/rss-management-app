import classes from './FormNewTask.module.scss';
import InputBoards from '../InputBoards/InputBoards';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { boardsSliceActions } from '../../store/reducers/boardsSlice';
import { useEffect } from 'react';
import { createTaskThunk } from '../../store/reducers/boardsSlice';
import { INewTask } from '../../models/types';

type Inputs = {
  taskName?: string;
  taskDescription?: string;
};

export interface IFormProps {
  onClose: () => void;
  columnId?: string;
}

function FormNewTask({ onClose, columnId }: IFormProps) {
  const { register, handleSubmit, formState, reset } = useForm<Inputs>();
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(boardsSliceActions.clearError());
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (inputsData) => {
    if (params.boardId) {
      const createTaskData: INewTask = {
        boardId: params.boardId,
        columnId: columnId || '',
        token: authState.token,
        newTask: {
          title: inputsData.taskName || 'no name',
          order: 0,
          description: inputsData.taskDescription || 'no description',
          userId: 0,
          users: [authState.user.name],
        },
      };
      dispatch(createTaskThunk(createTaskData));
      onClose();
    }

    if (formState.isSubmitSuccessful) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputBoards
        type='text'
        label='taskName'
        title='New Task Title'
        register={register}
        required
        patternValue={/[A-Za-z0-9 ]{3,}/}
        error={formState.errors.taskName || null}
        message='Enter task title in latin letters (3 or more)'
      />

      <InputBoards
        type='text'
        label='taskDescription'
        title='Description'
        register={register}
        required
        patternValue={/[A-Za-z0-9 ]{3,}/}
        error={formState.errors.taskDescription || null}
        message='Enter description in latin letters (3 or more)'
      />

      <div className={classes.actions}>
        {authState.isLoading ? (
          <p className={classes.authSpinner}>Loading ...</p>
        ) : (
          <div className={classes.actionButtons}>
            <Button variant='contained' className={classes.closeBtn} onClick={onClose}>
              Cancel
            </Button>

            <Button
              type='submit'
              variant='contained'
              className={classes.addBtn}
              disabled={!formState.isDirty}
            >
              Add
            </Button>
          </div>
        )}
      </div>
      {authState.error?.message && <p className={classes.registrationError}>{authState.error?.message}</p>}
    </form>
  );
}

export default FormNewTask;
