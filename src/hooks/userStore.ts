import { userType } from "@/types/user.types";
import { create } from "zustand";

interface userState {
  user: userType | null;
  setUser: (user: userType) => void;
  clearUser: () => void;
}

const useUserStore = create<userState>((set) => ({
  user: null,
  setUser: (user) => set({ user }), 
  clearUser: () => set({ user: null }), 
}));

export default useUserStore;