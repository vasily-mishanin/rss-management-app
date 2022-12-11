import { baseURL } from '../models/constants';
import type { IColumn, IError, INewTask, ITask, TGetAllTasks } from '../models/types';

//GET ALL TASKS
export async function getAllTasks(reqData: TGetAllTasks) {
  try {
    const res = await fetch(`${baseURL}/boards/${reqData.boardId}/columns/${reqData.columnId}/tasks`, {
      method: 'GET',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${reqData.token}`,
      },
    });
    if (res.ok) {
      const data: ITask[] = await res.json();
      console.log('getAllColumns', data);
      return data;
    } else {
      const error: IError = await res.json();
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

// //CREATE TASK
// export async function createTask(reqData: INewTask) {
//   try {
//     const res = await fetch(`${baseURL}/boards/${reqData.boardId}/columns/${reqData.columnId}/tasks`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application.json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${reqData.token}`,
//       },
//       body: JSON.stringify(reqData.newTask),
//     });
//     if (res.ok) {
//       console.log('createColumn Success');
//       const data: ITask[] = await res.json();
//       console.log('createColumn', data);
//       return data;
//     } else {
//       const error: IError = await res.json();
//       throw error;
//     }
//   } catch (err) {
//     throw err;
//   }
// }
