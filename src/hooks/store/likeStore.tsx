import { create } from "zustand";

// type Post = {
//   name: string;
//   username: string;
//   postedAt: string;
//   isLike: boolean;
//   avatar: string;
//   content: string;
//   image: string;
//   likes: number;
//   replies: number;
// };

interface LikeStore {
  likes: Record<number, boolean>; // key: threadId, value: isLiked
  toggleLike: (threadId: number, isLiked: boolean) => void;
}

const useLikeStore = create<LikeStore>((set) => ({
  likes: {},
  toggleLike: (threadId, isLiked) =>
    set((state) => ({
      likes: { ...state.likes, [threadId]: isLiked },
    })),
}));

export default useLikeStore;