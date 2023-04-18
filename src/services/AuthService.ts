import $api from "../http";
import { AxiosResponse } from "axios";
import { IAuthResponse } from "../models/response/IAuthResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    dateOfBirth: string,
    avatarImg: string,
    backgroundImg: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>("/registration", {
      email,
      password,
      firstname,
      lastname,
      dateOfBirth,
      avatarImg,
      backgroundImg,
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
