import { IUser } from "./../models/IUser";
import $api from "../http";
import { AxiosResponse } from "axios";
import AuthService from "./AuthService";
import { IAuthResponse } from "../models/response/IAuthResponse";

export default class UserService extends AuthService {
  
  static fetchUsers(currentPage:number,limit:number): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>(`/users?limit=${limit}&page=${currentPage}`);
  }

  static async changeAvatar(
    avatarImg: string,
    id: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.put<IAuthResponse>("/changeAvatar", { avatarImg, id });
  }

  static async changeBackgroundImg(
    backgroundImg: string,
    id: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.put<IAuthResponse>("/changeBackgroundImg", {
      backgroundImg,
      id,
    });
  }
}
