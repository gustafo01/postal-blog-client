import React, { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../models/IUser";
import scss from "./UserItem.module.scss";
import { Context } from "../../..";
import { CHAT_ROUTE } from "../../../utils/consts";

const UserItem: FC<IUser> = ({
  _id: userId,
  firstname,
  lastname,
  dateOfBirth,
  avatarImg,
}) => {
  const { userStore, usersStore } = useContext(Context);
  const navigate = useNavigate();
  const chatId = userStore.user._id + userId;

  const handleClick = (e: any) => {
    e.preventDefault();
    usersStore.setCurrentUser(userId);
    navigate(`/home/${CHAT_ROUTE}/${chatId}`);
  };

  return (
    <li>
      <Link to={userId} className={scss.userItem}>
        <div className={scss.textBox}>
          <h3>{`${firstname} ${lastname}`}</h3>
          <p>{dateOfBirth}</p>
        </div>
        <div className={scss.imgBox}>
          <img src={avatarImg} alt="#" />
        </div>
      </Link>
      <Link
        to={chatId}
        onClick={(e) => handleClick(e)}
        className={scss.messageBtn}
      >
        Написати
      </Link>
    </li>
  );
};

export default UserItem;
