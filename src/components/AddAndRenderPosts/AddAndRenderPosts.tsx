import React, { useContext, useState, useEffect, FC, useRef } from "react";
import PostsList from "../../components/PostsList/PostsList";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import AddNewPost from "../../components/AddNewPost/AddNewPost";
import scss from "./AddAndRenderPosts.module.scss";

const AddAndRenderPosts: FC = () => {
  const { postStore } = useContext(Context);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (postStore.fetching) {
      postStore.getPosts();
    }
  }, [postStore.fetching]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", scrollHandler);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", scrollHandler);
      }
    };
  }, []);

  const scrollHandler = (e: Event) => {
    const { scrollTop, scrollHeight, clientHeight } =
      e.target as HTMLDivElement;
    if (
      scrollHeight - (scrollTop + clientHeight) < 100 &&
      postStore.posts.length < postStore.totalNumberOfPosts
    ) {
      postStore.setfetching(true);
    }
  };

  return (
    <div className={scss.container} ref={containerRef}>
      <AddNewPost />
      {postStore.posts.length > 0 ? (
        <PostsList posts={postStore.posts} />
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default observer(AddAndRenderPosts);
