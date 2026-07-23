"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/services/apolloAPI";
import { IPost } from "@/types/types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar/Avatar";
import FileViewer from "@/components/FileViewer/FileViewer";

export default function ReuniaoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [post, setPost] = useState<IPost | null>(null);
  const router = useRouter();

  useEffect(() => {
    getPosts().then((data: IPost[]) => {
      const found = data?.find((p) => p.id === params.id);
      if (found) setPost(found);
    });
  }, []);

  if (!post)
    return (
      <div className="max-w-[600px] mx-auto py-8 text-gray-400">
        Carregando...
      </div>
    );

  return (
    <div className="max-w-[100%] mx-auto py-8 flex flex-col gap-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--secondary)] w-fit"
      >
        <ArrowLeft size={16} /> Voltar
      </button>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <Avatar name={post.users?.user_name ?? "Anônimo"} />
          <div>
            <p className="font-semibold text-sm">
              {post.users?.user_name ?? "Anônimo"}
            </p>
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
          </div>
        </div>

        <div className="px-5 pb-4">
          <h1 className="font-bold text-xl text-[var(--black)] mb-3">
            {post.title}
          </h1>
          <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {post.content}
          </p>
        </div>

        {post.meeting_date && (
          <div className="px-5 pb-3">
            <p className="text-xs text-gray-500">
              Reunião:{" "}
              <strong>
                {new Date(post.meeting_date).toLocaleDateString("pt-BR")}
              </strong>
            </p>
          </div>
        )}

        {post.files?.length > 0 && (
          <div className="px-5 pb-4 flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-500">
              Anexos ({post.files.length})
            </p>
            {post.files.map((url, i) => (
              <FileViewer key={i} url={url} />
            ))}
          </div>
        )}

        {post.tags?.length > 0 && (
          <div className="px-5 pb-4 flex flex-wrap gap-1">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-[var(--violet)] px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
