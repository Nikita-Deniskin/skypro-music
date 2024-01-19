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
  if (result?.error?.status === 401) {
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
      api.dispatch(setTokens({access: refreshResult.data.access, refresh: authData.refresh }))
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
  tagTypes: ['Tracks', 'Favorites'
  // , 'Current'
],
  endpoints: (build) => ({
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
    }),


    addToFavorites: build.mutation({
      query: (id) => ({
        url: `catalog/track/${id}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'Favorites', id: 'LIST' },
        { type: 'Tracks', id: 'LIST' },
        // 'Current'
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
        // 'Current'
      ],
    }),
  }),
})

export const {
  useFetchAllTrucksQuery,
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useGetSelectionsQuery
  // useGetCurrentQuery
} = authorizedApi