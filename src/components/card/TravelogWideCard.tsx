import React, { useState } from "react";
import { Text } from "../common/Text";
import { useRouter } from "next/navigation";

type TravelogWideCardProps = {
  id: string;
  image: string;
  userName: string;
  title: string;
  locations?: string;
};

export default function TravelogWideCard({
  id,
  image,
  userName,
  title,
  locations,
}: TravelogWideCardProps) {
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState(image);

  const handleClick = () => {
    router.push(`/fanpool-log/log/${id}`);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageSrc(
      `/images/fanpool_log_image_default_wide_${(Number(id) % 5) + 1}.png`
    );
  };

  const places = locations?.split(",");

  // 장소가 1~3개일 경우와 4개 이상일 경우를 나누어서 렌더링
  const renderLocations = () => {
    if (!places) return;
    if (places.length <= 3) {
      // 장소가 1~3개일 경우
      return (
        <Text fontSize={14} fontWeight={600} color="gray600">
          {places.join(", ")}
        </Text>
      );
    } else {
      // 장소가 4개 이상일 경우
      return (
        <>
          <Text fontSize={14} fontWeight={600} color="gray600">
            {places[0]}, {places[1]}, {places[2]}
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            외 {places.length - 3}곳
          </Text>
        </>
      );
    }
  };

  return (
    <div
      className="flex flex-col items-start justify-center w-full h-180pxr rounded-8pxr shadow-[0px_0px_34px_0px_rgba(0,37,97,0.10)]"
      onClick={handleClick}
    >
      <div className="w-full h-86pxr rounded-t-8pxr">
        <img
          className="w-full h-full rounded-t-8pxr object-cover"
          src={imageSrc}
          onError={handleImageError}
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-10pxr p-14pxr h-94pxr">
        <div className="flex items-center">
          <Text fontSize={12} fontWeight={700} color="gray600">
            {userName}
          </Text>
          <Text fontSize={12} fontWeight={500} color="gray600">
            님의 팬풀로그
          </Text>
        </div>
        <Text fontSize={16} fontWeight={700} color="gray800">
          {title}
        </Text>
        <div className="flex items-center">{renderLocations()}</div>
      </div>
    </div>
  );
}
