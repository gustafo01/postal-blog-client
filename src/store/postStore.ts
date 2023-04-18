import { IPost } from "../models/IPost";
import { makeAutoObservable } from "mobx";
import PostServices from "../services/PostServices";

export default class PostStore {
  posts: IPost[] = [];
  totalNumberOfPosts: number = 0;
  currentPage: number = 1;
  fetching: boolean = true;
  limit: number = 5;

  constructor() {
    makeAutoObservable(this);
  }

  setPosts(posts: IPost[]) {
    this.posts = [...this.posts, ...posts];
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

  findPost(postId: string) {
    return this.posts.find((post) => post._id === postId);
  }

  async createPost(
    title: string,
    content: string,
    userId: string,
    avatarAuthorUrl: string
  ) {
    try {
      const response = await PostServices.createPost(
        userId,
        title,
        content,
        avatarAuthorUrl
      );
    } catch (e) {
      console.log(e);
    }
  }

  async getPosts() {
    try {
      const response = await PostServices.fetchPosts(
        this.currentPage,
        this.limit
      );
      this.setCurrentPage();
      this.setPosts(response.data);
      this.setfetching(false);
      this.setTotalNumberOfPosts(Number(response.headers["x-total-count"]));
    } catch (e) {
      console.log(e);
    }
  }
}
