import classes from './ListTasks.module.scss';
import { List } from '@mui/icons-material';
import { ITask } from '../../models/types';
import TaskCard from '../TaskCard/TaskCard';
import ListItem from '@mui/material/ListItem';

export interface ILiastTasksProps {
  tasks: ITask[];
}

function ListTasks({ tasks }: ILiastTasksProps) {
  return (
    <ul className={classes.list}>
      {tasks.map((task) => (
        <ListItem disablePadding key={task._id} className={classes.listitem}>
          <TaskCard task={task} />
        </ListItem>
      ))}
    </ul>
  );
}

export default ListTasks;
