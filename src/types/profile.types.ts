export type Follower = {
  id: number;
  fullname: string;
  username: string;
  image?: string;
  isFollow: boolean;
};

export interface Following {
  id: number;
  fullname: string;
  username: string;
  image: string;
  isFollow: boolean;
}
