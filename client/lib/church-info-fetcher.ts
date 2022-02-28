import { ChurchInfo } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const churchInfoApi = createApi({
  reducerPath: 'churchInfo',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/church-info' }),
  endpoints: (builder) => ({
    getChurchInfo: builder.query<ChurchInfo | null, string>({
      query: (churchName) => `${churchName}`,
    }),
  }),
});

export const { useGetChurchInfoQuery } = churchInfoApi;
