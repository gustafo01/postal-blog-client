import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../..";
import scss from "./ChatPage.module.scss";
import { observer } from "mobx-react-lite";

const ChatPage = () => {
  const { userStore, usersStore, messagesStore } = useContext(Context);
  const socket = useRef();

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8080");

    socket.current.onopen = () => {
      socket.current.send(
        JSON.stringify({
          event: "connection",
          from: userStore.user._id,
          to: usersStore.currentUser,
        })
      );
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      messagesStore.setMessages(message);
      console.log(message)
    };
    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Socket произошла ошибка");
    };
  }, []);

  const sendMessage = async () => {
    const message = {
      event: "message",
      from: userStore.user._id,
      to: usersStore.currentUser,
      message: messagesStore.typedMessage,
    };
    socket.current.send(JSON.stringify(message));
    messagesStore.setTypedMessage("");
  };

  return (
    <div className={scss.container}>
      <ul className={scss.messages}>
        {messagesStore.messages.map((mess) => (
          <li
            key={mess._id}
            className={`${scss.message} ${
              mess.from === userStore.user._id ? scss.from : scss.to
            }`}
          >
            <p>{mess.message}</p>
          </li>
        ))}
      </ul>
      <div className={scss.form}>
        <input
          value={messagesStore.typedMessage}
          onChange={(e) => messagesStore.setTypedMessage(e.target.value)}
          type="text"
        />
        <button onClick={sendMessage} className={scss.sendBtn}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default observer(ChatPage);
