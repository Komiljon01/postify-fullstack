import { IPost } from "@/types";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import $axios, { API_URL } from "@/http";
import { Button } from "../ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import { postSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { postStore } from "@/store/post.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import FillLoading from "../shared/fill-loading";

function PostCard({ post }: { post: IPost }) {
  const { onOpen, setPost } = useConfirm();
  const { posts, setPosts } = postStore();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    onOpen();
    setPost(post);
  };

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: post.title, body: post.body },
  });

  const { mutate, isPending, reset } = useMutation({
    mutationKey: ["edit-post"],
    mutationFn: async (values: z.infer<typeof postSchema>) => {
      const { data } = await $axios.put(`/post/edit/${post._id}`, values);
      return data;
    },
    onSuccess: (data) => {
      const newData = posts.map((c) => (c._id === data._id ? data : c));
      setPosts(newData);
      setOpen(false);
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    mutate(values);
  }

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
          {/* Edit */}
          <Button className="w-full" onClick={() => setOpen(true)}>
            Edit
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              {isPending && <FillLoading />}
              <DialogHeader>
                <DialogTitle className="text-xl text-center">
                  Edit post
                </DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-secondary"
                            placeholder="Create a post"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-secondary"
                            rows={3}
                            placeholder="Post details..."
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 max-[300px]:flex-col">
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isPending}
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Delete */}
          <Button className="w-full" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default PostCard;
