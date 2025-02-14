import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaPencil } from "react-icons/fa6";
import CreatePost from "../create-post";
import { useCreatePost } from "@/hooks/use-create-post";
import { authStore } from "@/store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loader2, LogOut, Mail, PencilLine } from "lucide-react";
import { toast } from "sonner";
import $axios from "@/http";
import { IUser } from "@/types";

function Navbar() {
  const { isAuth, user, isLoading, setIsAuth, setUser } = authStore();
  const { onOpen } = useCreatePost();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await $axios.post("/auth/logout");
      localStorage.removeItem("accessToken");
      setIsAuth(false);
      setUser({} as IUser);
      navigate("/auth");
      toast.success("Successfully log out");
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full h-24 bg-gray-900 fixed inset-0">
        <div className="w-full max-w-[1400px] mx-auto px-5 h-full flex justify-between items-center">
          <Link
            className="flex items-center justify-center gap-2 ml-2"
            to={"/"}
          >
            <p className="font-bold text-3xl sm:text-4xl text-white font-mono">
              Postify
            </p>
            <FaPencil className="text-lg sm:text-xl text-green-400" />
          </Link>
          <div className="flex gap-2 items-center">
            {isAuth && (
              <Button
                className="rounded-full font-bold hidden sm:flex"
                size={"lg"}
                variant={"outline"}
                onClick={onOpen}
              >
                Create Post
              </Button>
            )}

            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {isAuth ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <img
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                          user.email.split("")[0]
                        }`}
                        alt={`user profile`}
                        className="w-8 h-8 rounded-full"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                      <DropdownMenuLabel className="flex items-center gap-1">
                        <Mail className="w-4 h-4" /> {user.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {isAuth && (
                        <DropdownMenuItem
                          onClick={onOpen}
                          className="cursor-pointer flex sm:hidden"
                        >
                          <PencilLine /> Create post
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        onClick={logOut}
                        className="cursor-pointer"
                      >
                        <LogOut /> Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to={"/auth"}>
                    <Button size={"lg"} className="rounded-full font-bold">
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CreatePost />
    </>
  );
}

export default Navbar;
