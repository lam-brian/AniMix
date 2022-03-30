import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./AnimeSelected.module.css";

const icon = <FontAwesomeIcon icon={faStar} />;

const AnimeSelected = () => {
  const animeData = useSelector((state) => state.anime.animes);
  const location = useLocation();

  const id = location.pathname.split("/").pop();
  const anime = animeData.filter((anime) => anime.id === id);

  return (
    <div className={styles.anime}>
      <div className={styles.flex}>
        <h2>{anime[0].title}</h2>
        <p>{anime[0].synopsis}</p>
        <p>
          <span>Popularity Ranking:</span> {anime[0].popularity}
        </p>
        <button>{icon} Add to Faves!</button>
      </div>
      <div>
        <img src={anime[0].image} alt="anime cover" />
      </div>
    </div>
  );
};

export default AnimeSelected;
