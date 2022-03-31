import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import MyFaves from "./pages/MyFaves";
import SearchedAnimes from "./pages/SearchedAnimes";
import SelectedAnime from "./pages/SelectedAnime";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import { autoLogin } from "./store/login-actions";
import { getFaves } from "./store/anime-actions";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const faves = useSelector((state) => state.anime.faves);
  const email = useSelector((state) => state.login.email);

  useEffect(() => {
    dispatch(autoLogin());

    if (faves.length === 0 && isLoggedIn) {
      dispatch(getFaves(email));
    }
  }, [email, dispatch, faves.length, isLoggedIn]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/animes" element={<Navigate to="/welcome" />} />
        <Route path="/my-faves" element={<MyFaves />} />
        <Route path="/animes/search/:searchId" element={<SearchedAnimes />} />
        <Route path="/animes/:animeId" element={<SelectedAnime />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
