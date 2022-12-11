import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, endpoints, methods } from '../models/constants';
import { IBoard, IColumn, INewColumn } from '../models/types';
import type { RootState } from '../store/store';

export const columnsApi = createApi({
  reducerPath: 'boardApi',
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
  tagTypes: ['Column'],
  endpoints: (builder) => ({
    getAllColumns: builder.query<IColumn[], string>({
      query: (boardId) => `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}`,
      providesTags: (result) => ['Column'],
    }),

    addNewColumn: builder.mutation<IColumn, INewColumn>({
      query: (newColumnData) => {
        const { boardId, title, order } = newColumnData;
        return {
          url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}`,
          method: methods.POST,
          body: { title, order },
        };
      },
      invalidatesTags: ['Column'],
    }),

    getColumnById: builder.mutation<IColumn, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}/${columnId}`,
        method: methods.GET,
      }),
    }),

    updateColumn: builder.mutation<IColumn, IColumn>({
      query: (updatedColumn) => {
        const { _id: columnId, boardId, title, order } = updatedColumn;
        return {
          url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}/${columnId}`,
          method: methods.PUT,
          body: { title, order },
        };
      },
      invalidatesTags: ['Column'],
    }),

    deleteColumnById: builder.mutation<IColumn, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/${endpoints.BOARDS}/${boardId}/${endpoints.COLUMNS}/${columnId}`,
        method: methods.DELETE,
      }),
      invalidatesTags: ['Column'],
    }),
  }),
});
