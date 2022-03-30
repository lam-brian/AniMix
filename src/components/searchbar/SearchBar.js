import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { animeActions } from "../../store/animeSlice";
import { fetchAnimes } from "../../store/anime-actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";

const icon = <FontAwesomeIcon icon={faMagnifyingGlass} />;

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useSelector((state) => state.anime.query);

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!query) return;

    dispatch(fetchAnimes(query));
    dispatch(animeActions.getQuery(""));
    navigate(`/animes/search/${query}`);
  };

  const inputChangeHandler = (e) => {
    dispatch(animeActions.getQuery(e.target.value));
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <button>{icon}</button>
      <input
        type="text"
        placeholder="Start searching for an anime!"
        value={query}
        onChange={inputChangeHandler}
      />
    </form>
  );
};

export default SearchBar;
