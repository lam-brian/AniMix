import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

import AnimeListItem from "../AnimeListItem";
import ErrorMessage from "../../UI/ErrorMessage";
import styles from "./AnimeFave.module.css";
import { animeActions } from "../../../store/anime-slice";

const AnimeFaves = () => {
  const dispatch = useDispatch();
  const faves = useSelector((state) => state.anime.faves);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(
        uiActions.setErrorStatus({
          status: true,
          message: "Please login to start adding Faves!",
        })
      );
      return;
    }

    if (faves.length === 0) {
      dispatch(
        uiActions.setErrorStatus({
          status: true,
          message: "No Faves found, start adding some!",
        })
      );
    } else {
      dispatch(animeActions.updateAnimes(faves));
    }
  }, [faves, dispatch, isLoggedIn]);

  let content = <ErrorMessage />;

  if (faves.length !== 0) {
    content = (
      <div className={styles.faves}>
        <ul>
          {faves.map((fave) => (
            <AnimeListItem key={fave.id} data={fave} />
          ))}
        </ul>
      </div>
    );
  }

  return <>{content}</>;
};

export default AnimeFaves;
