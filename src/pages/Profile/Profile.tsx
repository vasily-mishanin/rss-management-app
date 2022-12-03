import ModalWindow from '../../components/ModalWindow/ModalWindow';
import classes from './Profile.module.scss';
import Confirmation from '../../components/Confirmation/Confirmation';
import { useEffect, useState } from 'react';
import { registerUserThunk, updateUserThunk } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../hooks/redux';
import { IUser } from '../../models/types';

function Profile() {
  const [dialog, setDialog] = useState(true);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   console.log('Profile-useEffect');

  // }, []);

  const handleConfirm = () => {
    console.log('handleConfirm');

    const user: IUser = {
      name: 'Crab',
      login: 'crab',
      password: '12345678',
      _id: '638788495d1b3867fda4b866',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODc4ODQ5NWQxYjM4NjdmZGE0Yjg2NiIsImxvZ2luIjoiYm9iYnkiLCJpYXQiOjE2NzAwODY4MzQsImV4cCI6MTY3MDEzMDAzNH0.W6V_oBnCEtXb5mmma96XvmHYc461DbnX1IRHr2MrPBs',
    };

    dispatch(updateUserThunk(user));
    setDialog(false);
  };

  const handleCancel = () => {
    setDialog(false);
  };

  return (
    <div className={classes.profile}>
      {dialog && (
        <ModalWindow>
          <Confirmation
            questionText='Are you sure you want to UPDATE this user?'
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </ModalWindow>
      )}
    </div>
  );
}

export default Profile;
