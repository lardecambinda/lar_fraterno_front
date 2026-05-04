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

export const getPosts = async (params?: { month?: number; year?: number; tag?: string; title?: string }) => {
  try {
    return (await api.get("/post/list", { params })).data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const createPost = async ({ title, content, user_id, files = [], tags = [], status = "DRAFT", meeting_date }: ICreatePost) => {
  try {
    const data = (
      await api.post("/post/create", { post: { title, content, user_id, files, tags, status, meeting_date } })
    ).data;

    toast("Publicação criada com sucesso", { theme: "light", type: "default", hideProgressBar: true });
    return data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const updatePost = async (id: string, fields: Partial<ICreatePost>) => {
  try {
    const data = (await api.put(`/post/${id}`, { post: fields })).data;
    toast("Publicação atualizada", { theme: "light", type: "default", hideProgressBar: true });
    return data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const deletePost = async (id: string) => {
  try {
    await api.delete(`/post/${id}`);
    toast("Publicação removida", { theme: "light", type: "default", hideProgressBar: true });
    return true;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const registerUser = async (data: { email: string; password: string; user_name: string; role: string }) => {
  try {
    return (await api.post("/user/register", { user: data })).data;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao cadastrar usuário";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao cadastrar usuário", { theme: "light", type: "error", hideProgressBar: true });
    }
    return null;
  }
};

export const updateUser = async (id: string, data: { email?: string; user_name?: string; role?: string }) => {
  try {
    return (await api.put(`/user/${id}`, { user: data })).data;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao atualizar usuário";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao atualizar usuário", { theme: "light", type: "error", hideProgressBar: true });
    }
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await api.delete(`/user/${id}`);
    toast("Usuário removido", { theme: "light", type: "default", hideProgressBar: true });
    return true;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao remover usuário";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao remover usuário", { theme: "light", type: "error", hideProgressBar: true });
    }
    return false;
  }
};

export const toggleUserStatus = async (id: string) => {
  try {
    return (await api.patch(`/user/${id}/toggle`)).data;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao alterar status do usuário";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao alterar status do usuário", { theme: "light", type: "error", hideProgressBar: true });
    }
    return null;
  }
};

export const signInRequest = async ({ email, password }: ILoginData) => {
  try {
    return (await api.post("/auth", { user: { email, password } })).data;
  } catch (error: any) {
    try {
      const errorMessage = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao fazer login";
      toast(errorMessage, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao fazer login", { theme: "light", type: "error", hideProgressBar: true });
    }
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return (await api.get(`/user/${id}`)).data;
  } catch (error: any) {
    console.log(error.request?.response || error.message);
    throw error;
  }
};

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  try {
    const { data } = await api.post("/post/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.urls as string[];
  } catch (error: any) {
    toast("Erro ao fazer upload dos arquivos", { type: "error", theme: "light", hideProgressBar: true });
    return [];
  }
};

export const getCategories = async () => {
  try {
    return (await api.get("/category/list")).data;
  } catch (error: any) {
    return console.log(error.request.response);
  }
};

export const createCategory = async (name: string) => {
  try {
    return (await api.post("/category", { category: { name } })).data;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao criar categoria";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao criar categoria", { theme: "light", type: "error", hideProgressBar: true });
    }
    return null;
  }
};

export const updateCategory = async (id: string, name: string) => {
  try {
    return (await api.put(`/category/${id}`, { category: { name } })).data;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao atualizar categoria";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao atualizar categoria", { theme: "light", type: "error", hideProgressBar: true });
    }
    return null;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await api.delete(`/category/${id}`);
    toast("Categoria removida", { theme: "light", type: "default", hideProgressBar: true });
    return true;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao remover categoria";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao remover categoria", { theme: "light", type: "error", hideProgressBar: true });
    }
    return false;
  }
};
