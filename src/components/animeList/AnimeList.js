import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAnimes } from "../../store/anime-actions";

import AnimeListItem from "./AnimeListItem";
import ErrorMessage from "../UI/ErrorMessage";
import styles from "./AnimeList.module.css";
import { animeActions } from "../../store/anime-slice";

const AnimeList = () => {
  const dispatch = useDispatch();
  const animeData = useSelector((state) => state.anime.animes);
  const errorStatus = useSelector((state) => state.ui.errorStatus);
  const queryState = useSelector((state) => state.anime.query);
  const pathName = useLocation().pathname;

  useEffect(() => {
    if (queryState === "") {
      const [, , , query] = pathName.split("/");
      dispatch(fetchAnimes(query));
      dispatch(animeActions.getQuery(query));
    }
  }, [queryState, pathName, dispatch]);

  let content = (
    <ul>
      {animeData.map((anime) => (
        <AnimeListItem key={anime.id} data={anime} />
      ))}
    </ul>
  );

  if (errorStatus.status) {
    content = <ErrorMessage />;
  }

  return <div className={styles["anime-list"]}>{content}</div>;
};

export default AnimeList;
