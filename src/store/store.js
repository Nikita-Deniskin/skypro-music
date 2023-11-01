import { configureStore } from '@reduxjs/toolkit'
import tracksReducer from './slices/tracksSlice'
import { authReducer } from './slices/authSlice'
import { authorizedApi } from '../services/appService'

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    auth: authReducer,
    [authorizedApi.reducerPath]: authorizedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorizedApi.middleware),
})