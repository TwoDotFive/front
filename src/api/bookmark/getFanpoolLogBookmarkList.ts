import apiClient from "@/api/index";

export const getFanpoolLogBookmarkList = async () => {
  const response = await apiClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/tour/log/bookmark`
  );
  return response;
};
