import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimes } from "../../store/anime-actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./AnimeSelected.module.css";

const icon = <FontAwesomeIcon icon={faStar} />;

const AnimeSelected = () => {
  const dispatch = useDispatch();
  const animeData = useSelector((state) => state.anime.animes);
  const query = useSelector((state) => state.anime.query);
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  useEffect(() => {
    if (query === "") {
      dispatch(fetchAnimes(null, id));
    }
  }, [query, dispatch, id]);

  const anime = animeData.filter((anime) => anime.id === id);

  return (
    <div className={styles.anime}>
      {anime.length !== 0 && (
        <>
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
        </>
      )}
    </div>
  );
};

export default AnimeSelected;
