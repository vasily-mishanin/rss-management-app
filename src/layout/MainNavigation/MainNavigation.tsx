import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import classes from './MainNavigation.module.scss';
import Logo from '../../assets/logo.png';

const MainNavigation = () => {
  return (
    <div className={classes.navigation}>
      <Link to='welcome' className={classes.logo}>
        <img src={Logo} alt='GirAff app logo' />
        <span>GirAff</span>
      </Link>
      <Navigation />
    </div>
  );
};

export default MainNavigation;
