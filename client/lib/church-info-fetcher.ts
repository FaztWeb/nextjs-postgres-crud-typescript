import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChurchInfoSuccessResponse } from 'pages/api/church-info/[church]';

export const churchInfoApi = createApi({
  reducerPath: 'churchInfo',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/church-info' }),
  endpoints: (builder) => ({
    getChurchInfo: builder.query<ChurchInfoSuccessResponse, string>({
      query: (churchName) => `${churchName}`,
    }),
  }),
});

export const { useGetChurchInfoQuery } = churchInfoApi;
