import { useSelector } from "react-redux";

import AnimeListItem from "./AnimeListItem";
import styles from "./AnimeList.module.css";

const AnimeList = (props) => {
  const animeData = useSelector((state) => state.anime.animes);

  let content = animeData.map((anime) => (
    <AnimeListItem key={anime.id} data={anime} />
  ));

  return (
    <div className={styles["anime-list"]}>
      <ul>{content}</ul>
    </div>
  );
};

export default AnimeList;
