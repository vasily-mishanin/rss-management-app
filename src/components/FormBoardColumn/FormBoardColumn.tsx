import classes from './FormBoardColumn.module.scss';
import InputBoards from '../InputBoards/InputBoards';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import type { IColumn, FormDataTypes } from '../../models/types';
import { form_mode, form_subject, VALIDATE_name_REGEXPR } from '../../models/constants';
import { useTranslation, Trans } from 'react-i18next';

type Inputs = {
  boardName?: string;
  columnName?: string;
  taskName?: string;
};

export interface IFormProps {
  onClose: () => void;
  onFormSubmit: (value: FormDataTypes, mode: form_mode, subjec: form_subject) => void;
  label: string;
  title: string;
  message: string;
  columnId?: string;
  description?: string;
  mode: form_mode;
  subject: form_subject;
  updatingBoardTitle?: string;
}

function FormBoardColumn({
  onClose,
  onFormSubmit,
  label,
  title,
  message,
  columnId,
  description,
  mode,
  subject,
  updatingBoardTitle,
}: IFormProps) {
  const { register, handleSubmit, formState, reset } = useForm<Inputs>();
  const authState = useAppSelector((state) => state.authReducer);
  const uiState = useAppSelector((state) => state.uiReducer);
  const navigate = useNavigate();
  const params = useParams();
  const { t, i18n } = useTranslation();

  const onSubmit: SubmitHandler<Inputs> = (inputsData) => {
    if (subject === form_subject.BOARD) {
      const updatedBoard = {
        title: inputsData.boardName || '',
        owner: authState.user._id,
        users: [authState.user._id],
        ...(mode === form_mode.UPDATE && { _id: uiState.updatingBoardId }),
      };

      onClose();
      onFormSubmit(updatedBoard, mode, subject);

      navigate('/');
    }

    if (subject === form_subject.COLUMN) {
      if (params.boardId) {
        const createColumnData: Omit<IColumn, '_id'> = {
          boardId: params.boardId,
          title: inputsData.columnName || 'no name',
          order: 0,
        };
        onClose();
        onFormSubmit(createColumnData, mode, subject);
      }
    }

    if (formState.isSubmitSuccessful) {
      reset();
    }
  };

  const error = () => {
    if (subject === form_subject.BOARD) {
      return formState.errors.boardName;
    }
    if (subject === form_subject.COLUMN) {
      return formState.errors.columnName;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {mode === form_mode.ADD && subject === form_subject.BOARD && (
        <h4 className={classes.title}>
          <Trans i18nKey='addNewBoard'>Add new board</Trans>
        </h4>
      )}
      {mode === form_mode.UPDATE && subject === form_subject.BOARD && (
        <h4 className={classes.title}>
          <Trans i18nKey='updateBoard'>Update this board</Trans>
        </h4>
      )}

      {mode === form_mode.ADD && subject === form_subject.COLUMN && (
        <h4 className={classes.title}>
          <Trans i18nKey='addNewColumn'>Add new column</Trans>
        </h4>
      )}
      {mode === form_mode.UPDATE && subject === form_subject.COLUMN && (
        <h4 className={classes.title}>
          <Trans i18nKey='updateColumn'>Update this column</Trans>
        </h4>
      )}

      <InputBoards
        type='text'
        label={label}
        title={title}
        register={register}
        required
        patternValue={VALIDATE_name_REGEXPR}
        error={error() || null}
        message={message}
        defaultValue={updatingBoardTitle}
      />

      <div className={classes.actions}>
        {authState.isLoading ? (
          <p className={classes.authSpinner}>Loading ...</p>
        ) : (
          <div className={classes.actionButtons}>
            <Button variant='contained' className={classes.closeBtn} onClick={onClose}>
              <Trans i18nKey='cancel'>Cancel</Trans>
            </Button>

            <Button
              type='submit'
              variant='contained'
              className={classes.addBtn}
              disabled={!formState.isDirty}
            >
              {mode === form_mode.ADD && (i18n.resolvedLanguage === 'ru' ? 'Добавить' : 'Add')}
              {mode === form_mode.UPDATE && (i18n.resolvedLanguage === 'ru' ? 'Обновить' : 'Update')}
            </Button>
          </div>
        )}
      </div>
      {authState.error?.message && <p className={classes.registrationError}>{authState.error?.message}</p>}
    </form>
  );
}

export default FormBoardColumn;
