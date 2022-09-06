import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import AddPostPage from "./pages/AddPostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="posts/add" element={<AddPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
