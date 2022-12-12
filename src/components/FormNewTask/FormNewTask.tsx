import classes from './FormNewTask.module.scss';
import InputBoards from '../InputBoards/InputBoards';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FormDataTypes, INewTask, ITask } from '../../models/types';
import {
  form_mode,
  form_subject,
  VALIDATE_description_REGEXPR,
  VALIDATE_name_REGEXPR,
} from '../../models/constants';
import { tasksApi } from '../../services/TaskService';

type Inputs = {
  taskName?: string;
  taskDescription?: string;
};

export interface IFormProps {
  onClose: () => void;
  onFormSubmit: (data: FormDataTypes) => void;
  columnId?: string;
  mode: form_mode;
  subject: form_subject;
}

function FormNewTask({ columnId, onClose, onFormSubmit, mode, subject }: IFormProps) {
  const { register, handleSubmit, formState, reset } = useForm<Inputs>();
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const uiSlice = useAppSelector((state) => state.uiReducer);

  const onSubmit: SubmitHandler<Inputs> = (inputsData) => {
    //const [currentTask, setCurrentTask] = useState<ITask>({});

    if (params.boardId) {
      const taskData: INewTask | ITask = {
        boardId: params.boardId,
        columnId: uiSlice.updatingColumnId,
        title: inputsData.taskName || 'no name',
        order: 0,
        description: inputsData.taskDescription || 'no description',
        userId: '0',
        users: [authState.user._id],
        ...(mode === form_mode.UPDATE && { _id: uiSlice.updatingTaskId }),
      };
      onFormSubmit(taskData);
      onClose();
    }

    if (formState.isSubmitSuccessful) {
      reset();
    }
  };

  // to fill form inputs with current data
  let currentTask: ITask | null = null;

  if (mode === form_mode.UPDATE && subject === form_subject.TASK) {
    const boardId = params.boardId;
    const columnId = uiSlice.updatingColumnId;
    const taskId = uiSlice.updatingTaskId;
    if (boardId && columnId && taskId) {
      const { data } = tasksApi.useGetTaskByIdQuery({ boardId, columnId, taskId });
      if (data) {
        currentTask = data;
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputBoards
        type='text'
        label='taskName'
        title='Task Title'
        register={register}
        required
        patternValue={VALIDATE_name_REGEXPR}
        error={formState.errors.taskName || null}
        message='Enter task title (3 or more characters)'
        defaultValue={currentTask ? currentTask.title : undefined}
      />

      <InputBoards
        type='text'
        label='taskDescription'
        title='Description'
        register={register}
        required
        patternValue={VALIDATE_description_REGEXPR}
        error={formState.errors.taskDescription || null}
        message='Enter description (5 or more characters)'
        variant='textarea'
        defaultValue={currentTask ? currentTask.description : undefined}
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
              {mode === form_mode.UPDATE ? 'Update' : 'Add'}
            </Button>
          </div>
        )}
      </div>
      {authState.error?.message && <p className={classes.registrationError}>{authState.error?.message}</p>}
    </form>
  );
}

export default FormNewTask;
