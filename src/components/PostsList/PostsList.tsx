import React, { useContext, FC } from "react";
import { observer } from "mobx-react-lite";
import { IPost } from "../../models/IPost";
import PostItem from "./PostItem/PostItem";
import scss from "./PostsList.module.scss";

interface IPosts {
  posts: IPost[]
}

const PostsList:FC<IPosts> = ({posts}) => {

  return (
    <div>
      <ul className={scss.postsList}>
        {posts?.map((post:IPost) => <PostItem key={post._id} {...post}/>)}
      </ul>
    </div>
  );
};

export default observer(PostsList);
