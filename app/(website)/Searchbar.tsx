"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatParam } from "@/utils/formatSearchTerm";
import useSearch from "@/hooks/useSearch";

export default function Searchbar() {
  const router = useRouter();

  const { updateTerm, term, getSearch } = useSearch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (term == "") {
      return;
    }

    getSearch(term);

    router.push(`/search/${formatParam(term)}`);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-white border-b flex items-center w-full  rounded-sm overflow-hidden h-10 py-0 px-3 "
    >
      <input
        placeholder="buscar..."
        className="flex-1 rounded-sm outline-none placeholder:text-sm"
        type="text"
        onChange={(e) => updateTerm(e.target.value)}
        value={term}
      />
      <button>
        <Search color="#272932" strokeWidth={1.5} />
      </button>
    </form>
  );
}
