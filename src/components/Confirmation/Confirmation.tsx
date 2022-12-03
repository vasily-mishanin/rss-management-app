import classes from './Confirmation.module.scss';
import Button from '@mui/material/Button';

type ConfirmationProps = {
  questionText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function Confirmation({ questionText, onConfirm, onCancel }: ConfirmationProps) {
  const confirmHandler = () => {
    onConfirm();
  };

  const cancelHandler = () => {
    onCancel();
  };

  return (
    <div className={classes.confirmation}>
      <h4>{questionText}</h4>
      <div className={classes.actions}>
        <Button variant='outlined' onClick={confirmHandler}>
          Yes
        </Button>
        <Button variant='outlined' onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default Confirmation;
