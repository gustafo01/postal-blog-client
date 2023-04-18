import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";

export default class UsersStore {
  users: IUser[] = [];
  totalNumberOfPosts: number = 0;
  currentPage: number = 1;
  fetching: boolean = true;
  limit: number = 5;
  currentUser:string = ""

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentUser(user:string) {
    this.currentUser = user
  }

  setUsers(users: IUser[]) {
    this.users = [...this.users, ...users];
  }

  setTotalNumberOfPosts(newCount: number) {
    this.totalNumberOfPosts = newCount;
  }

  setCurrentPage() {
    this.currentPage = this.currentPage + 1;
  }

  setfetching(fetch: boolean) {
    this.fetching = fetch;
  }

  findUser(userId: string) {
    return this.users.find((user) => user._id === userId);
  }

  async getUsers() {
    try {
      const response = await UserService.fetchUsers(this.currentPage, this.limit);

      this.setCurrentPage();
      this.setUsers(response.data);
      this.setfetching(false);
      this.setTotalNumberOfPosts(Number(response.headers["x-total-count"]));
    } catch (e) {
      console.log(e);
    }
  }
}
