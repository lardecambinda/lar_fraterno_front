"use client";

import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatParam } from "@/utils/formatSearchTerm";

export default function Searchbar() {
  const router = useRouter();

  const [term, setTerm] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (term == "") {
      return;
    }

    router.push(`/search/${formatParam(term)}`);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-white flex items-center w-full lg:max-w-xs rounded-sm overflow-hidden h-10 py-0 px-3 "
    >
      <input
        placeholder="buscar..."
        className="flex-1 rounded-sm outline-none placeholder:text-sm"
        type="text"
        onChange={(e) => setTerm(e.target.value)}
      />
      <button>
        <AiOutlineSearch />
      </button>
    </form>
  );
}
