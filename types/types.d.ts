export interface IPost {
  id: string;
  title: string;
  content: string;
  files: string[];
  user_id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  author?: IUser;
  users: { user_id: string; user_name: string };
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
  role: string;
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
}

export interface ITokenData {
  exp: number;
  iat: number;
  id: string;
  role: "ADMIN" | "USER";
}

export interface IFiles {
  File: File;
  fileDate: string;
  fileCategory: number;
}
