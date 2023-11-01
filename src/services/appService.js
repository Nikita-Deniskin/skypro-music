import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAuth, setTokens } from '../store/slices/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://skypro-music-api.skyeng.tech/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401 && api.endpoint !== "getRegistration") {
    const authData = api.getState().auth
    const refreshResult = await baseQuery(
      {
        url: '/user/token/refresh/',
        method: 'POST',
        body: JSON.stringify({
          refresh: authData.refresh,
        }),
        headers: {
          'content-type': 'application/json',
        },
      },
      api,
      extraOptions
    )
    if (refreshResult.data) {
      api.dispatch(
        setTokens({
          access: refreshResult.data.access,
        })
      )
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(setAuth(null))
    }
  }
  return result
}

export const authorizedApi = createApi({
  reducerPath: 'authorizedApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tracks', 'Favorites', 'Selections'],

  endpoints: (build) => ({
    getRegistration: build.mutation({
      query: ({ data, url }) => ({
        url: `user/${url}/`,
        method: 'POST',
        body: data,
      }),
    }),

    getTokens: build.mutation({
      query: (userData) => ({
        url: `user/token/`,
        method: 'POST',
        body: userData,
      }),
    }),

    fetchAllTrucks: build.query({
      query: () => `catalog/track/all/`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tracks', id })),
              { type: 'Tracks', id: 'LIST' },
            ]
          : [{ type: 'Tracks', id: 'LIST' }],
    }),
    getFavorites: build.query({
      query: () => 'catalog/track/favorite/all/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Favorites', id })),
              { type: 'Favorites', id: 'LIST' },
            ]
          : [{ type: 'Favorites', id: 'LIST' }],
    }),
    getSelections: build.query({
      query: (id) => `catalog/selection/${id}/`,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Selections', id })),
              { type: 'Selections', id: 'LIST' },
            ]
          : [{ type: 'Selections', id: 'LIST' }],
    }),
    addToFavorites: build.mutation({
      query: (id) => ({
        url: `catalog/track/${id}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'Favorites', id: 'LIST' },
        { type: 'Tracks', id: 'LIST' },
        { type: 'Selections', id: 'LIST' },
      ],
    }),
    removeFromFavorites: build.mutation({
      query: (id) => ({
        url: `catalog/track/${id}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Favorites', id: 'LIST' },
        { type: 'Tracks', id: 'LIST' },
        { type: 'Selections', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetRegistrationMutation,
  useGetTokensMutation,
  useFetchAllTrucksQuery,
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useGetSelectionsQuery,
} = authorizedApi