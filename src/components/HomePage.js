import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostList from "./PostList.js";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    fetch(process.env.REACT_APP_POSTS_URL)
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
      });
  };

  return (
    <div className="app">
      <Link to="/posts/new">
        <button className="btn_create">Создать пост</button>
      </Link>
      {posts ? <PostList list={posts} /> : null}
    </div>
  );
}
