import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classes from './Navigation.module.scss';
import { authSliceActions } from '../../store/reducers/authSlice';

function Navigation() {
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    console.log('handleSignOut');
    dispatch(authSliceActions.signOut());
    navigate('/');
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? classes.active__link : classes.navigation__link;
  return (
    <ul className={classes.navigation__list}>
      {authState.isLoggedIn && (
        <>
          <li>
            <NavLink className={linkStyle} to='new-board'>
              Create new board
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyle} to='profile'>
              Edit profile
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyle} to='/'>
              Go to Main Page
            </NavLink>
          </li>

          <li>
            <button className={classes.signOutBtn} onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </>
      )}
      {!authState.isLoggedIn && (
        <>
          <li className={classes.navigation__item}>
            <NavLink
              //className={({ isActive }) => (isActive ? classes.active__link : classes.navigation__link)}
              className={linkStyle}
              to='login'
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyle} to='register'>
              Sign Up
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
