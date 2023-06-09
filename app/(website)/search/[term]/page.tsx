"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatTerm } from "@/utils/formatSearchTerm";
import { Post } from "@/types/types";

export default function Page() {
  const params = useParams();
  const [results, setResults] = useState<Post[]>();

  useEffect(() => {
    console.log(decodeURIComponent(params.term));

    getSearch(decodeURIComponent(params.term));
  }, []);

  useEffect(() => {
    console.log(results);
  }, [results]);

  const getSearch = async (term: string) => {
    if (!term) {
      return;
    }

    console.log(term);
    console.log(
      `${process.env.NEXT_PUBLIC_API_BASE_ROUTE as string}/search/${term}`
    );

    // Waiting for auth functionality

    // const req = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_ROUTE as string}/search/${term}`
    // );

    // if (!req.ok) {
    //   return console.log("Error");
    // }

    // const data = await req.json();
    // console.log(data.posts);

    // setResults(data.posts);
  };

  return (
    <div>
      <div className="mt-8 ml-4">
        <h1>
          Busca por{" "}
          <strong className="text-xl">
            {decodeURIComponent(formatTerm(params.term))}
          </strong>
        </h1>
      </div>
    </div>
  );
}
