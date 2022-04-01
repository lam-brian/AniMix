import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAnimes } from "../../store/anime-actions";
import { uiActions } from "../../store/ui-slice";

import AnimeListItem from "./AnimeListItem";
import ErrorMessage from "../UI/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import styles from "./AnimeList.module.css";

const iconArrowRight = <FontAwesomeIcon icon={faRightLong} />;
const iconArrowLeft = <FontAwesomeIcon icon={faLeftLong} />;

const AnimeList = () => {
  const dispatch = useDispatch();
  const animeData = useSelector((state) => state.anime.animes);
  const errorStatus = useSelector((state) => state.ui.errorStatus);
  const queryState = useSelector((state) => state.anime.query);
  const pathName = useLocation().pathname;
  const pagination = useSelector((state) => state.ui.pagination);
  const clicked = useSelector((state) => state.ui.clicked);
  const [, , , query] = pathName.split("/");

  useEffect(() => {
    if (queryState === "") {
      dispatch(fetchAnimes(query));
    }
  }, [queryState, query, dispatch]);

  useEffect(() => {
    if (!clicked) return;
    dispatch(fetchAnimes(queryState, pagination.pageOffset));
    dispatch(uiActions.setClicked(false));
  }, [clicked, queryState, pagination, dispatch]);

  const changePageHandler = (type) => {
    dispatch(uiActions.setClicked(true));
    dispatch(uiActions.changePage(type));
  };

  let content = (
    <div className={styles["anime-list"]}>
      <ul>
        {animeData.map((anime) => (
          <AnimeListItem key={anime.id} data={anime} />
        ))}
      </ul>
      <div
        className={`${styles.pagination} ${
          animeData.length === 0 ? styles.hidden : ""
        }`}
      >
        <button
          className={pagination.page === 1 ? styles.hidden : ""}
          onClick={changePageHandler.bind(null, "prev")}
        >
          {iconArrowLeft}
          Prev
        </button>
        <button
          className={animeData.length !== 20 ? styles.hidden : ""}
          onClick={changePageHandler.bind(null, "next")}
        >
          Next
          {iconArrowRight}
        </button>
      </div>
    </div>
  );

  if (errorStatus.status) {
    content = <ErrorMessage />;
  }

  return <>{content}</>;
};

export default AnimeList;
