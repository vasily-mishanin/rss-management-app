import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, endpoints, methods } from '../models/constants';
import { IColumn, ITask, INewTask } from '../models/types';
import type { RootState } from '../store/store';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, api) => {
      const store = api.getState() as RootState;
      const token = store.authReducer.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getAllTasksInColumn: builder.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}/${columnId}/${endpoints.TASKS}`,
        method: methods.GET,
      }),
      providesTags: (result) => ['Task'],
    }),

    getTaskById: builder.query<ITask, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}/${columnId}/${endpoints.TASKS}/${taskId}`,
        method: methods.GET,
      }),
      providesTags: (result) => ['Task'],
    }),

    addNewTask: builder.mutation<ITask, INewTask>({
      query: (newTaskData) => {
        const { boardId, columnId, title, order, description, userId, users } = newTaskData;
        return {
          url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}/${columnId}/${endpoints.TASKS}`,
          method: methods.POST,
          body: { title, order, description, userId, users },
        };
      },
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<ITask, ITask>({
      query: (updatedTask) => {
        const { boardId, columnId, _id: taskId, title, order, description, userId, users } = updatedTask;
        return {
          url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}/${columnId}/${endpoints.TASKS}/${taskId}`,
          method: methods.PUT,
          body: { columnId, title, order, description, userId, users },
        };
      },
      invalidatesTags: ['Task'],
    }),

    deleteTaskById: builder.mutation<ITask, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}/${columnId}/${endpoints.TASKS}/${taskId}`,
        method: methods.DELETE,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});
