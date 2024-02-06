import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import NewPost from "./components/NewPost.js";
import ViewPost from "./components/ViewPost.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/new" element={<NewPost />} />
      <Route path="/posts/:postId" element={<ViewPost />} />
    </Routes>
  );
}
