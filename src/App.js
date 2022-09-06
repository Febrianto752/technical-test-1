import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
