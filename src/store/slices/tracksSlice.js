import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allTracks: [],
  currentTrack: null,
  isPlaying: false,
  shuffled: false,
  shuffledPlayList: [],
}
let currentTrackIndex = null
const getShuffledPlayList = (array) => {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    // eslint-disable-next-line prefer-const
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export const trackSlice = createSlice({
  name: 'tracksReducer',
  initialState,
  reducers: {
    setAllTracks: (state, action) => {
      state.allTracks = action.payload
      state.shuffledPlayList = action.payload
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
        currentTrackIndex = state.shuffled
          ? state.shuffledPlayList.findIndex(
              (track) => track.id === action.payload
            )
          : state.allTracks.findIndex((track) => track.id === action.payload)
      }
      state.currentTrack = state.shuffled
        ? state.shuffledPlayList[currentTrackIndex]
        : state.allTracks[currentTrackIndex]
      state.isPlaying = true
    },

    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },

    toggleShuffle: (state, action) => {
      state.shuffled = action.payload
      getShuffledPlayList(state.shuffledPlayList)
      currentTrackIndex = state.shuffled
      ? state.shuffledPlayList.findIndex(
          (track) => track.id === action.payload
        )
      : state.allTracks.findIndex((track) => track.id === action.payload)
    },
  },
})

export const { setAllTracks, setCurrentTruck, setIsPlaying, toggleShuffle } =
  trackSlice.actions

export default trackSlice.reducer