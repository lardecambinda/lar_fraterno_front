import { ICreatePost, ILoginData, ITranscription } from "@/types/types";
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

export const uploadAudio = async (file: File): Promise<ITranscription | null> => {
  const formData = new FormData();
  formData.append("audio", file);
  try {
    const { data } = await api.post("/transcription/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast("Áudio enviado com sucesso", { theme: "light", type: "default", hideProgressBar: true });
    return data as ITranscription;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao enviar áudio";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao enviar áudio", { theme: "light", type: "error", hideProgressBar: true });
    }
    return null;
  }
};

export const getTranscriptions = async (): Promise<ITranscription[]> => {
  try {
    const { data } = await api.get("/transcription/list");
    return data as ITranscription[];
  } catch (error: any) {
    toast("Erro ao carregar transcrições", { theme: "light", type: "error", hideProgressBar: true });
    return [];
  }
};

export const getTranscription = async (id: string): Promise<ITranscription | null> => {
  try {
    const { data } = await api.get(`/transcription/${id}`);
    return data as ITranscription;
  } catch (error: any) {
    toast("Erro ao carregar transcrição", { theme: "light", type: "error", hideProgressBar: true });
    return null;
  }
};

export const cancelTranscription = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/transcription/${id}/cancel`);
    toast("Transcrição cancelada", { theme: "light", type: "default", hideProgressBar: true });
    return true;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao cancelar transcrição";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao cancelar transcrição", { theme: "light", type: "error", hideProgressBar: true });
    }
    return false;
  }
};

export const deleteTranscription = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/transcription/${id}`);
    toast("Transcrição removida", { theme: "light", type: "default", hideProgressBar: true });
    return true;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao remover transcrição";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao remover transcrição", { theme: "light", type: "error", hideProgressBar: true });
    }
    return false;
  }
};

export const generatePasswordResetToken = async (userId: string): Promise<{ token: string; expires_at: string } | null> => {
  try {
    const { data } = await api.post(`/user/${userId}/reset-password-token`);
    return data;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao gerar link de redefinição";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao gerar link de redefinição", { theme: "light", type: "error", hideProgressBar: true });
    }
    return null;
  }
};

export const validatePasswordResetToken = async (token: string): Promise<{ valid: boolean; email?: string; user_name?: string; error_message?: string }> => {
  try {
    const { data } = await api.get("/auth/validate-reset-token", { params: { token } });
    return data;
  } catch (error: any) {
    try {
      const data = JSON.parse(error.request?.response || "{}");
      return { valid: false, error_message: data.error_message || "Link de redefinição inválido" };
    } catch {
      return { valid: false, error_message: "Link de redefinição inválido" };
    }
  }
};

export const resetPassword = async (token: string, new_password: string): Promise<boolean> => {
  try {
    await api.post("/auth/reset-password", { token, new_password });
    return true;
  } catch (error: any) {
    try {
      const msg = JSON.parse(error.request?.response || "{}").error_message ?? "Erro ao redefinir senha";
      toast(msg, { theme: "light", type: "error", hideProgressBar: true });
    } catch {
      toast("Erro ao redefinir senha", { theme: "light", type: "error", hideProgressBar: true });
    }
    return false;
  }
};

