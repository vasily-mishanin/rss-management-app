import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, endpoints, methods } from '../models/constants';
import { IBoard } from '../models/types';
import type { RootState } from '../store/store';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
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
  tagTypes: ['Board'],

  endpoints: (builder) => ({
    getAllBoards: builder.query<IBoard[], string>({
      query: () => `/${endpoints.BOARDS}`,
      providesTags: (result) => ['Board'],
    }),

    getBoardById: builder.query<IBoard, string>({
      query: (boardId) => ({
        url: `/${endpoints.BOARDS}/${boardId}`,
        method: methods.GET,
      }),
    }),

    addNewBoard: builder.mutation<IBoard, Omit<IBoard, '_id' | 'description'>>({
      query: (newBoardData) => ({
        url: `/${endpoints.BOARDS}`,
        method: methods.POST,
        body: newBoardData,
      }),
      invalidatesTags: ['Board'],
    }),

    updateBoard: builder.mutation<IBoard, IBoard>({
      query: (updatedBoardData) => {
        const { _id: boardId, title, owner, users } = updatedBoardData;
        return {
          url: `/${endpoints.BOARDS}/${boardId}`,
          method: methods.PUT,
          body: { title, owner, users },
        };
      },
      invalidatesTags: ['Board'],
    }),

    deleteBoardById: builder.mutation<IBoard, string>({
      query: (boardId) => ({
        url: `/${endpoints.BOARDS}/${boardId}`,
        method: methods.DELETE,
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});
