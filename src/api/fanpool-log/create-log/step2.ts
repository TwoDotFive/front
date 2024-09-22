import apiClient from "@/api/index";

export const getTourInfo = async (
  x: string,
  y: string,
  selectedTagId: string | null
) => {
  const radius = "1000";
  const pageSize = 10;
  const pageNumber = 1;

  const response = await apiClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/tour/info`,
    {
      params: {
        pageSize,
        pageNumber,
        x,
        y,
        radius,
        contentTypeId: selectedTagId,
      },
    }
  );
  return response.data.items;
};
