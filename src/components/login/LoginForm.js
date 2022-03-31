import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAccount } from "../../store/login-actions";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();

  const swithAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/welcome");
  }, [isLoggedIn, navigate]);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const loginInfo = {
      email: enteredEmail,
      password: enteredPassword,
    };

    dispatch(fetchAccount(isLogin, loginInfo));
  };

  return (
    <div className={styles.authentication}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required ref={passwordRef} />
          {!isLogin && <p>Note: Password must be at least 6 characters</p>}
        </div>
        <button>{isLogin ? "Login" : "Register"}</button>
      </form>
      <div className={styles.cta}>
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <button onClick={swithAuthMode}>
          {isLogin ? "Sign Up!" : "Login!"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
