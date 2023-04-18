import React, { useContext, useEffect, useRef } from "react";
import UsersList from "../UsersList/UsersList";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import scss from "./SearchAndRenderUsers.module.scss";

const SearchAndRenderUsers = () => {
  const { usersStore } = useContext(Context);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (usersStore.fetching) {
        usersStore.getUsers();
    }
  }, [usersStore.fetching]);

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
      usersStore.users.length < usersStore.totalNumberOfPosts
    ) {
        usersStore.setfetching(true);
    }
  };

  return (
    <div ref={containerRef} className={scss.container}>
      {usersStore.users.length > 0 ? (
        <UsersList users={usersStore.users} />
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default observer(SearchAndRenderUsers);
