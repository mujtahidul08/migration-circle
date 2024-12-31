import axios from "axios";

export const createReply = async (
  content: string,
  token: string,
  file: File | null,
  threadId: string
) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("threadId", threadId);

    if (file) {
      formData.append("image", file);
    }

    const res = await axios.post(
      `api/reply/${threadId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
