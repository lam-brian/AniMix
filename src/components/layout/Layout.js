import MainHeader from "./MainHeader";
import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
