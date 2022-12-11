import classes from './FormProfile.module.scss';
import Input from '../Input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateUserThunk } from '../../store/reducers/authSlice';
import { IUser } from '../../models/types';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  name?: string;
  login: string;
  password: string;
};

function FormProfile() {
  const { register, handleSubmit, formState, reset } = useForm<Inputs>();
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (inputsData) => {
    const user: IUser = {
      login: inputsData.login || authState.user.login,
      password: inputsData.password || authState.user.password,
      name: inputsData.name || authState.user.name,
      _id: authState.user._id,
      token: authState.token,
    };

    dispatch(updateUserThunk(user));
    if (formState.isSubmitSuccessful) {
      reset();
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.profileForm}>
      <Input
        type='text'
        label='name'
        title='New Name'
        register={register}
        required
        patternValue={/^[A-Za-z0-9]$/}
        error={formState.errors.name ? formState.errors.name : null}
        message='Enter name in latin letters or digits'
      ></Input>

      <Input
        type='text'
        label='login'
        title='New Login'
        register={register}
        required
        patternValue={/[A-Za-z0-9]/}
        error={formState.errors.login ? formState.errors.login : null}
        message='Enter login in latin letters or digits'
      ></Input>

      <Input
        type='password'
        label='password'
        title='New Password'
        register={register}
        required
        patternValue={/[A-Za-z0-9]{8,}/}
        error={formState.errors.password ? formState.errors.password : null}
        message='Password should consist of at least 8 latin letters or digits'
      ></Input>
      <div className={classes.actions}>
        {authState.isLoading ? (
          <p className={classes.authSpinner}>Loading ...</p>
        ) : (
          <Button type='submit' variant='contained' className={classes.authBtn} disabled={!formState.isDirty}>
            Submit Changes
          </Button>
        )}
      </div>
      {authState.error?.message && <p className={classes.registrationError}>{authState.error?.message}</p>}
    </form>
  );
}

export default FormProfile;
