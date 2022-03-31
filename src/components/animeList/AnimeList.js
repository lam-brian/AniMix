import { useSelector } from "react-redux";

import AnimeListItem from "./AnimeListItem";
import ErrorMessage from "../UI/ErrorMessage";
import styles from "./AnimeList.module.css";

const AnimeList = () => {
  const animeData = useSelector((state) => state.anime.animes);
  const errorStatus = useSelector((state) => state.ui.errorStatus);

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
