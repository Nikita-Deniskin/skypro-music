import { createSlice } from '@reduxjs/toolkit'
import { authorizedApi } from '../../services/appService'

const initialState = {
  currentPlayList: [],
  allTracks: [],
  favorites: [],
  category: [],
  filteredTracks: [],
  selectedFilterItems: {
    authors: [],
    genres: [],
    search: '',
    sort: 'По умолчанию',
  },
  currentPage: '',
  currentTrack: null,
  filter: false,
  currentIsLiked: false,
  isPlaying: false,
  shuffled: false,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setCurrentTruck: (state, action) => {
      if (action.payload === 'next') {
        currentTrackIndex = Math.min(
          (currentTrackIndex += 1),
          state.currentPlayList.length - 1
        )
      } else if (action.payload === 'prev') {
        currentTrackIndex = Math.max((currentTrackIndex -= 1), 0)
      } else {
        if (state.currentPage === 'Main' && !state.filter) {
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

      const forLiked = state.allTracks.find(
        (tr) => tr.id === state.currentTrack.id
      )

      state.currentIsLiked = !!forLiked.stared_user?.find(
        (item) => item.id === JSON.parse(localStorage.getItem('auth')).id
      )
    },

    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
    setCurrentIsLiked: (state, action) => {
      state.currentIsLiked = action.payload
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
    selectFilterItem: (state, action) => {
      if (!state.filter) {
        state.filter = !state.filter
      }
      if (action.payload.authors) {
        if (
          state.selectedFilterItems.authors.includes(action.payload.authors)
        ) {
          state.selectedFilterItems.authors =
            state.selectedFilterItems.authors.filter(
              (item) => item !== action.payload.authors
            )
        } else {
          state.selectedFilterItems.authors.push(action.payload.authors)
        }
      }
      if (action.payload.genres) {
        if (state.selectedFilterItems.genres.includes(action.payload.genres)) {
          state.selectedFilterItems.genres =
            state.selectedFilterItems.genres.filter(
              (item) => item !== action.payload.genres
            )
        } else {
          state.selectedFilterItems.genres.push(action.payload.genres)
        }
      }
      if (action.payload.search) {
        state.selectedFilterItems.search =
          action.payload.search === 'clear' ? '' : action.payload.search
      }
      if (action.payload.sort) {
        state.selectedFilterItems.sort = action.payload.sort
      }
      const getFilteredTracks = () => {
        let filterData = state.allTracks
        if (state.selectedFilterItems.authors.length > 0) {
          filterData = filterData.filter((item) =>
            state.selectedFilterItems.authors.includes(item.author)
          )
        }
        if (state.selectedFilterItems.genres.length > 0) {
          filterData = filterData.filter((item) =>
            state.selectedFilterItems.genres.includes(item.genre)
          )
        }
        if (state.selectedFilterItems.search.length > 0) {
          filterData = filterData.filter((item) =>
            item.name
              .toLocaleLowerCase()
              .includes(state.selectedFilterItems.search.toLocaleLowerCase())
          )
        }
        if (state.selectedFilterItems.sort === 'Сначала новые') {
          filterData = filterData.sort(
            (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
          )
        }
        if (state.selectedFilterItems.sort === 'Сначала старые') {
          filterData = filterData.sort(
            (a, b) => Date.parse(a.release_date) - Date.parse(b.release_date)
          )
        }

        return filterData
      }
      state.filteredTracks = getFilteredTracks()

      state.currentPlayList = state.filteredTracks
      if (
        state.selectedFilterItems.authors.length === 0 &&
        state.selectedFilterItems.genres.length === 0 &&
        state.selectedFilterItems.search.length === 0 &&
        state.selectedFilterItems.sort === 'По умолчанию'
      ) {
        state.filter = false
        state.currentPlayList = state.allTracks
      }
      if (state.currentTrack) {
        currentTrackIndex = state.currentPlayList.findIndex(
          (track) => track.id === state.currentTrack.id
        )
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

export const {
  setCurrentTruck,
  setIsPlaying,
  toggleShuffle,
  setCurrentPage,
  setCurrentIsLiked,
  selectFilterItem,
} = trackSlice.actions

export default trackSlice.reducer