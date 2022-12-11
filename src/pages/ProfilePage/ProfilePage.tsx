import ModalWindow from '../../components/ModalWindow/ModalWindow';
import classes from './ProfilePage.module.scss';
import Confirmation from '../../components/Confirmation/Confirmation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import FormProfile from '../../components/FormProfile/FormProfile';
import { useNavigate } from 'react-router-dom';
import { Button, Snackbar } from '@mui/material';
import * as api_users from '../../api/api_users';
import { authSliceActions } from '../../store/reducers/authSlice';
import { uiSliceActions } from '../../store/reducers/uiSlice';

function ProfilePage() {
  const [dialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigate('/');
    }
  }, [authState.isLoggedIn, navigate]);

  const handleConfirmConfirmation = async () => {
    // DELETE USER
    const deletedUser = await api_users.deleteUser(authState.user._id, authState.token);
    if (deletedUser._id === authState.user._id) {
      showSnackBar();
    }

    setDialog(false);
  };

  const handleCancelConfirmation = () => {
    setDialog(false);
  };

  const handleCloseModal = () => {
    dispatch(uiSliceActions.setShowNewSubjectModal(false));
  };

  const closeSnackbar = () => {
    setOpen(false);
    dispatch(authSliceActions.signOut());
    navigate('/');
  };

  const showSnackBar = () => {
    setOpen(true);
  };

  return (
    <div className={classes.profilePage}>
      {dialog && (
        <ModalWindow onClose={handleCloseModal}>
          <Confirmation
            questionText='Are you sure you want to delete this user?'
            onConfirm={handleConfirmConfirmation}
            onCancel={handleCancelConfirmation}
          />
        </ModalWindow>
      )}

      <h3 className={classes.title}>Here you can change your profile data</h3>

      <FormProfile />

      <Button onClick={() => setDialog(true)} variant='outlined' color='warning' size='small'>
        Delete Current User
      </Button>

      <Snackbar
        className={classes.snackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={closeSnackbar}
        message='User was successfully deleted'
      ></Snackbar>
    </div>
  );
}

export default ProfilePage;
