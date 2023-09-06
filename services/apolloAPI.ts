import { ICreatePost, ILoginData } from "@/types/types";
import { api } from "./apolloAPIConfig";

export const getUsers = async () => {
  try {
    return (await api.get("/user/list")).data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const getPosts = async () => {
  try {
    return (await api.get("/post/list")).data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const createPost = async ({ title, content, user_id }: ICreatePost) => {
  try {
    return (
      await api.post("/post/create", { post: { title, content, user_id } })
    ).data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const signInRequest = async ({ email, password }: ILoginData) => {
  try {
    return (await api.post("/auth", { user: { email, password } })).data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const getUserById = async (id: string) => {
  try {
    return (await api.get(`/user/${id}`)).data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};
