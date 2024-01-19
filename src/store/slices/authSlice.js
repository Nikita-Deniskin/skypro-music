import { createSlice } from "@reduxjs/toolkit";
import { trackAPI } from "../../services/TracksService";

const AUTH_KEY = "auth";

function getAuthFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch (error) {
    console.error(error);
    return null;
  }
}

const initialState = {
  id: 0,
  email: "",
  access: "",
  refresh: "",
  first_name: "",
  last_name: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: getAuthFromLocalStorage() ?? initialState,
  reducers: {
    setAuth(state, action) {
      const payload = action.payload ?? initialState;
      state.id = payload.id;
      state.email = payload.email;
      state.username = payload.username;
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
      localStorage.setItem(AUTH_KEY, JSON.stringify(state));
    },
    setTokens(state, action) {
      const payload = action.payload ?? initialState;
      state.access = payload.access;
      state.refresh = payload.refresh;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      trackAPI.endpoints.getTokens.matchFulfilled,
      (state, { payload }) => {
        state.access = payload.access;
        state.refresh = payload.refresh;
        localStorage.setItem(AUTH_KEY, JSON.stringify(state));
        }
    )
  },

});
export const { setAuth, setTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;