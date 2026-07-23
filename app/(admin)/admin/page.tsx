"use client";
import Infocard from "./Infocard";
import useAuth from "@/hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { IPost, IUser } from "@/types/types";
import PostsContainer from "./PostsContainer";
import { getPosts, getUsers, getCategories } from "@/services/apolloAPI";
import {
  Users,
  File,
  Tag,
  UserPlus,
  FilePlus2,
  Loader2,
  Mic,
} from "lucide-react";
import Link from "next/link";

export default function page() {
  const { user, authLoading } = useAuth();
  const [users, setUsers] = useState<IUser[]>();
  const [posts, setPosts] = useState<IPost[]>();
  const [categories, setCategories] = useState<any[]>([]);

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
      getCategories()
        .then((data) => setCategories(data || []))
        .catch((error) => {
          console.error("Erro ao carregar categorias:", error);
          setCategories([]);
        });
      if (user.role === "ADMIN") {
        getUsers()
          .then((data) => setUsers(data))
          .catch((error) => {
            console.error("Erro ao carregar usuários:", error);
            setUsers([]);
          });
      }
    }
  }, [user, loadPosts]);

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="pb-[100px] md:pb-0 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Bem-vindo, {user?.user_name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Infocard
          title="Publicações"
          number={posts?.length}
          Icon={<File strokeWidth={1.5} color="#9333EA" />}
        />
        <Infocard
          title="Categorias"
          number={categories.length}
          Icon={<Tag strokeWidth={1.5} color="#9333EA" />}
        />
        {user?.role === "ADMIN" && (
          <Infocard
            title="Usuários"
            number={users?.length}
            Icon={<Users strokeWidth={1.5} color="#9333EA" />}
          />
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/admin/add-new-post"
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <FilePlus2 className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Nova Publicação</p>
                <p className="text-xs text-gray-500">Criar post</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/categories"
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <Tag className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Categorias</p>
                <p className="text-xs text-gray-500">Gerenciar</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/transcriptions"
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <Mic className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Transcrições</p>
                <p className="text-xs text-gray-500">Transcrever áudio</p>
              </div>
            </div>
          </Link>

          {user?.role === "ADMIN" && (
            <>
              <Link
                href="/admin/users/new"
                className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <UserPlus className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Novo Usuário</p>
                    <p className="text-xs text-gray-500">Cadastrar</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/users"
                className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                    <Users className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Usuários</p>
                    <p className="text-xs text-gray-500">Gerenciar</p>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <PostsContainer posts={posts} onRefresh={loadPosts} />
      </div>
    </div>
  );
}
