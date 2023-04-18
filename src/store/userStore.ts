import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IAuthResponse } from "../models/response/IAuthResponse";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { IUser } from "../models/IUser";

export default class UserStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }
  async registration(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    dateOfBirth: string,
    avatarImg: string,
    backgroundImg: string
  ) {
    try {
      const response = await AuthService.registration(
        email,
        password,
        firstname,
        lastname,
        dateOfBirth,
        avatarImg,
        backgroundImg
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }
  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async changeAvatar(avatarImg: string, id: string) {
    try {
      const response = await UserService.changeAvatar(avatarImg, id);
      const user: any = response.data;
      this.setUser(user);
    } catch (e) {
      console.log(e);
    }
  }

  async changeBackgroundImg(backgroundImg: string, id: string) {
    try {
      const response = await UserService.changeBackgroundImg(backgroundImg, id);
      const user: any = response.data;
      this.setUser(user);
    } catch (e) {
      console.log(e);
    }
  }
}
