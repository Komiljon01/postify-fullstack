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
import $axios from "@/http";
import { postStore } from "@/store/post.store";
import FillLoading from "../shared/fill-loading";
import ErrorContent from "../shared/error-content";

function ConfirmModal() {
  const { isOpen, onClose, post } = useConfirm();
  const { posts, setPosts } = postStore();

  const { mutate, error, isPending, reset } = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: async () => {
      const { data } = await $axios.delete(`/post/delete/${post._id}`);
      return data;
    },
    onSuccess: (data) => {
      const newData = posts.filter((post) => post._id !== data._id);
      setPosts(newData);
      onClose();
      reset();
    },
  });

  const onCloseDialog = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseDialog}>
      <DialogContent>
        {error && <ErrorContent message={error.message} />}

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
