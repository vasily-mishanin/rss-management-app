import { IColumn } from '../../models/types';
import ColumnCard from '../ColumnCard/ColumnCard';
import classes from './ListColumns.module.scss';
import ItemTypes from '../../models/ItemTypes';
import { useEffect, useState } from 'react';

type TColumnsList = {
  columns: IColumn[];
  updateColumns: (updatedColumn: IColumn[]) => void;
};

function ListColumns({ columns, updateColumns }: TColumnsList) {
  const [currentColumns, setCurrentColumns] = useState<IColumn[]>(columns);
  //console.log('currentColumns', currentColumns);

  useEffect(() => {
    //console.log('useEffect');
    setCurrentColumns(columns);
  }, [columns]);

  return (
    <ul className={classes.list}>
      {currentColumns &&
        currentColumns.map((column, i) => (
          <li key={column._id}>
            <ColumnCard column={column} index={i} />
          </li>
        ))}
    </ul>
  );
}

export default ListColumns;
