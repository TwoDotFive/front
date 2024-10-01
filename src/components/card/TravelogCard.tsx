import React, { useState } from "react";
import { Text } from "../common/Text";
import { useRouter } from "next/navigation";

type TravelogCardProps = {
  id: string;
  image: string;
  userName: string;
  userImage: string;
  title: string;
  locations?: string;
};

export default function TravelogCard({
  id,
  image,
  userName,
  userImage,
  title,
  locations,
}: TravelogCardProps) {
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState(image);
  const [userImageSrc, setUserImageSrc] = useState(userImage);

  const handleClick = () => {
    router.push(`/fanpool-log/log/${id}`);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageSrc(
      `/images/fanpool_log_image_default_${(Number(id) % 5) + 1}.png`
    );
  };

  const handleUserImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setUserImageSrc("/images/default_profile.png");
  };

  const places = locations?.split(",");

  return (
    <div
      className="flex flex-col items-start w-235pxr h-302pxr rounded-8pxr relative shadow-[0px_0px_34px_0px_rgba(0,37,97,0.10)] cursor-pointer"
      onClick={handleClick}
      style={{ minWidth: "235px" }}
    >
      <div className="self-stretch w-full h-180pxr rounded-t-8pxr">
        <img
          className="w-full h-full rounded-t-8pxr"
          src={imageSrc}
          onError={handleImageError}
        />
      </div>
      <div className="absolute top-150pxr left-10pxr w-40pxr h-40pxr rounded-full border-1pxr border-gray300 z-10">
        <img
          className="w-full h-full rounded-full"
          src={userImageSrc}
          onError={handleUserImageError}
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-10pxr self-stretch p-30pxr px-14pxr rounded-b-8pxr bg-gray000">
        <div className="flex flex-col items-start gap-4pxr self-stretch">
          <div className="flex items-center">
            <Text fontSize={12} fontWeight={700}>
              {userName}
            </Text>
            <Text fontSize={12} fontWeight={500} color="gray600">
              님의 로그
            </Text>
          </div>
          <Text
            fontSize={16}
            fontWeight={700}
            color="gray800"
            className="line-clamp-1"
          >
            {title}
          </Text>
          {places && (
            <div className="flex items-center">
              <Text
                fontSize={14}
                fontWeight={600}
                color="gray600"
                className="line-clamp-1"
              >
                {places[0].length > 14
                  ? `${places[0].slice(0, 14)}...`
                  : places[0]}
              </Text>
              {places.length > 1 && (
                <Text fontSize={14} fontWeight={400} color="gray600">
                  외 {places.length - 1}곳
                </Text>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
