import ModalWindow from '../../components/ModalWindow/ModalWindow';
import classes from './Profile.module.scss';
import Confirmation from '../../components/Confirmation/Confirmation';
import { useState } from 'react';

function Profile() {
  const [dialog, setDialog] = useState(false);
  return (
    <div className={classes.profile}>
      {dialog && (
        <ModalWindow>
          <Confirmation
            questionText='Are you sure you want to delete this user?'
            onConfirm={() => {}}
            onCancel={() => {}}
          />
        </ModalWindow>
      )}
    </div>
  );
}

export default Profile;
