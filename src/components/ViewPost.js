import React from "react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ViewPost() {
  const [post, setPost] = useState({});
  const [editPost, setEditPost] = useState({});
  const [mode, setMode] = useState("view");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    fetch(process.env.REACT_APP_POSTS_URL)
      .then((response) => response.json())
      .then((res) => {
        setPost(res.find((el) => el.id === Number(params.postId)));
      });
  };

  const onClose = () => navigate("/");

  const onStartEdit = () => {
    setEditPost(post);
    setMode("edit");
  };

  const onRemove = () => {
    fetch(`${process.env.REACT_APP_POSTS_URL}/${params.postId}`, {
      method: "DELETE",
    }).then(onClose());
  };

  const onFieldChange = (e) => {
    const { target } = e;
    setEditPost((prev) => ({ ...prev, content: target.value }));
  };
  const onSubmit = () => {
    if (editPost === "") {
      return;
    }

    fetch(process.env.REACT_APP_POSTS_URL, {
      method: "POST",
      body: JSON.stringify({ content: editPost.content, id: editPost.id }),
    })
      .then(setMode("view"))
      .then(getNotes());
  };

  const onEndEdit = () => {
    setMode("view");
  };

  return (
    <div className="app">
      {mode == "view" ? (
      <div className="post_item">
        <div className="item_header">
          <img className="header_img" src="http://via.placeholder.com/30x30" />
          <div className="header_info">
            <label className="header_title">Name</label>
            <div className="header_subtitle">
              <label className="header_desc">Description</label>
              &middot;
              <label className="header_created"> {moment(post.created).fromNow()} </label>
            </div>
          </div>
        </div>
        <div className="item_text">{post.content}</div>
        <button className="btn_edit" onClick={onStartEdit}>Изменить</button>
        <button className="btn_delete" onClick={onRemove}>Удалить</button>
      </div>
      ):(
        <div className="post_edit">
          <textarea
            className="input_text"
            value={editPost.content}
            onChange={onFieldChange}
            placeholder="Введите текст..."
          />
            <button className="btn_edit" onClick={onSubmit}>Сохранить</button>
            <button className="btn_close" onClick={onEndEdit}>Закрыть</button>
        </div>
      )}
    </div>
  );
}
