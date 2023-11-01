import { configureStore } from '@reduxjs/toolkit'
import tracksReducer from './slices/tracksSlice'
import { trackAPI } from '../services/TracksService'
import { authReducer } from './slices/authSlice'
import { authorizedApi } from '../services/AuthorizedRequestService'

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    auth: authReducer,
    [trackAPI.reducerPath]: trackAPI.reducer,
    [authorizedApi.reducerPath]: authorizedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(trackAPI.middleware)
      .concat(authorizedApi.middleware),
})