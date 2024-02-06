import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [post, setPost] = useState("");
  const navigate = useNavigate();

  const onClose = () => navigate("/");

  const onFieldChange = (e) => {
    const { target } = e;
    setPost(target.value);
  };

  const onSubmit = () => {
    if (post === "") {
      onClose();
      return;
    }

    fetch(process.env.REACT_APP_POSTS_URL, {
      method: "POST",
      body: JSON.stringify({ content: post, id: 0 }),
    }).then(onClose());
  };

  return (
    <div className="app">
      <textarea
        className="input_text"
        value={post}
        onChange={onFieldChange}
        placeholder="Введите текст..."
      />
      <button className="btn_post" onClick={onSubmit}>Опубликовать</button>
      <button className="btn_close" onClick={onClose}>Закрыть</button>
    </div>
  );
}
