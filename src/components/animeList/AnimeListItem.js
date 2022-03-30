import { Link } from "react-router-dom";

import styles from "./AnimeListItem.module.css";

const AnimeListItem = (props) => {
  return (
    <li className={styles["list-item"]}>
      <Link to={`/animes/${props.data.id}`}>
        <div>
          <img src={props.data.image} alt="anime cover" />
        </div>
        <p>{props.data.title}</p>
      </Link>
    </li>
  );
};

export default AnimeListItem;
