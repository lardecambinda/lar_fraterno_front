"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { createPost, uploadFiles } from "@/services/apolloAPI";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Paperclip, Trash2, X } from "lucide-react";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

interface IFormValues {
  title: string;
  content: string;
  meeting_date: string;
  status: "PUBLISHED" | "DRAFT";
}

const CATEGORIES = ["Documentos", "Aulas", "Avisos", "Exú", "Caboclo", "Preto Velho", "Tratamento", "Estudo"];

const NewPostForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormValues>({
    defaultValues: { status: "DRAFT" }
  });
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleTag = (cat: string) => {
    const t = cat.toLowerCase();
    setTags((prev) => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const submit: SubmitHandler<IFormValues> = async ({ title, content, meeting_date, status }) => {
    if (!user) return;
    setLoading(true);

    let fileUrls: string[] = [];
    if (files.length > 0) {
      fileUrls = await uploadFiles(files);
      if (fileUrls.length === 0) { setLoading(false); return; }
    }

    await createPost({
      title,
      content,
      user_id: user.id,
      files: fileUrls,
      tags,
      status,
      meeting_date: meeting_date || null,
    });

    reset();
    setFiles([]);
    setTags([]);
    setLoading(false);
  };

  return (
    <form className="flex flex-col w-full bg-white shadow-sm px-4 py-5 gap-4" onSubmit={handleSubmit(submit)}>
      {/* Title */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="title">Título</label>
        <input
          className={`w-full h-11 border outline-none px-4 ${errors.title ? "border-rose-500" : ""}`}
          {...register("title", { required: true })}
          id="title"
        />
        {errors.title && <p className="text-rose-500 text-xs">Título é obrigatório</p>}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="content">Conteúdo</label>
        <textarea
          className={`w-full min-h-[120px] border outline-none px-4 py-2 ${errors.content ? "border-rose-500" : ""}`}
          {...register("content", { required: true })}
          id="content"
        />
        {errors.content && <p className="text-rose-500 text-xs">Conteúdo é obrigatório</p>}
      </div>

      {/* Meeting date + Status */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium" htmlFor="meeting_date">Data da Reunião</label>
          <input
            type="date"
            className="h-11 border outline-none px-4 text-sm"
            {...register("meeting_date")}
            id="meeting_date"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium" htmlFor="status">Status</label>
          <select
            className="h-11 border outline-none px-4 text-sm bg-white"
            {...register("status")}
            id="status"
          >
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicado</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Categorias</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} type="button" onClick={() => toggleTag(cat)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                tags.includes(cat.toLowerCase())
                  ? "bg-[var(--secondary)] text-white border-[var(--secondary)]"
                  : "border-gray-300 text-gray-600 hover:border-[var(--secondary)]"
              }`}>
              {cat}
            </button>
          ))}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((t) => (
              <span key={t} className="flex items-center gap-1 text-xs bg-[var(--violet)] px-2 py-0.5 rounded-full">
                #{t} <X size={10} className="cursor-pointer" onClick={() => setTags(tags.filter(x => x !== t))} />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Files */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Arquivos</label>
        <label htmlFor="files" className="cursor-pointer flex items-center gap-2 w-fit text-sm text-gray-600 hover:text-[var(--secondary)]">
          <Paperclip size={16} strokeWidth={1.5} /> Adicionar arquivos
        </label>
        <input className="hidden" onChange={(e) => {
          if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
        }} type="file" id="files" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg" />
        {files.length > 0 && (
          <div className="border rounded p-3 flex flex-col gap-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="truncate max-w-[80%]">{f.name}</span>
                <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                  <Trash2 size={14} color="#ff5757" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <SubmitButton width="80px" className="self-end" label="Salvar" loading={loading} />
    </form>
  );
};

export default NewPostForm;
