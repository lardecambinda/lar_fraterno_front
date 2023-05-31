export interface Post {
  title: string;
  content: string;
  files: string[];
  user_id: string;
  date: string;
  CreatedAt: string;
  categories: string[];
  tags: string[];
}

export interface Book {
  title: string;
  description: string;
  link: string;
}
