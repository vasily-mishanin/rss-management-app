import { IColumn } from '../../models/types';
import ColumnCard from '../ColumnCard/ColumnCard';
import classes from './ListColumns.module.scss';

type TColumnsList = {
  columns: IColumn[];
};

function ListColumns({ columns }: TColumnsList) {
  return (
    <ul className={classes.list}>
      {columns.map((column) => (
        <li key={column._id}>
          <ColumnCard column={column} />
        </li>
      ))}
    </ul>
  );
}

export default ListColumns;
