import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classes from './Navigation.module.scss';
import { authSliceActions } from '../../store/reducers/authSlice';
import { uiSliceActions } from '../../store/reducers/uiSlice';

function Navigation() {
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(authSliceActions.signOut());
    navigate('/');
  };

  const handleNewBoard = () => {
    navigate('/');
    dispatch(uiSliceActions.toggleNewBoardModal(true));
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? classes.active__link : classes.navigation__link;
  return (
    <ul className={classes.navigation__list}>
      {authState.isLoggedIn && (
        <>
          <li>
            <button className={classes.newBoardBtn} onClick={handleNewBoard}>
              Create New Board
            </button>
          </li>
          <li>
            <NavLink className={linkStyle} to='profile'>
              <b style={{ color: 'salmon' }}>{authState.user.name || authState.user.login}</b>
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
