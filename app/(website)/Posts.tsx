"use client";
import { useEffect, useState } from "react";
import { IPost } from "@/types/types";
import { getPosts } from "@/services/apolloAPI";
import formatCreatedAt from "@/utils/formatCreatedAt";

export default function Posts() {
  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);

  useEffect(() => {
    getPosts().then((data) => setPosts(data as IPost[]));
  }, []);

  if (!posts) return <p className="text-sm text-gray-400">Carregando...</p>;
  if (posts.length === 0) return <p className="text-sm text-gray-400">Nenhuma publicação.</p>;

  return (
    <div className="flex flex-col gap-4">
      {posts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((post) => (
          <div key={post.id} className="border-b pb-4 last-of-type:border-none">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm line-clamp-3 text-gray-600">{post.content}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
              <span>{formatCreatedAt(post.createdAt)}</span>
              {post.users && <span>· {post.users.user_name}</span>}
            </div>
          </div>
        ))}
    </div>
  );
}
