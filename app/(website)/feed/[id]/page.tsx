"use client";
import { useEffect, useState } from "react";
import { getPosts, createComment } from "@/services/apolloAPI";
import { IPost } from "@/types/types";
import { parseCookies } from "nookies";
import * as jwt from "jsonwebtoken";
import { ITokenData } from "@/types/types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Send, FileText, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function Avatar({ name }: { name: string }) {
  const initials = name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "?";
  return (
    <div className="w-9 h-9 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
      {initials}
    </div>
  );
}

function FileViewer({ url }: { url: string }) {
  const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url);
  const isDoc = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i.test(url);
  if (isImage) return <img src={url} alt="anexo" className="w-full rounded-xl object-cover" />;
  if (isDoc) return (
    <div className="flex flex-col gap-1">
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
        className="w-full h-[600px] rounded-xl border border-gray-100"
      />
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="text-xs text-[var(--secondary)] hover:underline self-end">
        Abrir em nova aba ↗
      </a>
    </div>
  );
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:underline">
      <FileText size={15} /> Ver arquivo
    </a>
  );
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { "lar-fraterno_token": token } = parseCookies();
    if (!token) { router.push("/login"); return; }
    const decoded = jwt.decode(token) as ITokenData;
    setUserId(decoded?.id ?? "");

    getPosts().then((data: IPost[]) => {
      const found = data?.find((p) => p.id === params.id);
      if (found) {
        setPost(found);
        setComments((found as any).comments || []);
      }
    });
  }, []);

  const handleComment = async () => {
    if (!text.trim() || !userId || !post) return;
    setLoading(true);
    const created = await createComment(text, post.id, userId);
    if (created) setComments((prev) => [...prev, created]);
    setText("");
    setLoading(false);
  };

  if (!post) return <div className="max-w-[600px] mx-auto py-8 text-gray-400">Carregando...</div>;

  return (
    <div className="max-w-[600px] mx-auto py-8 flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--secondary)] w-fit">
        <ArrowLeft size={16} /> Voltar
      </button>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <Avatar name={post.users?.user_name ?? "Anônimo"} />
          <div>
            <p className="font-semibold text-sm">{post.users?.user_name ?? "Anônimo"}</p>
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ptBR })}
            </p>
          </div>
        </div>

        <div className="px-5 pb-4">
          <h1 className="font-bold text-xl text-[var(--black)] mb-3">{post.title}</h1>
          <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{post.content}</p>
        </div>

        {post.files?.length > 0 && (
          <div className="px-5 pb-4 flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-500">Anexos ({post.files.length})</p>
            {post.files.map((url, i) => <FileViewer key={i} url={url} />)}
          </div>
        )}

        {post.tags?.length > 0 && (
          <div className="px-5 pb-4 flex flex-wrap gap-1">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-[var(--violet)] px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>
        )}

        <div className="border-t border-gray-100 mx-5" />

        <div className="px-5 py-4 flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-500">{comments.length} comentário{comments.length !== 1 ? "s" : ""}</p>
          {comments.map((c: any) => (
            <div key={c.id} className="flex items-start gap-2">
              <Avatar name={c.user?.user_name ?? "?"} />
              <div className="flex-1 bg-gray-50 rounded-2xl px-3 py-2 text-sm">
                <span className="font-semibold">{c.user?.user_name ?? "Usuário"} </span>
                <span className="text-gray-600">{c.comment}</span>
              </div>
            </div>
          ))}
          {userId && (
            <div className="flex items-center gap-2 mt-1">
              <Avatar name="Eu" />
              <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleComment()}
                  placeholder="Adicionar comentário..."
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
                />
                <button onClick={handleComment} disabled={loading || !text.trim()}>
                  <Send size={15} className={text.trim() ? "text-[var(--secondary)]" : "text-gray-300"} />
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
