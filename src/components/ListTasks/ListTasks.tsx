import classes from './ListTasks.module.scss';
import { ITask } from '../../models/types';
import TaskCard from '../TaskCard/TaskCard';
import ListItem from '@mui/material/ListItem';
import { useState, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../../models/ItemTypes';
import update from 'immutability-helper';

export interface ILiastTasksProps {
  tasks: ITask[];
  updateTasks: (updatedTasks: ITask[]) => void;
}

function ListTasks({ tasks, updateTasks }: ILiastTasksProps) {
  const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks);
  //console.log('ListTasks', currentTasks);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item, monitor) => {
      console.log(item);
      updateTasks(currentTasks);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveTaskInside = useCallback((dragIndex: number, hoverIndex: number) => {
    setCurrentTasks((prevTasks: ITask[]) => {
      const newTasks = [
        ...update(prevTasks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevTasks[dragIndex] as ITask],
          ],
        }),
      ];

      const orderedTasks = newTasks.map((task, index) => {
        const newTask = { ...task, order: index };
        return newTask;
      });
      return orderedTasks;
    });
  }, []);

  useEffect(() => {
    setCurrentTasks(tasks);
  }, [tasks]);

  // useEffect(() => {
  //   updateTasks(currentTasks);
  // }, [currentTasks]);

  const sortTasks = () => {
    if (currentTasks.length > 0) {
      let sortedTasks = [...currentTasks].sort((a, b) => a.order - b.order);
      if (sortedTasks[1] && sortedTasks[1].order === 0) {
        sortedTasks[1] = { ...sortedTasks[1], order: sortedTasks.length - 1 };
      }
      sortedTasks = sortedTasks.sort((a, b) => a.order - b.order);
      return sortedTasks;
    }
    return;
  };

  const sortedTasks = sortTasks();

  return (
    <>
      <ul
        ref={drop}
        className={classes.list}
        style={isOver ? { boxShadow: '0 2px 10px 1px rgba(3, 3, 3, 0.2)' } : {}}
      >
        {sortedTasks &&
          sortedTasks.map((task, ind) => (
            <ListItem disablePadding key={task._id} className={classes.listitem}>
              <TaskCard task={task} index={ind} moveTask={moveTaskInside} />
            </ListItem>
          ))}
      </ul>
    </>
  );
}

export default ListTasks;
