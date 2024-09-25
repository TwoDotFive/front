import apiClient from "@/api/index";
import { Schedule } from "@/store/fanpool-log/store";

export const getPresignedUrl = async () => {
  const response = await apiClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/file/presigned-url`
  );
  return response;
};

export const postFanoolLog = async (
  title: string,
  image: string | null,
  stadiumId: number,
  schedules: Schedule[]
) => {
  const response = await apiClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/tour/log`,
    {
      title,
      image,
      stadiumId,
      schedules,
    }
  );
  return response;
};

export const editFanpoolLog = async (
  id: string,
  title: string,
  image: string | null,
  stadiumId: number,
  schedules: Schedule[]
) => {
  const response = await apiClient.put(
    `${process.env.NEXT_PUBLIC_API_URL}/tour/log`,
    {
      title,
      image,
      stadiumId,
      schedules,
    },
    {
      params: { id },
    }
  );
  return response;
};
