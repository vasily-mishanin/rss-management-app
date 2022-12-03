import classes from './FormAuth.module.scss';
import Input from '../../components/Input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useEffect } from 'react';
import { authSliceActions, registerUserThunk, signInUserThunk } from '../../store/reducers/authSlice';
import { IUser } from '../../models/types';
import { useNavigate } from 'react-router-dom';

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
  console.log('AuthPage', authState);

  useEffect(() => {
    console.log('AuthPage -> useEffect', authState.error);
    dispatch(authSliceActions.clearError());

    if (authState.isLoggedIn) {
      navigate('/');
    }

    if (authState.user._id) {
      // auto login
      dispatch(signInUserThunk({ login: authState.user.login, password: authState.user.password }));
    }
  }, [authState.isLoggedIn, authState.user._id, mode]);

  const onSubmit: SubmitHandler<Inputs> = (inputsData) => {
    console.log(inputsData);
    let user: IUser;
    if (mode === 'REGISTER') {
      user = {
        login: inputsData.login,
        password: inputsData.password,
        name: inputsData.name,
      };
      dispatch(registerUserThunk(user));
    }
    if (mode === 'LOGIN') {
      user = {
        login: inputsData.login,
        password: inputsData.password,
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
          <button className={classes.authBtn} disabled={!formState.isDirty}>
            {buttonName}
          </button>
        )}
      </div>
      {authState.error.message && <p className={classes.registrationError}>{registrationErrorMessage}</p>}
    </form>
  );
}

export default FormAuth;
