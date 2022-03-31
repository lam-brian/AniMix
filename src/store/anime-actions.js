import { animeActions } from "./anime-slice";
import { uiActions } from "./ui-slice";

export const fetchAnimes = (query, id) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setErrorStatus({
        status: false,
        message: "",
      })
    );
    dispatch(animeActions.clearAnimes());

    const fetchData = async () => {
      let url = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=0&filter%5Btext%5D=${query}`;

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
