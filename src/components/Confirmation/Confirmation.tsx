import classes from './Confirmation.module.scss';
import Button from '@mui/material/Button';
import { useTranslation, Trans } from 'react-i18next';

type ConfirmationProps = {
  questionText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function Confirmation({ questionText, onConfirm, onCancel }: ConfirmationProps) {
  const { t, i18n } = useTranslation();

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
        <Button variant='outlined' color='error' onClick={confirmHandler}>
          <Trans i18nKey='yes'>Yes</Trans>
        </Button>
        <Button variant='outlined' onClick={cancelHandler}>
          <Trans i18nKey='cancel'>Cancel</Trans>
        </Button>
      </div>
    </div>
  );
}

export default Confirmation;
