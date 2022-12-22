import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classes from './Navigation.module.scss';
import { authSliceActions } from '../../store/reducers/authSlice';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { Trans } from 'react-i18next';

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
    dispatch(uiSliceActions.setShowNewSubjectModal(true));
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? classes.active__link : classes.navigation__link;
  return (
    <ul className={classes.navigation__list}>
      {authState.isLoggedIn && (
        <>
          <li>
            <button className={classes.newBoardBtn} onClick={handleNewBoard}>
              <Trans i18nKey='create'>Create New Board</Trans>
            </button>
          </li>

          <li>
            <NavLink className={linkStyle} to='/'>
              <Trans i18nKey='boards'> All Boards</Trans>
            </NavLink>
          </li>

          <li>
            <NavLink className={linkStyle} to='profile'>
              <b style={{ color: 'salmon' }}>{authState.user.name || authState.user.login}</b>
            </NavLink>
          </li>

          <li>
            <button className={classes.signOutBtn} onClick={handleSignOut}>
              <Trans i18nKey='signout'>Sign Out</Trans>
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
              <Trans i18nKey='signin'>Sign In</Trans>
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyle} to='register'>
              <Trans i18nKey='signup'>Sign Up</Trans>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
