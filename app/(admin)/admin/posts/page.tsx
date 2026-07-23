"use client";
import React, { useCallback, useEffect, useState } from "react";
import PostsContainer from "../PostsContainer";
import { IPost } from "@/types/types";
import { getPosts } from "@/services/apolloAPI";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<IPost[]>();
  const router = useRouter();
  const loadPosts = useCallback(() => {
    getPosts()
      .then((data) => {
        const allPosts = data as IPost[];
        // Se for EDITOR, mostrar apenas seus próprios posts
        if (user?.role === "EDITOR") {
          setPosts(allPosts.filter((post) => post.user_id === user.id));
        } else {
          setPosts(allPosts);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar posts:", error);
        setPosts([]);
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [user, loadPosts]);

  return (
    <>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--secondary)] w-fit mb-4"
      >
        <ArrowLeft size={16} /> Voltar
      </button>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <h1 className="text-lg font-semibold mb-4">Publicações</h1>

        <Link
          href="/admin/add-new-post"
          className="text-sm text-white bg-accent flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-colors"
        >
          <PlusCircle size={18} />
          <span className="hidden sm:block">Criar Publicação</span>
        </Link>
      </div>
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <PostsContainer posts={posts} onRefresh={loadPosts} showTitle={false} />
      </div>
    </>
  );
};

export default page;
