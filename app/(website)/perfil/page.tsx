"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/services/apolloAPI";
import { IPost } from "@/types/types";
import { parseCookies } from "nookies";
import * as jwt from "jsonwebtoken";
import { ITokenData } from "@/types/types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function PerfilPage() {
  const [myPosts, setMyPosts] = useState<IPost[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const { "lar-fraterno_token": token } = parseCookies();
    if (!token) { router.push("/login"); return; }
    const decoded = jwt.decode(token) as ITokenData;

    getPosts().then((data: IPost[]) => {
      if (data) setMyPosts(data.filter((p) => p.user_id === decoded.id));
    });
  }, []);

  if (!user) return null;

  const initials = user.user_name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="max-w-[600px] mx-auto py-8 flex flex-col gap-6">
      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-lg text-[var(--black)]">{user.user_name}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
          <span className="text-xs bg-[var(--violet)] px-2 py-0.5 rounded-full mt-1 inline-block">
            {user.role === "ADMIN" ? "Administrador" : "Membro"}
          </span>
        </div>
      </div>

      {/* My posts */}
      <div>
        <h2 className="font-semibold text-[var(--black)] mb-3 px-1">Minhas publicações ({myPosts.length})</h2>
        {myPosts.length === 0 && <p className="text-gray-400 text-sm px-1">Nenhuma publicação ainda.</p>}
        <div className="flex flex-col gap-3">
          {myPosts.map((post) => (
            <div key={post.id}
              onClick={() => router.push(`/feed/${post.id}`)}
              className="bg-white rounded-2xl border border-gray-100 px-5 py-4 cursor-pointer hover:shadow-sm transition-shadow">
              <p className="font-semibold text-sm text-[var(--black)]">{post.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ptBR })}
              </p>
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map((t, i) => (
                    <span key={i} className="text-xs bg-[var(--violet)] px-2 py-0.5 rounded-full">#{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
