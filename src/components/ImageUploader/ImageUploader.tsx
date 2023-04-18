import React, { useState, useContext, FC } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import scss from "./ImageUploader.module.scss";

interface ImageUploder {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  changeImg(img: string, id: string): void;
}

const ImageUploader: FC<ImageUploder> = ({ setIsOpen, title, changeImg}) => {
  const { userStore } = useContext(Context);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile!);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qqoz5occ");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/drotdtpmo/image/upload",
      formData
    );
    const url = response.data.secure_url;

    changeImg.call(userStore, url, userStore.user._id);
  };

  return (
    <div className={scss.modal} onClick={() => setIsOpen(false)}>
      <div className={scss.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handleFileUpload}>Загрузить</button>
        {file && (
          <div className={scss.imgBlock}>
            <img src={URL.createObjectURL(file)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(ImageUploader);
