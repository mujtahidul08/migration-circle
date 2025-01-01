export interface userType {
  id: string;
  username: string;
  email: string;
  profile?: {
    bio?: string;
    avatarImage?: string;
    backgroundImage?: string;
  };
  followers?: number;
  following?: number;
};