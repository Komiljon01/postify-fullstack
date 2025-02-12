import { useAuth } from "@/hooks/use-auth";
import { authSchema } from "@/lib/validation";
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
import { authStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setAuth } = useAuth();
  const { setIsAuth, setUser } = authStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending, reset } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: z.infer<typeof authSchema>) => {
      const { data } = await $axios.post(`/auth/login`, values);
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem("accessToken", data.accessToken);
      reset();
      form.reset();
      navigate("/");
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof authSchema>) {
    mutate(values);
  }

  return (
    <>
      {isPending && <FillLoading />}

      <h1 className="text-2xl font-bold">Login</h1>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary"
                    placeholder="*********"
                    type="password"
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

export default Login;
