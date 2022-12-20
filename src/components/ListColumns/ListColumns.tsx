import { IColumn, IKanbanColumn, ITask } from '../../models/types';
import ColumnCard from '../ColumnCard/ColumnCard';
import classes from './ListColumns.module.scss';
import React, { useEffect, useState } from 'react';

////
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import ItemTypes from '../../models/ItemTypes';

type TColumnsList = {
  columns: IKanbanColumn[];
  updateColumnsOnDatabase: (updatedColumns: IColumn[]) => void;
  updateTasksOnDatabase: (updatedTasks: ITask[]) => void;
};

function ListColumns({ columns, updateColumnsOnDatabase, updateTasksOnDatabase }: TColumnsList) {
  const [currentColumns, setCurrentColumns] = useState<IKanbanColumn[]>(columns);
  const [flag, setFlag] = useState(false);
  const params = useParams();

  useEffect(() => {
    setCurrentColumns(columns);
  }, [columns]);

  const handleDragEnd = (result: DropResult) => {
    console.log('------>--handleDragEnd-->-END------', result);
    const { source, destination, draggableId, type } = result;

    let currentKanbanColumns = [...currentColumns];

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // move Columns
    if (type === ItemTypes.COLUMN) {
      const draggableColumn = currentKanbanColumns.find((column) => column.column._id === draggableId);
      if (draggableColumn) {
        currentKanbanColumns.splice(source.index, 1);
        currentKanbanColumns.splice(destination.index, 0, draggableColumn);
      }

      setCurrentColumns((prevColumns) => {
        return currentKanbanColumns;
      });
      updateColumnsOnDatabase(currentKanbanColumns.map((col) => col.column));
    }

    if (destination.droppableId === source.droppableId) {
      // move inside column
      const column = currentKanbanColumns.find((column) => column.column._id === source.droppableId);
      if (column?.tasks) {
        const tasks = [...column?.tasks];
        const draggableTask = tasks.find((t) => t._id === draggableId);
        if (draggableTask) {
          tasks.splice(source.index, 1);
          tasks.splice(destination.index, 0, draggableTask);

          const newColumn: IKanbanColumn = {
            column: column.column,
            tasks: tasks,
          };
          setCurrentColumns((prevColumns) => {
            const columns = [...prevColumns];
            const index = columns.findIndex((col) => col.column._id === source.droppableId);
            columns[index] = newColumn;
            return columns;
          });
          updateTasksOnDatabase(tasks);
        }
      }
    }

    // move between columns
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = currentKanbanColumns.find((column) => column.column._id === source.droppableId);
      const destColumn = currentKanbanColumns.find((column) => column.column._id === destination.droppableId);

      if (sourceColumn?.tasks) {
        let draggableTask = sourceColumn?.tasks.splice(source.index, 1).at(0);

        if (draggableTask) {
          draggableTask = { ...draggableTask, columnId: destination.droppableId };
          destColumn?.tasks.splice(destination.index, 0, draggableTask);
        }

        setCurrentColumns((prevColumns) => {
          const columns = [...prevColumns];
          const sourceColumnIndex = columns.findIndex((col) => col.column._id === source.droppableId);
          const destColumnIndex = columns.findIndex((col) => col.column._id === destination.droppableId);
          columns[sourceColumnIndex] = sourceColumn;
          if (destColumn) {
            columns[destColumnIndex] = destColumn;
          }
          return columns;
        });
        if (destColumn && destColumn.tasks) {
          updateTasksOnDatabase(destColumn?.tasks);
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={params.boardId || 'board'} direction='horizontal' type={ItemTypes.COLUMN}>
        {(provided) => (
          <ul className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
            {currentColumns &&
              currentColumns.map((column, i) => (
                <ColumnCard column={column.column} tasks={column.tasks} index={i} key={column.column._id} />
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(ListColumns, areEqual);
//export default ListColumns;

function areEqual(prevProps: TColumnsList, nextProps: TColumnsList) {
  const prevKanbanColumns = prevProps.columns;
  const nextKanbanColumns = nextProps.columns;
  console.log('PREV:', prevKanbanColumns);
  console.log('NEXT:', nextKanbanColumns);

  if (nextKanbanColumns.length !== prevKanbanColumns.length) return false;

  // Columns
  const prevColumns = nextKanbanColumns.map((column) => column.column);
  const nextColumns = nextKanbanColumns.map((column) => column.column);

  // Tasks
  const prevTasks = prevKanbanColumns.map((column) => column.tasks).flat();
  const nextTasks = nextKanbanColumns.map((column) => column.tasks).flat();
  console.log('TASKS', prevTasks, nextTasks);

  if (columnsAreEqual(prevColumns, nextColumns) && tasksAreEqual(prevTasks, nextTasks)) {
    console.log('columnsAreEqual and tasksAreEqual');
    return true;
  } else {
    return false;
  }

  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

function columnsAreEqual(prevColumns: IColumn[], nextColumns: IColumn[]) {
  if (prevColumns.length !== nextColumns.length) return false;

  const prevIds = prevColumns.map((col) => col._id);
  const nextIds = nextColumns.map((col) => col._id);
  if (prevIds.join('') !== nextIds.join('')) return false;

  const prevTitles = prevColumns.map((col) => col.title);
  const nextTitles = nextColumns.map((col) => col.title);
  if (prevTitles.join('') !== nextTitles.join('')) return false;

  return true;
}

function tasksAreEqual(prevTasks: ITask[], nextTasks: ITask[]) {
  if (prevTasks.length !== nextTasks.length) return false;

  const prevTasksIds = prevTasks.map((t) => t._id);
  const nextTasksIds = nextTasks.map((t) => t._id);
  if (prevTasksIds.join('') !== nextTasksIds.join('')) return false;

  const prevTasksTitles = prevTasks.map((t) => t.title);
  const nextTasksTitles = nextTasks.map((t) => t.title);
  if (prevTasksTitles.join('') !== nextTasksTitles.join('')) return false;

  const prevDesc = prevTasks.map((t) => t.description);
  const nextDesc = nextTasks.map((t) => t.description);
  if (prevDesc.join('') !== nextDesc.join('')) return false;

  const prevColumnId = prevTasks.map((t) => t.columnId);
  const nextColumnId = nextTasks.map((t) => t.columnId);
  if (prevColumnId.join('') !== nextColumnId.join('')) return false;

  return true;
}
