import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const trackAPI = createApi({
  reducerPath: 'trackAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/',
  }),
  endpoints: (build) => ({
    getTokens: build.mutation({
      query: (userData) => ({
        url: `user/token/`,
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'content-type': 'application/json',
        },
      }),
    }),
    getAccess: build.mutation({
      query: (refToken) => ({
        url: `/user/token/refresh/`,
        method: 'POST',
        body: JSON.stringify(refToken),
        headers: {
          'content-type': 'application/json',
        },
      }),
    }),
  }),
})
export const { useGetTokensMutation } = trackAPI