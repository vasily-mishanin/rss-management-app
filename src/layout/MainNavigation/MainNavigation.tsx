import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import classes from './MainNavigation.module.scss';
import AppLogo from '../../components/AppLogo/AppLogo';
import { useAppSelector } from '../../hooks/redux';

const MainNavigation = () => {
  const authSlice = useAppSelector((state) => state.authReducer);
  return (
    <div className={classes.navigation}>
      <Link to='welcome'>
        <AppLogo text='GirAff' />
      </Link>
      <p className={classes.greeting}>Hi, {authSlice.user.login}</p>
      <Navigation />
    </div>
  );
};

export default MainNavigation;
