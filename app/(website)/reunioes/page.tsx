"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/services/apolloAPI";
import { IPost } from "@/types/types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Documentos", "Aulas", "Avisos", "Exú", "Caboclo", "Preto Velho", "Tratamento", "Estudo"];
const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => currentYear - i);

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
    <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
      className="w-full h-96 rounded-xl border border-gray-100" />
  );
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:underline">
      <FileText size={15} /> Ver arquivo
    </a>
  );
}

function PostCard({ post }: { post: IPost }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const authorName = post.users?.user_name ?? "Anônimo";
  const LIMIT = 200;
  const isLong = post.content.length > LIMIT;
  const displayContent = expanded || !isLong ? post.content : post.content.slice(0, LIMIT) + "...";

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        <Avatar name={authorName} />
        <div className="flex-1">
          <p className="font-semibold text-sm text-gray-900">{authorName}</p>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ptBR })}
          </p>
        </div>
      </div>

      <div className="px-6 pb-4">
        <h2 className="font-bold text-lg text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => router.push(`/reunioes/${post.id}`)}>
          {post.title}
        </h2>
        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{displayContent}</p>
        {isLong && (
          <button onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 font-medium mt-2 hover:text-blue-700 hover:underline">
            {expanded ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </div>

      {post.meeting_date && (
        <div className="px-6 pb-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(post.meeting_date).toLocaleDateString("pt-BR", { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </div>
      )}

      {post.files?.length > 0 && (
        <div className="flex flex-col gap-3 px-6 pb-4">
          {post.files.map((url, i) => <FileViewer key={i} url={url} />)}
        </div>
      )}

      {post.tags?.length > 0 && (
        <div className="px-6 pb-5 flex flex-wrap gap-2">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default function ReunioesPage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    getPosts().then((data) => {
      if (data) setPosts([...data].sort((a: IPost, b: IPost) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    });
  }, []);

  const filtered = posts.filter((p) => {
    if (filterTag && !p.tags.includes(filterTag.toLowerCase())) return false;
    if (filterMonth || filterYear) {
      const date = p.meeting_date ? new Date(p.meeting_date) : null;
      if (!date) return false;
      if (filterMonth && date.getMonth() + 1 !== parseInt(filterMonth)) return false;
      if (filterYear && date.getFullYear() !== parseInt(filterYear)) return false;
    }
    return true;
  });

  const hasFilter = filterMonth || filterYear || filterTag;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-[700px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reuniões e Estudos</h1>
          <p className="text-gray-600">Acompanhe as atividades do centro</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}
              className="h-10 border border-gray-300 outline-none px-3 text-sm rounded-lg bg-white focus:border-blue-500 transition-colors">
              <option value="">Todos os meses</option>
              {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>

            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}
              className="h-10 border border-gray-300 outline-none px-3 text-sm rounded-lg bg-white focus:border-blue-500 transition-colors">
              <option value="">Todos os anos</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>

            <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}
              className="h-10 border border-gray-300 outline-none px-3 text-sm rounded-lg bg-white focus:border-blue-500 transition-colors">
              <option value="">Todas categorias</option>
              {CATEGORIES.map((c) => <option key={c} value={c.toLowerCase()}>{c}</option>)}
            </select>
          </div>

          {hasFilter && (
            <button onClick={() => { setFilterMonth(""); setFilterYear(""); setFilterTag(""); }}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Limpar filtros
            </button>
          )}
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0
            ? (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">Nenhuma reunião encontrada</p>
                <p className="text-gray-400 text-sm mt-1">Tente ajustar os filtros</p>
              </div>
            )
            : filtered.map((post) => <PostCard key={post.id} post={post} />)
          }
        </div>
      </div>
    </div>
  );
}
