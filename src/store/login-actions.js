import { loginActions } from "./login-slice";

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const fetchAccount = (isLogin, loginInfo) => {
  return async (dispatch) => {
    const fetchData = async () => {
      let url;

      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkuybd6y6NsRQ8f0ilyxcVRpxUHdHFlsA";
      } else {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkuybd6y6NsRQ8f0ilyxcVRpxUHdHFlsA`;
      }

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: loginInfo.email,
          password: loginInfo.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/jason",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        const errorMessage = data?.error?.message || "Authentication Failed!";
        throw new Error(errorMessage);
      }

      const data = await res.json();

      return data;
    };

    try {
      const data = await fetchData();
      if (!data.idToken) return;
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );

      const formattedExpirationTime = expirationTime.toISOString();

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("expirationTime", formattedExpirationTime);
      dispatch(loginActions.logUserIn(data.idToken));

      const remainingTime = calculateRemainingTime(formattedExpirationTime);

      logoutTimer = setTimeout(() => {
        dispatch(logout());
      }, remainingTime);
    } catch (err) {
      alert(err.message);
    }
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (tokenData) {
      initialToken = tokenData.token;
      dispatch(loginActions.logUserIn(initialToken));

      logoutTimer = setTimeout(() => {
        dispatch(logout());
      }, tokenData.duration);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    dispatch(loginActions.logUserOut());

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
};
