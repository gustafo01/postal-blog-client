import React, {FC} from "react";
import { IUser } from "../../models/IUser";
import UserItem from "./UserItem/UserItem";

interface IUsers {
    users: IUser[]
}

const UsersList:FC<IUsers> = ({ users }) => {
  return (
    <ul>
      {users?.map((user: IUser) => (
        <UserItem key={user._id} {...user} />
      ))}
    </ul>
  );
};

export default UsersList;
