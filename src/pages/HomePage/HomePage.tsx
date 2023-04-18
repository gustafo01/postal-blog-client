import React, { FC } from "react";
import scss from "./HomePage.module.scss";
import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavBar from "../../components/NavBar/NavBar";
import { CHAT_ROUTE, NEWS_ROUTE, PROFILE_ROUTE, USERS_ROUTE } from "../../utils/consts";
import ProfilePage from "../ProfilePage/ProfilePage";
import PostPage from "../PostPage/PostPage";
import AddAndRenderPosts from "../../components/AddAndRenderPosts/AddAndRenderPosts";
import SearchAndRenderUsers from "../../components/SearchAndRenderUsers/SearchAndRenderUsers";
import UserPage from "../UserPage/UserPage";
import ChatPage from "../ChatPage/ChatPage";

const HomePage: FC = () => {
  return (
    <main className={scss.main}>
      <Sidebar />
      <div className={scss.container}>
        <NavBar />
        <Routes>
          <Route path={PROFILE_ROUTE} element={<ProfilePage />} />
          <Route path={USERS_ROUTE} element={<Outlet/>}>
            <Route index element={<SearchAndRenderUsers/>} />
            <Route path={":userId"} element={<UserPage />} />
          </Route>
          <Route path={NEWS_ROUTE} element={<Outlet/>}>
            <Route index element={<AddAndRenderPosts/>} />
            <Route path={":postId"} element={<PostPage />} />
          </Route>
          <Route path={`${CHAT_ROUTE}/:chatId`} element={<ChatPage />} />
          {/* <Route path={CHAT_ROUTE} element={<Outlet/>}>
            <Route path={":chatId"} element={<ChatPage />} />
          </Route> */}
          <Route path="*" element={<Navigate to={NEWS_ROUTE} />} />
        </Routes>
      </div>
    </main>
  );
};

export default observer(HomePage);
