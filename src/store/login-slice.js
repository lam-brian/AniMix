import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    token: "",
  },
  reducers: {
    logUserIn(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logUserOut(state) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
