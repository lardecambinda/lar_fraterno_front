import { IPost } from "@/types/types";
import formatCreatedAt from "@/utils/formatCreatedAt";
import { useEffect } from "react";
import { SlDocs } from "react-icons/sl";

interface IProps {
  posts: IPost[];
}

export default function PostsContainer({ posts }: IProps) {
  useEffect(() => {
    posts.forEach((post) => {
      console.log(post);
    });
  }, [posts]);

  return (
    <div className="md:h-[500px] w-full">
      <div className="flex items-center mb-4 gap-2 ">
        <div className="p-2 bg-violet rounded-full ">
          <SlDocs className="text-xl" />
        </div>
        <h2 className="font-semibold text-lg ">Todas as Publicações</h2>
      </div>

      <div>
        {posts.length < 1 ? (
          <div>Sem posts no momento</div>
        ) : (
          posts.map((post) => {
            return (
              <div
                key={post.id}
                className="mb-2 pb-4 px-1 border-b last-of-type:border-none"
              >
                <h3 className="font-semibold text-sm">{post.title}</h3>
                <p className="line-clamp-2 text-sm">{post.content}</p>

                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    {formatCreatedAt(post.createdAt)}
                  </p>

                  <p className="text-xs">
                    Created by{" "}
                    <span className="font-semibold">
                      {post.users.user_name}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
