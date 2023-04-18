import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PostStore from "./store/postStore";
import UserStore from "./store/userStore";
import UsersStore from "./store/usersStore";
import MessagesStore from "./store/messagesStore";

interface IState {
  userStore: UserStore;
  postStore: PostStore;
  usersStore: UsersStore;
  messagesStore: MessagesStore
}

export const userStore = new UserStore();
export const postStore = new PostStore();
export const usersStore = new UsersStore();
export const messagesStore = new MessagesStore();

export const Context = createContext<IState>({
  userStore,
  postStore,
  usersStore,
  messagesStore
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider
    value={{
      userStore,
      postStore,
      usersStore,
      messagesStore
    }}
  >
    <div className="wrapper">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </Context.Provider>
);
