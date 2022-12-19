import { IColumn } from '../../models/types';
import ColumnCard from '../ColumnCard/ColumnCard';
import classes from './ListColumns.module.scss';
import { useEffect, useState } from 'react';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import React from 'react';

type TColumnsList = {
  columns: IColumn[];
  updateColumnsOnDatabase: (updatedColumns: IColumn[]) => void;
};

function ListColumns({ columns, updateColumnsOnDatabase }: TColumnsList) {
  const [currentColumns, setCurrentColumns] = useState<IColumn[]>(columns);
  const [flag, setFlag] = useState(false);

  //console.log('currentColumns', currentColumns);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    //console.log('useEffect');
    setCurrentColumns(columns);
  }, [columns]);

  useEffect(() => {
    if (flag) {
      console.log('useEffect', flag);
      updateColumnsOnDatabase(currentColumns);
      setFlag(false);
    }
  }, [currentColumns, updateColumnsOnDatabase]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFlag(true);
      setCurrentColumns((currentColumns) => {
        const oldIndex = currentColumns.findIndex((column) => column._id === active.id);
        const newIndex = currentColumns.findIndex((column) => column._id === over.id);
        return arrayMove(currentColumns, oldIndex, newIndex);
      });
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log('---------------------handleDragOver', active, over);
    // if (
    //   over &&
    //   over.data.current &&
    //   active.data.current &&
    //   over.data.current.accepts.includes(active.data.current.type)
    // ) {
    //   // do stuff
    //   console.log('-------// do stuff--------------handleDragOver');
    // }
  };

  console.log('currentColumns', currentColumns);

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
      <ul className={classes.list}>
        <SortableContext
          items={currentColumns.map((column) => ({ id: column._id }))}
          strategy={horizontalListSortingStrategy}
        >
          {currentColumns &&
            currentColumns.map((column, i) => <ColumnCard column={column} index={i} key={column._id} />)}
        </SortableContext>
      </ul>
    </DndContext>
  );
}

function areEqual(prevProps: TColumnsList, nextProps: TColumnsList) {
  const prevColumns = prevProps.columns;
  const nextColumns = nextProps.columns;
  if (nextColumns.length !== prevColumns.length) return false;
  const prevIds = prevColumns.map((c) => c._id);
  const nextIds = nextColumns.map((c) => c._id);
  if (prevIds.join('') !== nextIds.join('')) return false;
  const prevTitles = prevColumns.map((c) => c.title);
  const nextTitles = nextColumns.map((c) => c.title);
  if (prevTitles.join('') !== nextTitles.join('')) return false;

  return true;
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

export default React.memo(ListColumns, areEqual);
