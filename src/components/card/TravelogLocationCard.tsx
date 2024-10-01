import React from "react";
import LocationInfoMiniCard from "./LocationInfoMiniCard";
import Button from "../common/Button";

type TravelogLocationCardProps = {
  type: string;
  image: string;
  name: string;
  location: string;
  onClick: () => void;
  onRemove?: () => void;
  isEditing: boolean;
};

export default function TravelogLocationCard({
  type,
  image,
  name,
  location,
  onClick,
  onRemove,
  isEditing,
}: TravelogLocationCardProps) {
  return (
    <div className="flex w-300pxr p-12pxr items-center gap-8pxr flex-shrink-0 rounded-8pxr bg-gray000 shadow-[2px_2px_20px_0px_rgba(47,47,48,0.10)]">
      <div className="flex flex-col items-start gap-8pxr">
        <LocationInfoMiniCard
          type={type}
          image={image}
          name={name}
          location={location}
          isEditing={isEditing}
          onRemove={onRemove} // X 버튼 클릭 시 동작할 삭제 함수
        />
        {/* 순서 바꾸기 모드가 아닐 때만 메모추가 버튼 표시 */}
        {!isEditing && (
          <Button
            width="276px"
            height="40px"
            text={"메모추가"}
            borderRadius={8}
            fontSize={14}
            fontWeight={700}
            enabledTextColor={"text-kboBlue500"}
            enabledBackgroundColor={"bg-kboBlue0"}
            disabledTextColor={"text-gray600"}
            disabledBackgroundColor={"bg-gray050"}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
}
