import { IPost } from './../models/IPost';
import {AxiosResponse} from "axios"
import $api from '../http';

export default class PostServices {
    static async createPost(userId: string, title: string, content: string, avatarAuthorUrl:string): Promise<AxiosResponse<IPost>> {
        return $api.post<IPost>("/createPost", {userId, title, content, avatarAuthorUrl})
    }
    static async fetchPosts(currentPage:number, limit:number): Promise<AxiosResponse<IPost[]>> {
        return $api.get<IPost[]>(`/posts?limit=${limit}&page=${currentPage}`);
    }
}