import classes from './FormBoardColumn.module.scss';
import InputBoards from '../InputBoards/InputBoards';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createBoardThunk } from '../../store/reducers/boardsSlice';
import { INewBoard } from '../../models/types';
import { boardsSliceActions } from '../../store/reducers/boardsSlice';
import { useEffect } from 'react';

type Inputs = {
  boardName: string;
};

export interface IFormProps {
  onClose: () => void;
}

function FormBoardColumn({ onClose }: IFormProps) {
  const { register, handleSubmit, formState, reset } = useForm<Inputs>();
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //console.log('FormProfile', authState);

  useEffect(() => {
    dispatch(boardsSliceActions.clearError());
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (inputsData) => {
    console.log('SubmitHandler - inputsData:', inputsData);

    const newBoard: INewBoard = {
      title: inputsData.boardName,
      owner: authState.user._id,
      users: [authState.user._id],
      token: authState.token,
    };

    dispatch(createBoardThunk(newBoard));

    if (formState.isSubmitSuccessful) {
      reset();
    }
    navigate('/');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputBoards
        type='text'
        label='boardName'
        title='New Board Name'
        register={register}
        required
        patternValue={/[A-Za-z0-9]{3,}/}
        error={formState.errors.boardName ? formState.errors.boardName : null}
        message='Enter board name in latin letters (3 and more)'
      ></InputBoards>

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
