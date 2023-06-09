export interface Post {
  id: number;
  title: string;
  content: string;
  files: string[];
  author_id: string;
  date: string;
  CreatedAt: string;
  tags: string[];
  author?: {
    username: string;
    email: string;
    role: string;
  };
}

export interface Book {
  title: string;
  description: string;
  link: string;
}
