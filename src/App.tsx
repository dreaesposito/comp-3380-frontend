import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import NotFound from "@/pages/notFound";
import SearchPage from "@/pages/search";
import LeadersPage from "@/pages/leaders";
import TrendsPage from "@/pages/trends";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SearchPage />} path="/search" />
      <Route element={<LeadersPage />} path="/leaders" />
      <Route element={<TrendsPage />} path="/trends" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<NotFound />} path="*" />
      {/*<Route element={<Navigate replace to="/404" />} path="*" />*/}
      {/*Use mapping for this in the future*/}
    </Routes>
  );
}

export default App;
