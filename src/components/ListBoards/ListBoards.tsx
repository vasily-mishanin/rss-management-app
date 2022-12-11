import { IBoard } from '../../models/types';
import BoardCard from '../BoardCard/BoardCard';
import classes from './ListBoards.module.scss';

function ListBoards({ boards }: { boards: IBoard[] }) {
  return (
    <ul className={classes.list}>
      {boards.map((board) => (
        <li key={board._id}>
          <BoardCard title={board.title} _id={board._id} />
        </li>
      ))}
    </ul>
  );
}

export default ListBoards;
