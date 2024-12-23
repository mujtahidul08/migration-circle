export interface userType {
    id: number;
    username: string;
    email: string;
    profile?: {
      bio?: string;
      avatarImage?: string; // Opsional jika null
    };
    followers: number; // Tambahkan ini
    following: number; // Tambahkan ini
  }