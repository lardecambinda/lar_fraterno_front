export interface IPost {
  id: string;
  title: string;
  content: string;
  files: string[];
  user_id: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  status: "PUBLISHED" | "DRAFT";
  meeting_date: string | null;
  author?: IUser;
  users: { id: string; user_name: string } | null;
}

export interface IBook {
  title: string;
  description: string;
  link: string;
}

export interface IUser {
  id: string;
  email: string;
  user_name: string;
  role: "ADMIN" | "EDITOR";
  active: boolean;
  posts?: IPost[];
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ICreatePost {
  title: string;
  content: string;
  user_id: string;
  files?: string[];
  tags?: string[];
  status?: "PUBLISHED" | "DRAFT";
  meeting_date?: string | null;
}

export interface ITokenData {
  exp: number;
  iat: number;
  id: string;
  role: "ADMIN" | "EDITOR";
}

export interface IFile {
  file: File;
  fileDate: string;
  fileCategory: number;
}
