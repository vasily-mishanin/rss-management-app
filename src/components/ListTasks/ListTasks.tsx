import { Droppable } from 'react-beautiful-dnd';
import ItemTypes from '../../models/ItemTypes';
import classes from './ListTasks.module.scss';
//////

export interface IListTasksProps {
  columnId: string;
  children: React.ReactNode;
}

function ListTasks({ children, columnId }: IListTasksProps) {
  return (
    <Droppable droppableId={columnId} type='task'>
      {(provided, snapshot) => (
        <ul className={classes.list} ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default ListTasks;
