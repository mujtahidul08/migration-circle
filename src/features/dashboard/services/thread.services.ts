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
    formData.append("content", content);

    // Jika ada file (gambar atau video), kirim ke Cloudinary terlebih dahulu
    if (file) {
      const cloudinaryData = new FormData();
      cloudinaryData.append('file', file);
      cloudinaryData.append('upload_preset', 'circle-app-upload-preset'); // Sesuaikan dengan upload preset yang Anda buat di Cloudinary

      const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/circle-app/image/upload', cloudinaryData);
      
      // Dapatkan URL file dari Cloudinary
      const imageUrl = cloudinaryResponse.data.secure_url; // URL gambar yang di-upload

      // Tambahkan URL gambar ke form data untuk dikirim ke backend
      formData.append("image", imageUrl); // Menambahkan URL gambar ke form data
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

// export const createThread = async (content: string, token: string) => {
//   try {
//     const formData = new FormData();
//     formData.append("content", content);

//     const res = await axios.post(apiURL + "api/thread", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log("Response:", res.data); // Log hasil respon
//     return res.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error:", error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || "Something went wrong");
//     } else {
//       console.error("Unexpected error:", error);
//       throw error;
//     }
//   }
// };

export async function getThreadById(threadId: string, token: string) { 
  console.log(`Fetching thread details from: ${apiURL}/api/thread/${threadId}`);
  const response = await fetch(apiURL + `api/thread/${threadId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch thread data");
  }
  return response.json();
}