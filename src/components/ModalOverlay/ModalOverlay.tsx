import Card from '@mui/material/Card';
import classes from './ModalOverlay.module.scss';

type ModalProps = {
  children: React.ReactNode;
};

function ModalOverlay({ children }: ModalProps) {
  return (
    <Card className={classes.modal} variant='outlined'>
      {children}
    </Card>
  );
}

export default ModalOverlay;
