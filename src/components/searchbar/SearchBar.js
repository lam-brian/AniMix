import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { animeActions } from "../../store/anime-slice";
import { fetchAnimes } from "../../store/anime-actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";

const icon = <FontAwesomeIcon icon={faMagnifyingGlass} />;

const SearchBar = () => {
  const queryRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const query = queryRef.current.value;
    if (!query) return;

    dispatch(fetchAnimes(query));
    dispatch(animeActions.getQuery(query));
    navigate(`/animes/search/${query}`);
  };

  // const inputChangeHandler = (e) => {
  //   dispatch(animeActions.getQuery(e.target.value));
  // };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <button>{icon}</button>
      <input
        type="text"
        placeholder="Start searching for an anime!"
        // value={query}
        // onChange={inputChangeHandler}
        ref={queryRef}
      />
    </form>
  );
};

export default SearchBar;
