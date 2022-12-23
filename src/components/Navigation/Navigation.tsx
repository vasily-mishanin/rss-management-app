import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classes from './Navigation.module.scss';
import { authSliceActions } from '../../store/reducers/authSlice';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import { useTranslation, Trans } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function Navigation() {
  const authState = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuClosed, setMenuClosed] = useState(true);
  const { t, i18n } = useTranslation();

  const handleSignOut = () => {
    setMenuClosed(true);
    dispatch(authSliceActions.signOut());
    navigate('/');
  };

  const handleNewBoard = () => {
    setMenuClosed(true);
    navigate('/');
    dispatch(uiSliceActions.setShowNewSubjectModal(true));
  };

  const toggleMenuHandler = () => {
    setMenuClosed((prev) => !prev);
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? classes.active__link : classes.navigation__link;

  const menuListStyle = menuClosed
    ? `${classes['navigation__list_mobile']}`
    : `${classes['navigation__list_mobile']} ${classes['moveMenu']}`;

  return (
    <div className={classes.navigation}>
      {
        <div className={classes.menuBtn}>
          <IconButton aria-label='delete' onClick={toggleMenuHandler}>
            {menuClosed && <MenuIcon fontSize='large' style={{ color: 'white' }} />}
            {!menuClosed && <CloseIcon fontSize='large' style={{ color: 'white' }} />}
          </IconButton>
        </div>
      }

      {/* //////////////// Mobile */}

      <ul className={menuListStyle}>
        {authState.isLoggedIn && (
          <>
            <li className={classes.navigation__item_mobile}>
              <button className={classes.newBoardBtn_mobile} onClick={handleNewBoard}>
                <Trans i18nKey='create'>Create New Board</Trans>
              </button>
            </li>

            <li className={classes.navigation__item_mobile}>
              <NavLink className={linkStyle} to='/' onClick={() => setMenuClosed(true)}>
                <Trans i18nKey='boards'> All Boards</Trans>
              </NavLink>
            </li>

            <li className={classes.navigation__item_mobile}>
              <NavLink className={linkStyle} to='profile' onClick={() => setMenuClosed(true)}>
                <b style={{ color: 'salmon' }}>{authState.user.name || authState.user.login}</b>
              </NavLink>
            </li>

            <li className={classes.navigation__item_mobile}>
              <button className={classes.signOutBtn_mobile} onClick={handleSignOut}>
                <Trans i18nKey='signout'>Sign Out</Trans>
              </button>
            </li>
          </>
        )}
        {!authState.isLoggedIn && (
          <>
            <li className={classes.navigation__item_mobile}>
              <NavLink className={linkStyle} to='login'>
                <Trans i18nKey='signin'>Sign In</Trans>
              </NavLink>
            </li>
            <li className={classes.navigation__item_mobile}>
              <NavLink className={linkStyle} to='register'>
                <Trans i18nKey='signup'>Sign Up</Trans>
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* ////////// Desktop */}
      <ul className={classes.navigation__list}>
        {authState.isLoggedIn && (
          <>
            <li className={classes.navigation__item}>
              <button className={classes.newBoardBtn} onClick={handleNewBoard}>
                <Trans i18nKey='create'>Create New Board</Trans>
              </button>
            </li>

            <li className={classes.navigation__item}>
              <NavLink className={linkStyle} to='/'>
                <Trans i18nKey='boards'> All Boards</Trans>
              </NavLink>
            </li>

            <li className={classes.navigation__item}>
              <NavLink className={linkStyle} to='profile'>
                <b style={{ color: 'salmon' }}>{authState.user.name || authState.user.login}</b>
              </NavLink>
            </li>

            <li className={classes.navigation__item}>
              <button className={classes.signOutBtn} onClick={handleSignOut}>
                <Trans i18nKey='signout'>Sign Out</Trans>
              </button>
            </li>
          </>
        )}
        {!authState.isLoggedIn && (
          <>
            <li className={classes.navigation__item}>
              <NavLink className={linkStyle} to='login'>
                <Trans i18nKey='signin'>Sign In</Trans>
              </NavLink>
            </li>
            <li className={classes.navigation__item}>
              <NavLink className={linkStyle} to='register'>
                <Trans i18nKey='signup'>Sign Up</Trans>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
