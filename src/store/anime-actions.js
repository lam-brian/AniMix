import { animeActions } from "./anime-slice";
import { uiActions } from "./ui-slice";

export const fetchAnimes = (query) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setErrorStatus({
        status: false,
        message: "",
      })
    );
    dispatch(animeActions.clearAnimes());

    const fetchData = async () => {
      const formattedQuery = query.replace(" ", "%20");

      const res = await fetch(
        `https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=0&filter%5Btext%5D=${formattedQuery}`
      );

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
