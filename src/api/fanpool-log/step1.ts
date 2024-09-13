import api from "@/api/index";

export const getStadiumList = async (token: string) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/baseball/stadium/list`,
      header
    );
    return response.data;
  } catch (e) {
    if (e) return e;
  }
};
