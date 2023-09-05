import { ICreatePost, ILoginData } from "@/types/types";

import { api } from "./apolloAPIConfig";

export const getUsers = async () => {
  // if (!token) {
  //   return console.log("Not logged in...");
  // }

  try {
    return (await api.get("/user/list")).data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPosts = async () => {
  // if (!token) {
  //   return console.log("Not logged in...");
  // }

  try {
    return (await api.get("/post/list")).data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createPost = async ({ title, content }: ICreatePost) => {
  try {
    return (await api.post("/post/create", { post: { title, content } })).data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInRequest = async ({ email, password }: ILoginData) => {
  try {
    return (await api.post("/auth", { user: { email, password } })).data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    return (await api.get(`/user/${id}`)).data;
  } catch (error: any) {
    throw new Error(error);
  }
};
