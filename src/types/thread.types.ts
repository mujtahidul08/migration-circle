export type ThreadsType = {
  id: number;
  content: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;

  
  likes: Array<string>;
  replies: Array<string>;
  isLike: boolean;
  author: {
    username: string;
    email: string;
    profile: {
      avatarImage?: string; // Menambahkan avatarImage dari Profile
    };
  };
};