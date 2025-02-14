import PostCard from "@/components/cards/post.card";
import PostLoading from "@/components/shared/post-loading";
import $axios from "@/http";
import { IPost } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { postStore } from "@/store/post.store";
import ConfirmModal from "@/components/modals/confirm.modal";
import ErrorContent from "@/components/shared/error-content";

function Home() {
  const { setPosts, posts } = postStore();

  const { isLoading, error } = useQuery({
    queryKey: ["get-posts"],
    queryFn: async () => {
      const { data } = await $axios("/post/get");
      setPosts(data);
      return data;
    },
  });

  return (
    <>
      <div className="container max-w-[1200px] mx-auto mt-36 mb-16 px-5">
        {/* Error */}
        {error && <ErrorContent message={error.message} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Loading */}
          {isLoading &&
            Array.from({ length: 6 }).map((_, idx) => (
              <PostLoading key={idx} />
            ))}

          {/* Posts */}
          {posts.map((post: IPost) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <ConfirmModal />
    </>
  );
}

export default Home;
