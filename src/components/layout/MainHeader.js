import { NavLink } from "react-router-dom";

import SearchBar from "../searchbar/SearchBar";
import styles from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink className={styles.logo} to="/welcome">
          MyAnimeFaves
        </NavLink>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/my-faves"
            >
              My Faves
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/account"
            >
              Account
            </NavLink>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
