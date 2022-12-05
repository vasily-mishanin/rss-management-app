import classes from './BoardCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

type TBoard = {
  title: string;
  description?: string;
  boardId: string;
};

function BoardCard({ title, description, boardId }: TBoard) {
  const navigate = useNavigate();

  const handleOpenBoard = () => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }} className={classes.board} onClick={handleOpenBoard}>
      <CardContent className={classes.content}>
        <Typography sx={{ fontSize: '1.5rem' }} color='text.secondary' gutterBottom>
          {title}
        </Typography>
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size='small' color='error'>
          DELETE
        </Button>
        <Button size='small' onClick={handleOpenBoard}>
          OPEN
        </Button>
      </CardActions>
    </Card>
  );
}

export default BoardCard;
