import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimes, addFave, removeFave } from "../../store/anime-actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./AnimeSelected.module.css";

const icon = <FontAwesomeIcon icon={faStar} />;

const AnimeSelected = () => {
  const [isFaved, setIsFaved] = useState(false);
  const dispatch = useDispatch();
  const animeData = useSelector((state) => state.anime.animes);
  const faveData = useSelector((state) => state.anime.faves);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const email = useSelector((state) => state.login.email);
  const query = useSelector((state) => state.anime.query);
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const anime = animeData.filter((anime) => anime.id === id);

  useEffect(() => {
    if (query === "") {
      dispatch(fetchAnimes(null, null, id));
    }

    if (faveData.length !== 0) {
      const exisitingFave = faveData.find((fave) => fave.id === id);
      if (exisitingFave) setIsFaved(true);
    }
  }, [query, dispatch, id, faveData]);

  const addToFaveHandler = () => {
    if (!isLoggedIn) {
      return;
    }

    if (isFaved) {
      setIsFaved(false);
      dispatch(removeFave(email, anime[0].id));
    } else {
      setIsFaved(true);
      dispatch(addFave(email, anime, anime[0].id));
    }
  };

  let buttonContent;
  let buttonClass;

  if (!isLoggedIn) {
    buttonContent = "Please login before adding Faves!";
    buttonClass = styles.faved;
  } else {
    buttonContent = isFaved ? "Un-Fave" : "Add to Faves!";
    buttonClass = isFaved ? styles.faved : "";
  }

  return (
    <div className={`anime ${styles.anime}`}>
      {anime.length !== 0 && (
        <>
          <div className={styles.flex}>
            <h2>{anime[0].title}</h2>
            <p>{anime[0].synopsis}</p>
            <p>
              <span>Popularity Ranking:</span> {anime[0].popularity}
            </p>
            <button onClick={addToFaveHandler} className={buttonClass}>
              {icon} {buttonContent}
            </button>
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
