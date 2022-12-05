import classes from './FormAuth.module.scss';
import Input from '../../components/Input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useEffect } from 'react';
import { authSliceActions, registerUserThunk, signInUserThunk } from '../../store/reducers/authSlice';
import { IUser } from '../../models/types';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

type Inputs = {
  name?: string;
  login: string;
  password: string;
};

export type AuthFormProps = {
  mode: 'LOGIN' | 'REGISTER';
};

function FormAuth({ mode }: AuthFormProps) {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authSliceActions.clearError());

    if (authState.isLoggedIn) {
      navigate('/');
    }

    if (!authState.isLoggedIn && authState.user._id) {
      // auto login
      const user = {
        name: authState.user.name,
        login: authState.user.login,
        password: authState.user.password,
        _id: authState.user._id,
      };
      dispatch(signInUserThunk(user));
    }
  }, [authState.isLoggedIn, authState.user._id, mode]);

  const onSubmit: SubmitHandler<Inputs> = (inputsData) => {
    let user: IUser;
    if (mode === 'REGISTER') {
      user = {
        login: inputsData.login,
        password: inputsData.password,
        name: inputsData.name || '',
        _id: '',
      };
      dispatch(registerUserThunk(user));
    }
    if (mode === 'LOGIN') {
      user = {
        login: inputsData.login,
        password: inputsData.password,
        name: inputsData.name || '',
        _id: '',
      };
      dispatch(signInUserThunk(user));
    }
  };

  const buttonName = mode === 'REGISTER' ? 'SignUp' : 'SignIn';
  const registrationErrorMessage = mode === 'REGISTER' ? 'Login already exist' : 'Invalid login or password';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.authForm}>
      {mode === 'REGISTER' && (
        <Input
          type='text'
          label='Name'
          register={register}
          required
          patternValue={/[A-Za-z0-9]/}
          error={formState.errors.name ? formState.errors.name : null}
          message='Enter name in latin letters or digits'
        ></Input>
      )}
      <Input
        type='text'
        label='Login'
        register={register}
        required
        patternValue={/[A-Za-z0-9]/}
        error={formState.errors.login ? formState.errors.login : null}
        message='Enter login in latin letters or digits'
      ></Input>
      <Input
        type='password'
        label='Password'
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
            {buttonName}
          </Button>
        )}
      </div>
      {authState.error?.message && <p className={classes.registrationError}>{registrationErrorMessage}</p>}
    </form>
  );
}

export default FormAuth;
