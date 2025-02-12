import { IPost } from "@/types";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { API_URL } from "@/http";
import { Button } from "../ui/button";
import { useConfirm } from "@/hooks/use-confirm";

function PostCard({ post }: { post: IPost }) {
  const { onOpen, setPost } = useConfirm();

  const onDelete = () => {
    onOpen();
    setPost(post);
  };

  return (
    <Card>
      <img
        src={`${API_URL}/${post.picture}`}
        alt={post.title}
        className="rounded-t-xl"
      />

      <CardContent className="mt-2">
        <CardTitle className="text-xl line-clamp-1">{post.title}</CardTitle>
        <p className="line-clamp-3 mt-1 text-muted-foreground">{post.body}</p>
        <CardFooter className="gap-2 mt-5 p-0">
          <Button className="w-full">Edit</Button>
          <Button className="w-full" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default PostCard;
