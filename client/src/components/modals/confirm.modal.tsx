import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { postStore } from "@/store/post.store";
import FillLoading from "../shared/fill-loading";
import ErrorContent from "../shared/error-content";
import $api from "@/http/api";
import { toast } from "sonner";

function ConfirmModal() {
  const { isOpen, onClose, post } = useConfirm();
  const { posts, setPosts } = postStore();

  const { mutate, error, isPending, reset } = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: async () => {
      const { data } = await $api.delete(`/post/delete/${post._id}`);
      return data;
    },
    onSuccess: (data) => {
      const newData = posts.filter((post) => post._id !== data._id);
      setPosts(newData);
      onClose();
      reset();
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message);
    },
  });

  const onCloseDialog = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseDialog}>
      <DialogContent>
        {/* @ts-ignore */}
        {error && <ErrorContent message={error.response.data.message} />}
        {isPending && <FillLoading />}
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onCloseDialog}>
            Cancel
          </Button>
          <Button onClick={() => mutate()}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;
