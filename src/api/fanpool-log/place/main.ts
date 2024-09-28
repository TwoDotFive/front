import apiClient from "@/api";

export const getTourInfoDetail = async (
  contentId: string,
  contentType: string
) => {
  const response = await apiClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/tour/info/details`,
    {
      params: {
        contentId,
        contentTypeId: contentType,
      },
    }
  );
  return response.data;
};
