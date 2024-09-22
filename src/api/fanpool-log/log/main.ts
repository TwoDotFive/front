import apiClient from "@/api/index";

export const getFanpoolLog = async (fanPoolLogId: string) => {
  const response = await apiClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/tour/log`,
    {
      params: { id: fanPoolLogId },
    }
  );
  return response;
};

export const deleteFanpoolLog = async (fanPoolLogId: string) => {
  const response = await apiClient.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/tour/log`,
    {
      params: { id: fanPoolLogId },
    }
  );
  return response;
};
