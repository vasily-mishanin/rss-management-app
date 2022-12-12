import classes from './BoardCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { IBoard } from '../../models/types';
import { boardsApi } from '../../services/BoardsService';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { uiSliceActions } from '../../store/reducers/uiSlice';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function BoardCard({ title, _id }: Pick<IBoard, 'title' | '_id'>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const uiSlice = useAppSelector((state) => state.uiReducer);

  const handleOpenBoard = () => {
    navigate(`/boards/${_id}`);
  };

  const handleDeleteBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(uiSliceActions.toggleShowConfirmDeleteBoardModal(true));
    dispatch(uiSliceActions.setRemovingBoardId(_id));
  };

  const handleUpdateBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(uiSliceActions.setShowUpdateBoardModal(true));
    dispatch(uiSliceActions.setUpdatingBoardId(_id));
  };

  return (
    <Card className={classes.board} sx={{ minWidth: 275, maxWidth: 300 }} onClick={handleOpenBoard}>
      <IconButton
        className={classes.editBtn}
        aria-label='delete'
        color='primary'
        onClick={(e) => {
          handleUpdateBoard(e);
        }}
      >
        <EditIcon />
      </IconButton>

      <CardContent className={classes.content}>
        <Typography className={classes.title} sx={{ fontSize: '1.5rem' }} color='text.secondary' gutterBottom>
          {title}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <IconButton
          aria-label='delete'
          color='error'
          onClick={(e) => {
            handleDeleteBoard(e);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default BoardCard;
