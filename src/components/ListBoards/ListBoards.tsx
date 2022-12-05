import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { IBoard } from '../../models/types';
import classes from './ListBoards.module.scss';

function ListBoards({ boards }: { boards: IBoard[] }) {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <ul className={classes.list}>
      {boards.map((board) => (
        <li>{board.title}</li>
      ))}
    </ul>
  );
}

export default ListBoards;
