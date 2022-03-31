import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/login-actions";

import SearchBar from "../searchbar/SearchBar";
import styles from "./MainHeader.module.css";

const MainHeader = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink className={styles.logo} to="/welcome">
          MyAnimeFaves
        </NavLink>
        <ul>
          <li>
            {isLoggedIn ? (
              <NavLink to="/login" onClick={logoutHandler}>
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
          <li>
            <NavLink to="/my-faves">My Faves</NavLink>
          </li>
          <li>
            <NavLink to="/account">Account</NavLink>
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
