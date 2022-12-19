import classes from './ListTasks.module.scss';
import { ITask } from '../../models/types';
import TaskCard from '../TaskCard/TaskCard';
import { useState, useEffect } from 'react';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  useDroppable,
  DragOverlay,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import React from 'react';

export interface IListTasksProps {
  columnId: string;
  tasks: ITask[];
  updateTasksOnDatabase: (updatedTasks: ITask[]) => void;
}

function ListTasks({ tasks, updateTasksOnDatabase, columnId }: IListTasksProps) {
  const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks);
  const [flag, setFlag] = useState(false);

  // const { setNodeRef } = useDroppable({
  //   id: columnId,
  //   data: {
  //     accepts: ['task'],
  //   },
  // });

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
    setCurrentTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (flag) {
      updateTasksOnDatabase(currentTasks);
      setFlag(false);
    }
  }, [currentTasks, updateTasksOnDatabase]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFlag(true);
      setCurrentTasks((currentTasks) => {
        const oldIndex = currentTasks.findIndex((task) => task._id === active.id);
        const newIndex = currentTasks.findIndex((task) => task._id === over.id);
        return arrayMove(currentTasks, oldIndex, newIndex);
      });
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log('----------TASK-----------handleDragOver', active, over);
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      //onDragOver={handleDragOver}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <ul className={classes.list}>
        <SortableContext
          id={columnId}
          items={currentTasks.map((task) => ({ id: task._id }))}
          strategy={verticalListSortingStrategy}
        >
          {currentTasks && currentTasks.map((task) => <TaskCard task={task} key={task._id} id={task._id} />)}
        </SortableContext>
      </ul>
    </DndContext>
  );
}

function areEqual(prevProps: IListTasksProps, nextProps: IListTasksProps) {
  const prevTasks = prevProps.tasks;
  const nextTasks = nextProps.tasks;
  if (nextTasks.length !== prevTasks.length) return false;
  const prevIds = prevTasks.map((t) => t._id);
  const nextIds = nextTasks.map((t) => t._id);
  if (prevIds.join('') !== nextIds.join('')) return false;
  const prevTitles = prevTasks.map((t) => t.title);
  const nextTitles = nextTasks.map((t) => t.title);
  if (prevTitles.join('') !== nextTitles.join('')) return false;
  const prevDesc = prevTasks.map((t) => t.description);
  const nextDesc = nextTasks.map((t) => t.description);
  if (prevDesc.join('') !== nextDesc.join('')) return false;
  const prevColumnId = prevTasks.map((t) => t.columnId);
  const nextColumnId = nextTasks.map((t) => t.columnId);
  if (prevColumnId.join('') !== nextColumnId.join('')) return false;
  return true;
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

export default React.memo(ListTasks, areEqual);
//export default ListTasks;
