import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../../index";
import ImageUploader from "../ImageUploader/ImageUploader";
import scss from "./Sidebar.module.scss";

const Sidebar = () => {
  const [isOpenAvatarImg, setIsOpenAvatarImg] = useState<boolean>(false);
  const [isOpenBackgroundImg, setIsOpenBackgroundImg] =
    useState<boolean>(false);
  const { userStore } = useContext(Context);
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true)
  return (
    <div className={`${scss.sidebar} ${isOpenSidebar ? null : scss.active}`}>
      {isOpenAvatarImg && (
        <ImageUploader
          setIsOpen={setIsOpenAvatarImg}
          title={"Изменить фото профиля"}
          changeImg={userStore.changeAvatar}
        />
      )}
      {isOpenBackgroundImg && (
        <ImageUploader
          setIsOpen={setIsOpenBackgroundImg}
          title={"Изменить задний фон"}
          changeImg={userStore.changeBackgroundImg}
        />
      )}
      <div className={scss.sidebarContent}>
        <div className={scss.userInfo}>
          <div
            className={scss.backgroundUser}
            onClick={() => setIsOpenBackgroundImg(true)}
          >
            <img src={userStore.user.backgroundImg} alt="#" />
          </div>
          <div
            className={scss.imgBlock}
            onClick={() => setIsOpenAvatarImg(true)}
          >
            <img src={userStore.user.avatarImg} alt="#" />
          </div>
        </div>
        <span>{`${userStore.user.firstname} ${userStore.user.lastname}`}</span>
        <button
          className={`navBtn navBtnLogout`}
          onClick={() => userStore.logout()}
        >
          Выйти
        </button>
        <button onClick={() => setIsOpenSidebar(!isOpenSidebar)}>xxxxx</button>
      </div>
    </div>
  );
};

export default observer(Sidebar);
