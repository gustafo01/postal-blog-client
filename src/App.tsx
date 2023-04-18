import React, { FC, useContext, useEffect } from "react";
import "./static/styles/globalStyles.scss";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REG_ROUTE } from "./utils/consts";
import HomePage from "./pages/HomePage/HomePage";
import RegForm from "./components/RegForm/RegForm";
import LoginForm from "./components/LoginForm/LoginForm";

const App: FC = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

  if(userStore.isLoading) return <div className="loader"></div>

  return !userStore.isAuth ? (
    <main className="authForm">
      <Routes>
        <Route path={LOGIN_ROUTE} element={<LoginForm />} />
        <Route path={REG_ROUTE} element={<RegForm />} />
        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </main>
  ) : (
    <Routes>
      <Route path={HOME_ROUTE} element={<HomePage />} />
      <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
    </Routes>
  );
};

export default observer(App);
