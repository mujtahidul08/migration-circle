import { userType } from "@/types/user.types";
import { create } from "zustand";

interface userState {
  user: userType | null;
  token: string | null;
  setUser: (user: userType) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
  updateFollowers: (followers: number) => void; // Fungsi untuk update followers
  updateFollowing: (following: number) => void; // Fungsi untuk update following
}

const useUserStore = create<userState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); 
    set({ user });
  },
  setToken: (token) => {
    localStorage.setItem("token", token); 
    set({ token });
  },
  clearUser: () => set({ user: null, token: null }),
  updateFollowers: (followers) =>
    set((state) => {
      if (!state.user) return state; 
      return {
        user: {
          ...state.user,
          followers,
        },
      };
    }),
  updateFollowing: (following) =>
    set((state) => {
      if (!state.user) return state; 
      return {
        user: {
          ...state.user,
          following,
        },
      };
    }),
}));

export default useUserStore;
