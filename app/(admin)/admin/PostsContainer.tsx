"use client";
import { useState } from "react";
import { IPost } from "@/types/types";
import { deletePost, updatePost } from "@/services/apolloAPI";
import formatCreatedAt from "@/utils/formatCreatedAt";
import Skeleton from "@/components/Skeleton/Skeleton";
import { Files, Pencil, Trash2, X } from "lucide-react";

interface IProps {
  posts: IPost[] | undefined;
  onRefresh: () => void;
  showTitle?: boolean;
}

const MONTHS = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];

const CATEGORIES = [
  "Documentos",
  "Aulas",
  "Avisos",
  "Exú",
  "Caboclo",
  "Preto Velho",
  "Tratamento",
  "Estudo",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => currentYear - i);

export default function PostsContainer({
  posts,
  onRefresh,
  showTitle = true,
}: IProps) {
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [editingPost, setEditingPost] = useState<IPost | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    status: "DRAFT" as "DRAFT" | "PUBLISHED",
    meeting_date: "",
  });
  const [saving, setSaving] = useState(false);

  const openEdit = (post: IPost) => {
    setEditingPost(post);
    setEditForm({
      title: post.title,
      content: post.content,
      status: post.status,
      meeting_date: post.meeting_date ? post.meeting_date.slice(0, 10) : "",
    });
  };

  const saveEdit = async () => {
    if (!editingPost) return;
    setSaving(true);
    await updatePost(editingPost.id, {
      title: editForm.title,
      content: editForm.content,
      status: editForm.status,
      meeting_date: editForm.meeting_date || null,
    });
    setSaving(false);
    setEditingPost(null);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover esta publicação?")) return;
    await deletePost(id);
    onRefresh();
  };

  const filtered = posts?.filter((p) => {
    if (
      filterTitle &&
      !p.title.toLowerCase().includes(filterTitle.toLowerCase())
    )
      return false;
    if (filterTag && !p.tags.includes(filterTag.toLowerCase())) return false;
    if (filterMonth || filterYear) {
      const date = p.meeting_date ? new Date(p.meeting_date) : null;
      if (!date) return false;
      if (filterMonth && date.getMonth() + 1 !== parseInt(filterMonth))
        return false;
      if (filterYear && date.getFullYear() !== parseInt(filterYear))
        return false;
    }
    return true;
  });

  const sorted = filtered?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="w-full">
      {showTitle && (
        <div className="flex items-center mb-4 gap-2">
          <div className="p-2 bg-purple-100 rounded-full">
            <Files strokeWidth={1.5} color="#9333EA" />
          </div>
          <h2 className="font-semibold text-lg">Todas as Reuniões</h2>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          className="h-9 border outline-none px-3 text-sm rounded flex-1 min-w-[140px]"
        />
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="h-9 border outline-none px-3 text-sm rounded bg-white"
        >
          <option value="">Mês</option>
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="h-9 border outline-none px-3 text-sm rounded bg-white"
        >
          <option value="">Ano</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="h-9 border outline-none px-3 text-sm rounded bg-white"
        >
          <option value="">Categoria</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c.toLowerCase()}>
              {c}
            </option>
          ))}
        </select>
        {(filterTitle || filterMonth || filterYear || filterTag) && (
          <button
            onClick={() => {
              setFilterTitle("");
              setFilterMonth("");
              setFilterYear("");
              setFilterTag("");
            }}
            className="h-9 px-3 text-xs text-gray-500 border rounded hover:bg-gray-50"
          >
            Limpar
          </button>
        )}
      </div>

      <div className="md:overflow-y-scroll md:h-[380px] scrollbar">
        {posts ? (
          !sorted || sorted.length < 1 ? (
            <div className="text-sm text-gray-500">
              Nenhuma publicação encontrada
            </div>
          ) : (
            sorted.map((post) => (
              <div
                key={post.id}
                className="mb-2 mx-auto max-w-[98%] pb-4 px-1 border-b last-of-type:border-none"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm">{post.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${post.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {post.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-600">
                      {post.content}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>{formatCreatedAt(post.createdAt)}</span>
                      {post.meeting_date && (
                        <span>
                          Reunião:{" "}
                          {new Date(post.meeting_date).toLocaleDateString(
                            "pt-BR",
                          )}
                        </span>
                      )}
                      {post.users && (
                        <span>
                          Por <strong>{post.users.user_name}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(post)}
                      className="p-1 hover:text-blue-600"
                    >
                      <Pencil size={15} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1 hover:text-rose-600"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          <>
            <Skeleton className="mb-2 max-w-[98%] mx-auto" height={90} />
            <Skeleton className="mb-2 max-w-[98%] mx-auto" height={90} />
            <Skeleton className="mb-2 max-w-[98%] mx-auto" height={90} />
          </>
        )}
      </div>

      {/* Modal de edição */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Editar Publicação</h3>
              <button onClick={() => setEditingPost(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Título</label>
              <input
                className="h-11 border outline-none px-4"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Conteúdo</label>
              <textarea
                className="border outline-none px-4 py-2 min-h-[100px]"
                value={editForm.content}
                onChange={(e) =>
                  setEditForm({ ...editForm, content: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium">Data da Reunião</label>
                <input
                  type="date"
                  className="h-11 border outline-none px-4 text-sm"
                  value={editForm.meeting_date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, meeting_date: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium">Status</label>
                <select
                  className="h-11 border outline-none px-4 bg-white text-sm"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      status: e.target.value as "DRAFT" | "PUBLISHED",
                    })
                  }
                >
                  <option value="DRAFT">Rascunho</option>
                  <option value="PUBLISHED">Publicado</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="px-4 py-2 text-sm bg-[var(--secondary)] text-white rounded disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
