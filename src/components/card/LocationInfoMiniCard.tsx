import React from "react";
import { Text } from "../common/Text";
import { IconClose, IconHamburgerGray } from "@/public/icons";
import { usePathname } from "next/navigation";

type LocationInfoMiniCardProps = {
  type: string;
  image: string;
  name: string;
  location: string;
  onRemove?: () => void;
  isEditing: boolean;
};

export default function LocationInfoMiniCard({
  type,
  image,
  name,
  location,
  onRemove,
  isEditing,
}: LocationInfoMiniCardProps) {
  const pathname = usePathname();

  const isLogDetailPage = pathname.startsWith("/fanpool-log/log/");

  const showCloseButton = !(type === "28" || name === "고척스카이돔");

  return (
    <div className="relative flex items-center gap-8pxr w-fit">
      <div className="w-50pxr h-50pxr rounded-5pxr">
        <img className="w-full h-full" src={image} />
      </div>
      <div className="flex w-218pxr flex-col items-start">
        <Text fontSize={16} fontWeight={700} color="gray700">
          {name}
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray600">
          {location}
        </Text>
      </div>

      {/* isEditing 상태에 따라 X 버튼 또는 햄버거 버튼 표시 */}
      {!isLogDetailPage && (
        <div className="absolute right-0 top-0">
          {isEditing ? (
            <IconHamburgerGray />
          ) : (
            showCloseButton && (
              <button onClick={onRemove}>
                <IconClose />
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
