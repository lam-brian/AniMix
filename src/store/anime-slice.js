import { createSlice } from "@reduxjs/toolkit";

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    query: "",
    animes: [],
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
  },
});

export const animeActions = animeSlice.actions;

export default animeSlice;
