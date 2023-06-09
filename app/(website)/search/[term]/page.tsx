"use client";
import { formatTerm } from "@/utils/formatSearchTerm";
import useSearch from "@/hooks/useSearch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      <div className="mt-8 ml-4">
        <h1>
          Busca por{" "}
          <strong className="text-xl">
            {decodeURIComponent(formatTerm(searchTerm))}
          </strong>
        </h1>
      </div>

      <div>
        <div>
          {results == undefined ? (
            <div>Loading...</div>
          ) : results.length < 1 ? (
            <div className="w-full h-96 flex items-center justify-center gap-1">
              Sem resultados para
              <strong> {decodeURIComponent(formatTerm(searchTerm))}</strong>
            </div>
          ) : (
            results?.map((post) => {
              return <div>{post.title}</div>;
            })
          )}
        </div>
      </div>
    </div>
  );
}
