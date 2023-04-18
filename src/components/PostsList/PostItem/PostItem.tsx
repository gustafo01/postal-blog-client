import React, { FC } from "react";
import { IPost } from "../../../models/IPost";
import scss from "./PostItem.module.scss";
import { Link } from "react-router-dom";

const PostItem: FC<IPost> = ({
  title,
  content,
  userId,
  avatarAuthorUrl,
  _id: postId,
}) => {
  return (
    <li>
      <Link to={postId} className={scss.postItem}>
        <div className={scss.textBox}>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        <div className={scss.imgBox}>
          <img src={avatarAuthorUrl} alt="#" />
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
