import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import scss from "./PostPage.module.scss";

const PostPage = () => {
  const { postId } = useParams();
  const { postStore } = useContext(Context);
  const currentPost = postStore.findPost(postId!);

  return (
    <div className={scss.container}>
      <h1>{currentPost?.title}</h1>
    </div>
  );
};

export default PostPage;
