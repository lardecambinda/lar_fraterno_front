import { IPost } from "@/types/types";
import formatCreatedAt from "@/utils/formatCreatedAt";

import { Files } from "lucide-react";

interface IProps {
  posts: IPost[];
}

export default function PostsContainer({ posts }: IProps) {
  return (
    <div className="md:h-[500px] lg:h-[480px] w-full ">
      <div className="flex items-center mb-4 gap-2 ">
        <div className="p-2 bg-violet rounded-full ">
          <Files strokeWidth={1.5} color="#272932" />
        </div>
        <h2 className="font-semibold text-lg ">Todas as Publicações</h2>
      </div>

      <div className="md:overflow-y-scroll md:h-[420px] lg:h-[420px] scrollbar">
        {posts.length < 1 ? (
          <div>Nenhuma Publicação</div>
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
