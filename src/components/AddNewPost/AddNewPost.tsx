import React, { useContext, useState } from "react";
import { Context } from "../../index";
import scss from "./AddNewPost.module.scss";
import { observer } from "mobx-react-lite";

const AddNewPost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { userStore, postStore } = useContext(Context);

  return (
    <div className={scss.container}>
      <div className={scss.inputsWrap}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className={scss.input}
          placeholder="Заголовок"
        />
        <textarea
          className={scss.input}
          onChange={(e) => setContent(e.target.value)}
          cols={30}
          rows={10}
          placeholder="Текст"
        ></textarea>
      </div>
      <button
        onClick={() => postStore.createPost(title, content, userStore.user._id, userStore.user.avatarImg)}
      >
        Опубликовать
      </button>
    </div>
  );
};

export default observer(AddNewPost);
