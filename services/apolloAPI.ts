import { ICreatePost, ILoginData } from "@/types/types";
import { api } from "./apolloAPIConfig";
import { toast } from "react-toastify";

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
    const data = (
      await api.post("/post/create", { post: { title, content, user_id } })
    ).data;

    toast("Publicação criada com sucesso", {
      theme: "light",
      type: "default",
      hideProgressBar: true,
    });

    return data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const signInRequest = async ({ email, password }: ILoginData) => {
  try {
    return (await api.post("/auth", { user: { email, password } })).data;
  } catch (error: any) {
    const errorMessage = JSON.parse(error.request.response).error_message;

    toast(errorMessage, {
      theme: "light",
      type: "error",
      hideProgressBar: true,
    });

    return console.log(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    return (await api.get(`/user/${id}`)).data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};
