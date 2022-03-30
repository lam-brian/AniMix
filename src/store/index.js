import { configureStore } from "@reduxjs/toolkit";
import animeSlice from "./animeSlice";

const store = configureStore({
  reducer: { anime: animeSlice.reducer },
});

export default store;
