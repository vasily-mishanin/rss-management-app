import classes from './FormBoardColumn.module.scss';
import InputBoards from '../InputBoards/InputBoards';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createBoardThunk } from '../../store/reducers/boardsSlice';
import { INewBoard } from '../../models/types';
import { boardsSliceActions } from '../../store/reducers/boardsSlice';
import { useEffect } from 'react';
import type { INewColumnProps } from '../../models/types';
import { createColumnThunk } from '../../store/reducers/boardsSlice';
import { INewTask } from '../../models/types';

type Inputs = {
  boardName?: string;
  columnName?: string;
  taskName?: string;
};

export interface IFormProps {
  onClose: () => void;
  label: string;
  title: string;
  message: string;
  columnId?: string;
  description?: string;
}

function FormBoardColumn({ onClose, label, title, message, columnId, description }: IFormProps) {
  const { register, handleSubmit, formState, reset } = useForm<Inputs>();
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(boardsSliceActions.clearError());
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (inputsData) => {
    if (label === 'boardName') {
      const newBoard: INewBoard = {
        title: inputsData.boardName || '',
        owner: authState.user._id,
        users: [authState.user._id],
        token: authState.token,
      };

      dispatch(createBoardThunk(newBoard));

      onClose();
      navigate('/');
    }

    if (label === 'columnName') {
      if (params.boardId) {
        const createColumnData: INewColumnProps = {
          boardId: params.boardId,
          token: authState.token,
          newColumn: { title: inputsData.columnName || 'no name', order: 0 },
        };
        dispatch(createColumnThunk(createColumnData));

        onClose();
      }
    }

    if (formState.isSubmitSuccessful) {
      reset();
    }
  };

  const error = () => {
    if (label === 'boardName') {
      return formState.errors.boardName;
    }
    if (label === 'columnName') {
      return formState.errors.columnName;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputBoards
        type='text'
        label={label}
        title={title}
        register={register}
        required
        patternValue={/[A-Za-z0-9 ]{3,}/}
        error={error() || null}
        message={message}
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

export default FormBoardColumn;
