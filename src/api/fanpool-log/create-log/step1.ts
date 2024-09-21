import apiClient from "@/api/index";

export const getStadiumList = async () => {
  try {
    const response = await apiClient.get(
      `${process.env.NEXT_PUBLIC_API_URL}/baseball/stadium/list`
    );
    return response.data;
  } catch (e) {
    if (e) return e;
  }
};
