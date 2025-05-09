import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import NotFound from "@/pages/notFound";
import PlayerAnalysisPage from "@/pages/players";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PlayerAnalysisPage />} path="/players" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}

export default App;
