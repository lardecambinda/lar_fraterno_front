"use client";
import Infocard from "./Infocard";
import { AiOutlineFileText } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IPost, IUser } from "@/types/types";
import { parseCookies } from "nookies";
import PostsContainer from "./PostsContainer";

export default function page() {
  const { user } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const { "lar-fraterno_token": token } = parseCookies();
    if (!token) {
      router.push("/login");
    }
    getPosts(token);
    getUsers(token);
    getCategories(token);
  }, []);

  const getPosts = async (token: string) => {
    if (!token) {
      return console.log("Not logged in...");
    }

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/posts/all`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resp.ok) {
      return console.log("Error...");
    }

    const data = await resp.json();

    setPosts(data.posts);
  };

  const getUsers = async (token: string) => {
    if (!token) {
      return console.log("Not logged in...");
    }

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/users/all`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resp.ok) {
      return console.log("Error...");
    }

    const data = await resp.json();

    setUsers(data.users);
  };

  const getCategories = async (token: string) => {
    if (!token) {
      return console.log("Not logged in...");
    }

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/categories/all`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resp.ok) {
      return console.log("Error...");
    }

    const data = await resp.json();

    setCategories(data.categories);
  };

  return (
    <div className="pb-[100px] md:pb-0">
      <div className="flex flex-col text-center md:text-left md:flex-row md:items-center gap-4 mt-4">
        <Infocard
          title="Publicações"
          number={posts && posts.length}
          Icon={<AiOutlineFileText />}
        />
        <Infocard
          title="Usuários"
          number={users && users.length}
          Icon={<FiUsers />}
        />
        <Infocard
          title="Categorias"
          number={categories && categories.length}
          Icon={<MdOutlineCategory />}
        />
      </div>
      <div className="flex mt-4 p-4 bg-white shadow-md rounded-md ">
        <PostsContainer posts={posts} />
      </div>
    </div>
  );
}
