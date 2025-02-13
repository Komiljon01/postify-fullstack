import { useCreatePost } from "@/hooks/use-create-post";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { postStore } from "@/store/post.store";
import $api from "@/http/api";

function CreatePost() {
  const { isOpen, onClose } = useCreatePost();
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState<File | null>(null);
  const { posts, setPosts } = postStore();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", body: "" },
  });

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setPicture(file as File);
  };

  async function onSubmit(values: z.infer<typeof postSchema>) {
    if (!picture) return null;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("picture", picture);

    try {
      const res = await $api.post("/post/create", formData);
      console.log(res);
      const newData = [...posts, res.data];
      setPosts(newData);
      form.reset();
      onClose();
      toast.success("Successfully created post");
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a post</SheetTitle>
          <SheetDescription>Write what is in your mind</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
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
                      disabled={isLoading}
                      {...field}
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
                      placeholder="Post details..."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                className="bg-secondary mt-3"
                onChange={onFileChange}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default CreatePost;
