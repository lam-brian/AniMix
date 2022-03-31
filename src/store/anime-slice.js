import { createSlice } from "@reduxjs/toolkit";

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    query: "",
    animes: [],
    faves: [],
  },
  reducers: {
    getQuery(state, action) {
      state.query = action.payload;
    },
    getAnimes(state, action) {
      const animeData = action.payload.map((anime) => ({
        title: anime.attributes.canonicalTitle,
        synopsis: anime.attributes.synopsis,
        image: anime.attributes.posterImage.large,
        popularity: anime.attributes.popularityRank,
        id: anime.id,
      }));

      state.animes = animeData;
    },
    updateFaves(state, action) {
      state.faves = action.payload;
    },
    addToFaves(state, action) {
      state.faves.push(action.payload);
    },
    removeFromFaves(state, action) {
      state.faves = state.faves.filter((fave) => fave.id !== action.payload);
    },
    clearAnimes(state) {
      state.animes = [];
    },
    clearFaves(state) {
      state.faves = [];
    },
  },
});

export const animeActions = animeSlice.actions;

export default animeSlice;
