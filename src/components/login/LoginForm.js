import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const isLogin = false;

  return (
    <div className={styles.form}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
          {!isLogin && <p>Enter a valid email</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
          {!isLogin && <p>Password must be greater than UPDATE character</p>}
        </div>
        <button>{isLogin ? "Login" : "Register"}</button>
      </form>
      <div className={styles.cta}>
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <button>{isLogin ? "Sign Up!" : "Login!"}</button>
      </div>
    </div>
  );
};

export default LoginForm;
