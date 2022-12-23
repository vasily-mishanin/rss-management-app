import classes from './AuthPage.module.scss';
import FormAuth from '../../components/FormAuth/FormAuth';
import type { AuthFormProps } from '../../components/FormAuth/FormAuth';

function AuthPage({ mode }: AuthFormProps) {
  return (
    <div className={classes.authPage}>
      <FormAuth mode={mode} />
    </div>
  );
}

export default AuthPage;
