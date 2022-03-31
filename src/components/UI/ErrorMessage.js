import { useSelector } from "react-redux";
import img from "../../images/error-img.png";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  const errorStatus = useSelector((state) => state.ui.errorStatus);
  let content = <p>Page not Found!</p>;

  if (errorStatus.status) {
    content = <p>{errorStatus.message}</p>;
  }

  return (
    <div className={styles.error}>
      {content}
      <img src={img} alt="umaru" />
    </div>
  );
};

export default ErrorMessage;
