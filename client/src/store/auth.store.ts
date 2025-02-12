import { IUser } from "@/types";
import { create } from "zustand";

type AuthStoreType = {
  isLoading: boolean;
  isAuth: boolean;
  user: IUser;
  setUser: (user: IUser) => void;
  setLoading: (loading: boolean) => void;
  setIsAuth: (auth: boolean) => void;
};

export const authStore = create<AuthStoreType>((set) => ({
  isLoading: false,
  isAuth: false,
  user: {} as IUser,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setIsAuth: (auth) => set({ isAuth: auth }),
}));
