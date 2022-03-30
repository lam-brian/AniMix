import { Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import SearchedAnimes from "./pages/SearchedAnimes";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/animes" element={<SearchedAnimes />} />
      </Routes>
    </Layout>
  );
}

export default App;
