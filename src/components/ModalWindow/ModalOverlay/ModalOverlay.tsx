import Card from '@mui/material/Card';
import classes from './ModalOverlay.module.scss';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function ModalOverlay({ children, onClose }: ModalProps) {
  return (
    <Card className={classes.modal} variant='outlined'>
      <IconButton className={classes.closeBtn} color='primary' component='label' onClick={onClose}>
        <CloseIcon />
      </IconButton>
      {children}
    </Card>
  );
}

export default ModalOverlay;
