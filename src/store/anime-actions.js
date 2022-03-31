import { animeActions } from "./anime-slice";
import { uiActions } from "./ui-slice";

export const fetchAnimes = (query, pageOffset = 0, id) => {
  return async (dispatch) => {
    dispatch(animeActions.getQuery(query));
    dispatch(
      uiActions.setErrorStatus({
        status: false,
        message: "",
      })
    );
    dispatch(animeActions.clearAnimes());

    const fetchData = async () => {
      let url = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=${pageOffset}&filter%5Btext%5D=${query}`;

      if (id) {
        url = `https://kitsu.io/api/edge/anime?filter%5Bid%5D=${id}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Could not fetch anime data!");
      }

      const data = await res.json();

      return data;
    };

    try {
      const { data } = await fetchData();

      if (data.length === 0) {
        throw new Error("No animes found for your query!");
      }

      dispatch(animeActions.getAnimes(data));
    } catch (err) {
      dispatch(
        uiActions.setErrorStatus({
          status: true,
          message: err.message,
        })
      );
    }
  };
};

const fetchFaves = async (email, anime, id, type) => {
  const formattedEmail = email.replace(".", "");

  let url = `https://myanimefaves-default-rtdb.firebaseio.com/faves/${formattedEmail}${
    id ? `/${id}` : ""
  }.json`;

  let options;

  if (type === "GET") options = null;

  if (type === "PUT") {
    options = {
      method: type,
      body: JSON.stringify(anime[0]),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (type === "DELETE") {
    options = {
      method: type,
    };
  }
  const res = await fetch(url, options);

  if (!res.ok) throw new Error("Error fetching faves");

  const data = await res.json();

  return data;
};

export const getFaves = (email) => {
  return async (dispatch) => {
    try {
      const animeData = await fetchFaves(email, null, null, "GET");
      let foramttedAnimeData = [];
      for (const key in animeData) {
        foramttedAnimeData.push({ ...animeData[key] });
      }
      dispatch(animeActions.updateFaves(foramttedAnimeData));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addFave = (email, anime, id) => {
  return async (dispatch) => {
    try {
      await fetchFaves(email, anime, id, "PUT");
      dispatch(animeActions.addToFaves(anime[0]));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeFave = (email, id) => {
  return async (dispatch) => {
    try {
      await fetchFaves(email, null, id, "DELETE");
      dispatch(animeActions.removeFromFaves(id));
    } catch (err) {
      console.log(err);
    }
  };
};
