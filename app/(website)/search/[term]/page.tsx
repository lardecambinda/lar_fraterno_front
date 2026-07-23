"use client";
import { formatTerm } from "@/utils/formatSearchTerm";
import useSearch from "@/hooks/useSearch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Avatar from "@/components/Avatar/Avatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import FileViewer from "@/components/FileViewer/FileViewer";
import Link from "next/link";

export default function Page() {
  const { results, term } = useSearch();
  const [searchTerm, setSearchTerm] = useState(term);
  const router = useRouter();

  useEffect(() => {
    if (term == "") {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <div className="my-4">
        <h1>
          Busca por{" "}
          <strong className="">
            {decodeURIComponent(formatTerm(searchTerm))}
          </strong>
        </h1>
      </div>

      <div>
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--secondary)] w-fit mb-4"
          >
            <ArrowLeft size={16} /> Voltar
          </button>

          {results == undefined ? (
            <div>Loading...</div>
          ) : results.length < 1 ? (
            <div className="w-full h-96 flex items-center justify-center gap-1">
              Sem resultados para
              <strong> {decodeURIComponent(formatTerm(searchTerm))}</strong>
            </div>
          ) : (
            results?.map((post, i) => {
              return (
                <article
                  onClick={() => router.push(`/reunioes/${post.id}`)}
                  key={i}
                  className="mb-6 cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
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
                    <p className="text-sm line-clamp-3 text-gray-600 whitespace-pre-line leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                  {post.meeting_date && (
                    <div className="px-5 pb-3">
                      <p className="text-xs text-gray-500">
                        Reunião:{" "}
                        <strong>
                          {new Date(post.meeting_date).toLocaleDateString(
                            "pt-BR",
                          )}
                        </strong>
                      </p>
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

                  <div className="flex items-center justify-end p-4">
                    <span className="flex items-center gap-2 text-accent text-sm">
                      Ir para publicação{" "}
                      <ArrowRight size={14} color="#9333EA" />
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
