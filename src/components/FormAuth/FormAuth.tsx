import classes from './FormAuth.module.scss';
import Input from '../../components/Input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useEffect } from 'react';
import { authSliceActions, registerUserThunk, signInUserThunk } from '../../store/reducers/authSlice';
import { IUser } from '../../models/types';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { VALIDATE_login_REGEXPR, VALIDATE_passport_REGEXPR } from '../../models/constants';
import { useTranslation, Trans } from 'react-i18next';

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
  const { t, i18n } = useTranslation();

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

  const buttonName =
    mode === 'REGISTER'
      ? i18n.resolvedLanguage === 'ru'
        ? 'Зарегистрироваться'
        : 'SignUp'
      : i18n.resolvedLanguage === 'ru'
      ? 'Войти'
      : 'SignIn';

  const registrationErrorMessage =
    mode === 'REGISTER'
      ? i18n.resolvedLanguage === 'ru'
        ? 'Логин уже существует'
        : 'Login already exist'
      : i18n.resolvedLanguage === 'ru'
      ? 'Неправильный логин или пароль'
      : 'Invalid login or password';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.authForm}>
      {mode === 'REGISTER' && (
        <Input
          type='text'
          label='name'
          title={i18n.resolvedLanguage === 'ru' ? 'Имя' : 'Name'}
          register={register}
          required
          patternValue={/[A-Za-z0-9]/}
          error={formState.errors.name ? formState.errors.name : null}
          message={
            i18n.resolvedLanguage === 'ru'
              ? 'Введите имя латинскими буквами и/или цифрами'
              : 'Enter name in latin letters or digits'
          }
        ></Input>
      )}
      <Input
        type='text'
        title={i18n.resolvedLanguage === 'ru' ? 'Логин' : 'Login'}
        label='login'
        register={register}
        required
        patternValue={VALIDATE_login_REGEXPR}
        error={formState.errors.login ? formState.errors.login : null}
        message={
          i18n.resolvedLanguage === 'ru'
            ? 'Введите логин из 3-х и более латинских букв/цифр'
            : 'Enter login in 3 or more "A-Za-z!@#$%^&*():0-9- " symbols '
        }
      ></Input>
      <Input
        type='password'
        title={i18n.resolvedLanguage === 'ru' ? 'Пароль' : 'Password'}
        label='password'
        register={register}
        required
        patternValue={VALIDATE_passport_REGEXPR}
        error={formState.errors.password ? formState.errors.password : null}
        message={
          i18n.resolvedLanguage === 'ru'
            ? 'Введите пароль из 8-ми и более символов "A-Za-z!@#$%^&*():0-9- "'
            : 'Enter password in 8 or more "A-Za-z!@#$%^&*():0-9- " symbols'
        }
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
