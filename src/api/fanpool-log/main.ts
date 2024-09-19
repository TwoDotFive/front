import api from "@/api/index";

// data가 없으면 최신 팬풀로그, data가 있으면 해당 경기장 팬풀로그
export const getFanpoologList = async (data?: any) => {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tour/list`,
      data
    );
    return response.data;
  } catch (e) {
    if (e) return e;
  }
};
