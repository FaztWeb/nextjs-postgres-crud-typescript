import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ChurchInfo,
  ChurchInfoSuccessResponse,
} from 'pages/api/church-info/[church]';

export const churchInfoApi = createApi({
  reducerPath: 'churchInfo',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/church-info' }),
  endpoints: (builder) => ({
    getChurchInfo: builder.query<ChurchInfoSuccessResponse, string>({
      query: (churchName) => `${churchName}`,
    }),
    postChurchInfo: builder.mutation<void, ChurchInfo>({
      query: (churchInfo) => ({
        url: `${churchInfo.churchName}`,
        body: churchInfo,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetChurchInfoQuery, usePostChurchInfoMutation } =
  churchInfoApi;
