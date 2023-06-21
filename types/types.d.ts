export interface IPost {
  id: number;
  title: string;
  content: string;
  files: string[];
  author_id: number;
  date: string;
  createdAt: string;
  tags: string[];
  author?: IUser;
}

export interface IBook {
  title: string;
  description: string;
  link: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  role: string;
  posts?: IPost[];
}

export interface ILoginData {
  email: string;
  password: string;
}
