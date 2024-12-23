import { apiURL } from "@/utils/baseurl";
import axios, { AxiosResponse } from "axios";

export const getAllThreads = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(apiURL + 'api/thread', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log('result', res);
    return res.data.threads;  
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('axios error', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'something went wrong');
    } else {
      console.error('unexpected error:', error);
      throw error;
    }
  }
};

export async function getThreadById(threadId:string) {
  const response = await fetch(apiURL + `/api/threads/${threadId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch thread data");
  }
  return response.json();
}