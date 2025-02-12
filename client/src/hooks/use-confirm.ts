import { IPost } from "@/types";
import { create } from "zustand";

type ConfirmStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  post: IPost;
  setPost: (post: IPost) => void;
};

export const useConfirm = create<ConfirmStore>((set) => ({
  isOpen: false,
  post: {} as IPost,
  setPost: (post) => set({ post }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
