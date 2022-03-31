import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAnimes } from "../../store/anime-actions";
import { uiActions } from "../../store/ui-slice";

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

    dispatch(uiActions.setClicked(false));
    dispatch(uiActions.resetPage());
    dispatch(fetchAnimes(query));
    navigate(`/animes/search/${query}`);
    queryRef.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <button aria-label="search button">{icon}</button>
      <input
        type="text"
        placeholder="Start searching for an anime!"
        ref={queryRef}
      />
    </form>
  );
};

export default SearchBar;
