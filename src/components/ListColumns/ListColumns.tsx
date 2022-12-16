import { IColumn } from '../../models/types';
import ColumnCard from '../ColumnCard/ColumnCard';
import classes from './ListColumns.module.scss';
import { useDrop } from 'react-dnd';
import ItemTypes from '../../models/ItemTypes';
import { useCallback, useEffect, useState } from 'react';
import update from 'immutability-helper';

type TColumnsList = {
  columns: IColumn[];
  updateColumns: (updatedColumn: IColumn[]) => void;
};

function ListColumns({ columns, updateColumns }: TColumnsList) {
  const [currentColumns, setCurrentColumns] = useState<IColumn[]>(columns);
  console.log('currentColumns', currentColumns);

  useEffect(() => {
    console.log('useEffect');
    setCurrentColumns(columns);
  }, [columns]);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    drop: (item, monitor) => {
      console.log('useDrop-ListColumns', item);
      updateColumns(currentColumns);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveColumnInsideBoard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCurrentColumns((prevColumns: IColumn[]) => {
      console.log('moveColumnInsideBoard', 'dragIndex', dragIndex, 'hoverIndex', hoverIndex);

      const newColumns = [
        ...update(prevColumns, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevColumns[dragIndex] as IColumn],
          ],
        }),
      ];

      const updatedColumns = newColumns.map((column, index) => {
        const newTask = { ...column, order: index };
        return newTask;
      });

      console.log('updatedColumns', updatedColumns);
      return updatedColumns;
    });
  }, []);

  const renderColumn = useCallback((column: IColumn, index: number) => {
    return <ColumnCard column={column} index={index} moveColumn={moveColumnInsideBoard} />;
  }, []);

  return (
    <ul
      ref={drop}
      className={classes.list}
      style={isOver ? { boxShadow: '0 2px 10px 1px rgba(3, 3, 3, 0.2)' } : {}}
    >
      {currentColumns &&
        currentColumns.map((column, i) => (
          <li key={column._id}>
            {renderColumn(column, i)}
            {/* <ColumnCard column={column} index={i} moveColumn={moveColumnInsideBoard} /> */}
          </li>
        ))}
    </ul>
  );
}

export default ListColumns;
