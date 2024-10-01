import { Text } from "@/components/common/Text";
import { IconRightArrow } from "@/public/icons";
import { ro } from "date-fns/locale";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FanpoologUserProps {
  id: string;
  name: string;
  image: string;
}

export default function FanpoologUser({ id, name, image }: FanpoologUserProps) {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(image);

  const handleImageError = () => {
    setImageSrc("/images/default_profile.png");
  };

  const handleProfileClick = () => {
    router.push(`/fanpool-log/user/${id}`);
  };
  return (
    <div className="w-full h-45 flex items-center justify-start gap-8pxr p-20pxr pb-0">
      <div className="w-40pxr h-40pxr rounded-24pxr">
        <img
          className="w-full h-full rounded-24pxr"
          src={imageSrc}
          onError={handleImageError}
        />
      </div>
      <div className="flex justify-center flex-col">
        <Text fontSize={16} fontWeight={600} color="gray700">
          {name}
        </Text>
      </div>
      <button
        className="flex items-center jusitify-center p-8pxr ml-auto"
        onClick={handleProfileClick}
      >
        <IconRightArrow />
      </button>
    </div>
  );
}
