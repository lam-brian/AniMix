import { configureStore } from "@reduxjs/toolkit";
import animeSlice from "./anime-slice";
import uiSlice from "./ui-slice";
import loginSlice from "./login-slice";

const store = configureStore({
  reducer: {
    anime: animeSlice.reducer,
    ui: uiSlice.reducer,
    login: loginSlice.reducer,
  },
});

export default store;
