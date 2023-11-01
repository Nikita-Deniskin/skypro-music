import { createSlice } from '@reduxjs/toolkit'
import { authorizedApi } from '../../services/AuthorizedRequestService'


const initialState = {
  currentPlayList: [],
  allTracks: [],
  favorites: [],
  category: [],
  currentPage: '',
  currentTrack: null,
  isPlaying: false,
  shuffled: false,
}
let currentTrackIndex = null
const getShuffledPlayList = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export const trackSlice = createSlice({
  name: 'tracksReducer',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload

    },

    setCurrentTruck: (state, action) => {
      if (action.payload === 'next') {
        currentTrackIndex = Math.min(
          (currentTrackIndex += 1),
          state.allTracks.length - 1
        )
      } else if (action.payload === 'prev') {
        currentTrackIndex = Math.max((currentTrackIndex -= 1), 0)
      } else {
          if (state.currentPage === 'Main') {
            state.currentPlayList = state.allTracks
          }
          if (state.currentPage === 'Favorites') {
            state.currentPlayList = state.favorites
          }
          if (state.currentPage === 'Category') {
            state.currentPlayList = state.category
          }

          currentTrackIndex = state.currentPlayList.findIndex(
            (track) => track.id === action.payload
  
        )
      }
      state.currentTrack = state.currentPlayList[currentTrackIndex]
      state.isPlaying = true
    },

    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },

    toggleShuffle: (state, action) => {
      state.shuffled = action.payload
      if (state.shuffled) {
        getShuffledPlayList(state.currentPlayList)
      }
      if (!state.shuffled) {
        if (state.currentPage === 'Main') {
          state.currentPlayList = state.allTracks
        }
        if (state.currentPage === 'Favorites') {
          state.currentPlayList = state.favorites
        }
        if (state.currentPage === 'Category') {
          state.currentPlayList = state.category
        }
        if (state.currentTrack) {
          currentTrackIndex = state.currentPlayList.findIndex(
            (track) => track.id === state.currentTrack.id
          )
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authorizedApi.endpoints.fetchAllTrucks.matchFulfilled,
      (state, { payload }) => {
        state.allTracks = payload
      }
    )
    builder.addMatcher(
      authorizedApi.endpoints.getFavorites.matchFulfilled,
      (state, { payload }) => {
        state.favorites = payload
      }
    )
    builder.addMatcher(
      authorizedApi.endpoints.getSelections.matchFulfilled,
      (state, { payload }) => {
        state.category = payload.items
      }
    )

  },
})

export const { setCurrentTruck, setIsPlaying, toggleShuffle, setCurrentPage } =
  trackSlice.actions

export default trackSlice.reducer