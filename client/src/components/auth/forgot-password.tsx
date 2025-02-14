import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import $axios from "@/http";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import FillLoading from "../shared/fill-loading";
import { emailSchema } from "@/lib/validation";
import { useState } from "react";

function ForgotPassword() {
  const { setAuth } = useAuth();
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const { mutate, isPending, reset } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async (values: z.infer<typeof emailSchema>) => {
      const { data } = await $axios.post(`/auth/forgot-password`, values);
      return data;
    },
    onSuccess: () => {
      setSuccess(true);
      reset();
      form.reset();
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof emailSchema>) {
    mutate(values);
  }

  if (success) {
    return (
      <div className="flex justify-center items-center flex-col gap-2">
        <h1 className="text-3xl font-bold">Success</h1>
        <p className="text-md text-muted-foreground">
          Please check your email address
        </p>
      </div>
    );
  }

  return (
    <>
      {isPending && <FillLoading />}

      <h1 className="text-2xl font-bold">Forgot password</h1>
      <p className="text-sm text-muted-foreground">
        Don't have an account?{" "}
        <span
          className="cursor-pointer text-blue-500 hover:underline"
          onClick={() => setAuth("register")}
        >
          Sign up
        </span>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary"
                    placeholder="postify@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default ForgotPassword;
