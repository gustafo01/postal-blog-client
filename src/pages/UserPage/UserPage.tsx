import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import scss from "./UserPage.module.scss";

const UserPage = () => {
  const { userId } = useParams();
  const { usersStore } = useContext(Context);
  const currentUser = usersStore.findUser(userId!);

  return (
    <div className={scss.container}>
      <h1>{currentUser?.firstname}</h1>
    </div>
  );
};

export default UserPage;
