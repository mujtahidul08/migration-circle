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

export const createThread = async (content: string, token: string, file: File | null) => {
  try {
    const formData = new FormData();
    formData.append("content", content);  // Mengirim konten thread

    if (file) {
      console.log('File selected:', file); // Untuk memeriksa file yang dipilih

      formData.append("image", file); // Menambahkan file gambar yang dipilih
    }

    // Kirim formData ke backend
    const res = await axios.post(apiURL + "api/thread", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", res.data); // Log hasil respon
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Something went wrong");
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};

export async function getThreadById(threadId: string, token: string) { 
  const response = await fetch(`${apiURL}api/thread/${threadId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch thread data");
  }

  return response.json();
}

// export async function getThreadById(threadId: string, token: string) { 
//   console.log(`Fetching thread details from: ${apiURL}api/thread/${threadId}`);
//   const response = await fetch(apiURL + `api/thread/${threadId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch thread data");
//   }
//   return response.json();
// }

export const likeThread = async (threadId: number, token: string) => {
  return axios.post(
    apiURL+`api/threads/like/${threadId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};