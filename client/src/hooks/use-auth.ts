import { AuthType } from "@/types";
import { create } from "zustand";

type AuthStore = {
  authState: AuthType;
  setAuth: (auth: AuthType) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  authState: "login",
  setAuth: (auth) => set({ authState: auth }),
}));
