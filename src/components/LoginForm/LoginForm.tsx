import React, { FC, useContext, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import scss from "./LoginForm.module.scss";
import { Link } from "react-router-dom";
import { HOME_ROUTE, REG_ROUTE } from "../../utils/consts";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userStore } = useContext(Context);
  
  return (
      <div className={scss.loginWrapper}>
        <div className={scss.inputsWrap}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div className={scss.btnsWrap}>
          <Link
            to={HOME_ROUTE}
            className={`btnNoBack`}
            onClick={() => userStore.login(email, password)}
          >
            Войти
          </Link>
          <Link
            to={REG_ROUTE}
            className={``}
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
  );
};

export default observer(LoginForm);
