import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    token: "",
    email: "",
  },
  reducers: {
    logUserIn(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email.replace(".", "");
      state.isLoggedIn = true;
    },
    logUserOut(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
