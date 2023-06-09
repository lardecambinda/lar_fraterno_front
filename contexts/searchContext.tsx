"use client";

import { Post } from "@/types/types";
import { createContext, useState } from "react";

interface ContextType {
  results: Post[] | undefined;
  getSearch: (term: string) => void;
  term: string;
  updateTerm: (str: string) => void;
}

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const SearchContext = createContext({} as ContextType);

export default function SearchContextProvider({ children }: Props) {
  const [results, setResults] = useState<Post[] | undefined>();
  const [term, setTerm] = useState("");

  const getSearch = async (term: string) => {
    if (!term) {
      return;
    }

    console.log(term);
    console.log(
      `${process.env.NEXT_PUBLIC_API_BASE_ROUTE as string}/search/${term}`
    );

    // Waiting for auth functionality

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_ROUTE as string}/search/${term}`
    );

    if (!req.ok) {
      return console.log("Error");
    }

    const data = await req.json();
    console.log(data.posts);

    setResults(data.posts);
  };
  const updateTerm = (str: string) => {
    setTerm(str);
  };

  return (
    <SearchContext.Provider value={{ results, getSearch, term, updateTerm }}>
      {children}
    </SearchContext.Provider>
  );
}
