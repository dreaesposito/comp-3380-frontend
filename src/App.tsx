import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import SearchPage from "@/pages/search";
import LeadersPage from "@/pages/leaders";
import TrendsPage from "@/pages/trends";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<SearchPage />} path="/search" />
      <Route element={<LeadersPage />} path="/leaders" />
      <Route element={<TrendsPage />} path="/trends" />
    </Routes>
  );
}

export default App;
