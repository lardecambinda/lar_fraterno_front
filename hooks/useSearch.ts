"use client";

import { SearchContext } from "@/contexts/SearchContext";
import { useContext } from "react";

export default function useSearch() {
  const { results, getSearch, term, updateTerm } = useContext(SearchContext);

  return { results, getSearch, term, updateTerm };
}
