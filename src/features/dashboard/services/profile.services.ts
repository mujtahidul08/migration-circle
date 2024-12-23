import {Follower, Following } from "@/types/profile.types";
import { apiURL } from "@/utils/baseurl";
import axios from "axios";



export const getAllThreadsByUser = async (token: string) => {
  try {
    const res = await axios.get(apiURL + "api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.threads;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching user threads:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error fetching user threads");
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};

export const fetchFollowers = async (): Promise<Follower[]> => {
  try {
    const response = await axios.get(`${apiURL}api/profile/followers`); // Ganti dengan endpoint API yang sesuai
    const followers = response.data.followers.map((follower: any) => ({
      id: follower.id,              
      fullname: follower.fullname,
      username: `@${follower.username}`,
      image: follower.image || "https://bit.ly/naruto-sage",
      isFollow: true, // Sesuaikan jika backend memberikan informasi follow/unfollow
    }));
    return followers;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
};

export const fetchFollowing = async (): Promise<Following[]> => {
  try {
    const response = await axios.get("api/profile/following"); // Ganti dengan endpoint API backend Anda
    const following = response.data.following.map((user: any) => ({
      id: user.id,
      fullname: user.fullname,
      username: `@${user.username}`,
      image: user.image || "https://bit.ly/naruto-sage",
      isFollow: true, // Karena ini adalah daftar yang sedang diikuti
    }));
    return following;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw error;
  }
};