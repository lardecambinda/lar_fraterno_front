"use client";
import Infocard from "./Infocard";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { IPost, IUser } from "@/types/types";
import PostsContainer from "./PostsContainer";
import { getPosts, getUsers } from "@/services/apolloAPI";
import { Users, File, Shapes } from "lucide-react";

export default function page() {
  const { user } = useAuth();

  const [users, setUsers] = useState<IUser[]>();
  const [categories, setCategories] = useState<string[]>();
  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    getPosts().then((data) => setPosts(data as IPost[]));
    getUsers().then((data) => setUsers(data));

    // getCategories(token);
  }, []);

  return (
    <div className="pb-[100px] md:pb-0">
      <div className="flex flex-col text-center md:text-left md:flex-row md:items-center gap-4 mt-4">
        <Infocard
          title="Publicações"
          number={posts && posts.length}
          Icon={<File strokeWidth={1.5} color="#272932" />}
        />
        <Infocard
          title="Usuários"
          number={users && users.length}
          Icon={<Users strokeWidth={1.5} color="#272932" />}
        />
        <Infocard
          title="Categorias"
          number={0}
          Icon={<Shapes strokeWidth={1.5} color="#272932" />}
        />
      </div>
      <div className="flex mt-4 p-4 bg-white shadow-md rounded-md ">
        {<PostsContainer posts={posts} />}
      </div>
    </div>
  );
}
