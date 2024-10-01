import apiClient from "@/api/index";

// data가 없으면 최신 팬풀로그, data가 있으면 해당 경기장 팬풀로그
export const getFanpoologList = async (data?: any) => {
  const pageSize = 100;

  try {
    const response = await apiClient.get(`/tour/list`, {
      params: {
        pageSize,
      },
    });
    return response.data;
  } catch (e) {
    if (e) return e;
  }
};
