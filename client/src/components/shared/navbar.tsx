import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FaPencil } from "react-icons/fa6";
import { FiRss } from "react-icons/fi";
import CreatePost from "../create-post";
import { useCreatePost } from "@/hooks/use-create-post";

function Navbar() {
  const { onOpen } = useCreatePost();
  return (
    <>
      <div className="w-full h-24 bg-gray-900 fixed inset-0">
        <div className="w-full max-w-[1400px] mx-auto px-5 h-full flex justify-between items-center">
          <Link
            className="flex items-center justify-center gap-2 ml-2"
            to={"/"}
          >
            <p className="font-bold text-4xl text-white font-mono">Postify</p>
            <FaPencil className="text-xl text-green-400" />
            {/* <FiRss className="text-3xl text-green-400" /> */}
          </Link>
          <div className="flex gap-2">
            <Button
              className="rounded-full font-bold"
              size={"lg"}
              variant={"outline"}
              onClick={onOpen}
            >
              Create Post
            </Button>
            <Link to={"/auth"}>
              <Button size={"lg"} className="rounded-full font-bold">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <CreatePost />
    </>
  );
}

export default Navbar;
