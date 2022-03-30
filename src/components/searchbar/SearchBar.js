import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";

const icon = <FontAwesomeIcon icon={faMagnifyingGlass} />;

const SearchBar = (props) => {
  return (
    <form className={styles.form}>
      <button>{icon}</button>
      <input type="text" placeholder="Start searching for an anime!" />
    </form>
  );
};

export default SearchBar;
