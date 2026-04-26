"use client";

import { IPost } from "@/types/types";
import { createContext, useState } from "react";
import { api } from "@/services/apolloAPIConfig";

interface ContextType {
  results: IPost[] | undefined;
  getSearch: (term: string) => void;
  term: string;
  updateTerm: (str: string) => void;
}

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const SearchContext = createContext({} as ContextType);

export default function SearchContextProvider({ children }: Props) {
  const [results, setResults] = useState<IPost[] | undefined>();
  const [term, setTerm] = useState("");

  const getSearch = async (term: string) => {
    if (!term) return;

    try {
      const { data } = await api.get(`/search/${term}`);
      setResults(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTerm = (str: string) => setTerm(str);

  return (
    <SearchContext.Provider value={{ results, getSearch, term, updateTerm }}>
      {children}
    </SearchContext.Provider>
  );
}
