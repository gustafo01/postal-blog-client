import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { LOGIN_ROUTE } from "../../utils/consts";
import scss from "./RegForm.module.scss";

const RegForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [dateOfBirth, setdateOfBirth] = useState<string>("");

  const avatarImg =
    "https://res.cloudinary.com/drotdtpmo/image/upload/v1663739367/Upstream-1_kkjicc.png";
  const backgroundImg =
    "https://res.cloudinary.com/drotdtpmo/image/upload/v1680087262/p0lbnaq5xjvjydkdq9p8.jpg";

  const { userStore } = useContext(Context);

  return (
    <div className={scss.regWrapper}>
      <div className={scss.inputsWrap}>
        <input
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          type="text"
          placeholder="Имя"
        />
        <input
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          type="text"
          placeholder="Фамилия"
        />
        <input
          type="date"
          onChange={(e) => setdateOfBirth(e.target.value)}
          value={dateOfBirth}
        ></input>
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
        <button
          className={``}
          onClick={() =>
            userStore.registration(
              email,
              password,
              firstname,
              lastname,
              dateOfBirth,
              avatarImg,
              backgroundImg,
            )
          }
        >
          Регистрация
        </button>
        <Link to={LOGIN_ROUTE}>Назад</Link>
      </div>
    </div>
  );
};

export default observer(RegForm);
