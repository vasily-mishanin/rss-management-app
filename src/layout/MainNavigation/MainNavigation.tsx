import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import classes from './MainNavigation.module.scss';
import AppLogo from '../../components/AppLogo/AppLogo';
import { useAppSelector } from '../../hooks/redux';
import LangSwitcher from '../../components/LangSwitcher/LangSwitcher';

const MainNavigation = () => {
  const authSlice = useAppSelector((state) => state.authReducer);
  return (
    <div className={classes.navigation}>
      <Link to='welcome'>
        <AppLogo text='GirAff' />
      </Link>
      <div className={classes.actions}>
        <Navigation />
        <LangSwitcher />
      </div>
    </div>
  );
};

export default MainNavigation;
