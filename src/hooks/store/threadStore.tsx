import { create } from 'zustand';
import { ThreadsType } from '@/types/thread.types';
import axios from 'axios';

type Thread = {
  id: string;
  content: string;
  image?: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    email: string;
    profile?: {
      avatarImage?: string;
    };
  };
  _count?: {
    like?: number;
    replies?: number;
  };
  isLike?: boolean;
};

type ThreadState = {
  threads: Thread[];
  currentThread: Thread | null;
  setThreads: (threads: Thread[]) => void;
  setCurrentThread: (thread: Thread) => void;
};

export const useThreadStore = create<ThreadState>((set) => ({
  threads: [],
  currentThread: null,
  setThreads: (threads) => set({ threads }),
  setCurrentThread: (thread) => set({ currentThread: thread }),
}));

//=====
// interface ThreadState {
//   threads: ThreadsType[];
//   setThreads: (threads: ThreadsType[]) => void;
//   clearThreads: () => void;
//   fetchThreads: (token: string) => Promise<void>;
//   toggleLikeThread: (threadId: number, liked: boolean, likeCount: number) => void;
// }

// const useThreadStore = create<ThreadState>((set) => ({
//   threads: [],

//   setThreads: (threads) => set({ threads }),

//   clearThreads: () => set({ threads: [] }),

//   fetchThreads: async (token) => {
//     try {
//       const res = await axios.get('http://localhost:3000/api/thread', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ threads: res.data.threads });
//     } catch (error) {
//       console.error('Error fetching threads:', error);
//     }
//   },

//   toggleLikeThread: (threadId, liked, likeCount) => {
//     set((state) => ({
//       threads: state.threads.map((thread) =>
//         thread.id === threadId
//           ? {
//               ...thread,
//               isLike: liked,
//               _count: {
//                 ...thread._count,
//                 like: likeCount,
//               },
//             }
//           : thread
//       ),
//     }));
//   },
// }));

// export default useThreadStore;

//=========
// const useThreadStore = create<ThreadState>((set) => ({
//   threads: [],

//   fetchThreads: async (token) => {
//     try {
//       const res = await axios.get('http://localhost:3000/api/thread', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ threads: res.data.threads });
//     } catch (error) {
//       console.error('Error fetching threads:', error);
//     }
//   },

//   toggleLikeThread: (threadId, liked, likeCount) => {
//     set((state) => ({
//       threads: state.threads.map((thread) =>
//         thread.id === threadId
//           ? {
//               ...thread,
//               isLike: liked,
//               _count: {
//                 ...thread._count,
//                 like: likeCount,
//               },
//             }
//           : thread
//       ),
//     }));
//   },
// }));

// export default useThreadStore;