import classes from './ColumnCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { IColumn } from '../../models/types';

function ColumnCard({ column }: { column: IColumn }) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }} className={classes.column}>
      <CardContent className={classes.content}>
        <Typography sx={{ fontSize: '1rem' }} color='text.secondary' gutterBottom>
          {column.title}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <Button size='small' color='error'>
          DELETE
        </Button>
        <Button size='small'>OPEN</Button>
      </CardActions>
    </Card>
  );
}

export default ColumnCard;
