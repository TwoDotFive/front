import React from "react";
import { Text } from "../common/Text";
import Button from "../common/Button";
import LocationInfoMiniCard from "./LocationInfoMiniCard";
import classNames from "classnames";

type TravelLogAddCardProps = {
  image: string;
  name: string;
  location: string;
  description: string;
  userId: string; // 수정 필요
  locationImage: string[];
  onClick: () => void;
  onRemove?: () => void;
  isEditing: boolean;
};

export default function TravelogAddCard({
  image,
  name,
  location,
  description,
  userId,
  locationImage,
  onClick,
  onRemove,
  isEditing,
}: TravelLogAddCardProps) {
  // locationImage의 length에 따라 이미지를 보여주는 방식을 다르게 해야함
  // userId가 myUserId인 경우에만 메모 추가 버튼이 보여야함
  const imgLength = locationImage.length;

  const getImageContainerClasses = () => {
    return classNames("flex", "gap-8pxr", {
      "w-full h-274pxr": imgLength === 1,
      "grid grid-cols-2 gap-4pxr": imgLength === 2,
      "grid grid-cols-3 gap-4pxr": imgLength === 3,
      "grid grid-cols-4 gap-4pxr": imgLength == 4,
    });
  };
  return (
    <div className="flex w-300pxr items-center gap-8pxr rounded-8pxr border border-gray100 bg-gray000 shadow-[2px_2px_20px_0px_rgba(47,47,48,0.10)]">
      <div className="flex w-fit p-12pxr items-center gap-8pxr">
        <div className="flex w-276pxr flex-col items-start gap-12pxr">
          <LocationInfoMiniCard
            image={image}
            name={name}
            location={location}
            isEditing={isEditing}
            onRemove={onRemove}
          />
          <Text fontSize={14} fontWeight={500} color="gray700">
            {description}
          </Text>
          <div className={getImageContainerClasses()}>
            {locationImage.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                className="rounded-4pxr w-full h-full"
                alt={`location-${index}`}
              />
            ))}
          </div>
          {userId === "myUserId" && !isEditing && (
            <Button
              width="276px"
              height="40px"
              text={"메모 편집"}
              borderRadius={8}
              enabledTextColor={"text-gray600"}
              enabledBackgroundColor={"bg-gray050"}
              disabledTextColor={"text-gray300"}
              disabledBackgroundColor={"bg-primary"}
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
