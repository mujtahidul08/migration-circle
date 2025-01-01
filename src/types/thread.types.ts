export interface ThreadsType {
  id: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  image?: string;
  author: {
      username: string;
      email: string;
      profile?: {
          avatarImage?: string;
      };
  };
  _count: {
      like: number;
      replies: number;
  };
  isLike: boolean; // Tambahkan properti ini
}

// export interface ThreadsType {
//   id: number;
//   authorId: number;
//   createdAt: string;
//   updatedAt: string;
//   content: string;
//   image?: string;
//   author: {
//       username: string;
//       email: string;
//       profile?: {
//           avatarImage?: string;
//       };
//   };
//   _count: {
//       like: number;
//       replies: number;
//   };
// }

// export type ThreadsType = {
//   id: number;
//   content: string;
//   image?: string;
//   createdAt: Date;
//   updatedAt: Date;
//   likes: Array<string>;
//   replies: Array<string>;
//   isLike: boolean;
//   author: {
//     username: string;
//     email: string;
//     profile: {
//       avatarImage?: string; // Menambahkan avatarImage dari Profile
//     };
//   };
// };

