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
  isLike: boolean; 
}
