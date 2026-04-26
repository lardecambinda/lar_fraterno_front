"use client";
import { useEffect, useState } from "react";
import { getPosts, createComment } from "@/services/apolloAPI";
import { IPost } from "@/types/types";
import { parseCookies } from "nookies";
import * as jwt from "jsonwebtoken";
import { ITokenData } from "@/types/types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Send, FileText } from "lucide-react";
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
  if (isImage) return <img src={url} alt="anexo" className="w-full rounded-xl object-cover max-h-96" />;
  if (isDoc) return (
    <iframe
      src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
      className="w-full h-96 rounded-xl border border-gray-100"
    />
  );
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:underline">
      <FileText size={15} /> Ver arquivo
    </a>
  );
}

function PostCard({ post, userId }: { post: IPost; userId: string }) {
  const [comments, setComments] = useState<any[]>((post as any).comments || []);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const authorName = post.users?.user_name ?? "Anônimo";
  const LIMIT = 200;
  const isLong = post.content.length > LIMIT;
  const displayContent = expanded || !isLong ? post.content : post.content.slice(0, LIMIT) + "...";

  const handleComment = async () => {
    if (!text.trim() || !userId) return;
    setLoading(true);
    const created = await createComment(text, post.id, userId);
    if (created) setComments((prev) => [...prev, created]);
    setText("");
    setLoading(false);
  };

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <Avatar name={authorName} />
        <div className="flex-1">
          <p className="font-semibold text-sm text-[var(--black)]">{authorName}</p>
          <p className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ptBR })}
          </p>
        </div>
      </div>

      {post.files?.length > 0 && (
        <div className="flex flex-col gap-2 px-5 pb-3">
          {post.files.map((url, i) => <FileViewer key={i} url={url} />)}
        </div>
      )}

      <div className="px-5 pb-4">
        <h2
          className="font-bold text-base text-[var(--black)] mb-1 cursor-pointer hover:underline"
          onClick={() => router.push(`/feed/${post.id}`)}
        >
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{displayContent}</p>
        {isLong && (
          <button onClick={() => setExpanded(!expanded)}
            className="text-xs text-[var(--secondary)] font-medium mt-1 hover:underline">
            {expanded ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </div>

      {post.tags?.length > 0 && (
        <div className="px-5 pb-3 flex flex-wrap gap-1">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-[var(--violet)] text-[var(--black)] px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="border-t border-gray-100 mx-5" />

      <div className="px-5 py-4 flex flex-col gap-3">
        {comments.map((c: any) => (
          <div key={c.id} className="flex items-start gap-2">
            <Avatar name={c.user?.user_name ?? "?"} />
            <div className="flex-1 bg-gray-50 rounded-2xl px-3 py-2 text-sm">
              <span className="font-semibold text-[var(--black)]">{c.user?.user_name ?? "Usuário"} </span>
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
                className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
              <button onClick={handleComment} disabled={loading || !text.trim()}>
                <Send size={15} className={text.trim() ? "text-[var(--secondary)]" : "text-gray-300"} />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function FeedPage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userId, setUserId] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { "lar-fraterno_token": token } = parseCookies();
    if (!token) { router.push("/login"); return; }
    const decoded = jwt.decode(token) as ITokenData;
    setUserId(decoded?.id ?? "");

    getPosts().then((data) => {
      if (data) setPosts([...data].sort((a: IPost, b: IPost) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    });
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])));
  const filtered = activeTag ? posts.filter((p) => p.tags?.includes(activeTag)) : posts;

  return (
    <div className="max-w-[600px] mx-auto py-8 flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-[var(--black)] px-1">Feed</h1>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-1">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${!activeTag ? "bg-[var(--secondary)] text-white border-[var(--secondary)]" : "border-gray-300 text-gray-600"}`}>
            Todos
          </button>
          {allTags.map((tag) => (
            <button key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${activeTag === tag ? "bg-[var(--secondary)] text-white border-[var(--secondary)]" : "border-gray-300 text-gray-600"}`}>
              #{tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-16">Nenhuma publicação encontrada.</p>
      )}
      {filtered.map((post) => (
        <PostCard key={post.id} post={post} userId={userId} />
      ))}
    </div>
  );
}
