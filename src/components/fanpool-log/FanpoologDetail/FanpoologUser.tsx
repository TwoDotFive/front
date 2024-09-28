import { Text } from "@/components/common/Text";
import { IconRightArrow } from "@/public/icons";
import React, { useState } from "react";

interface FanpoologUserProps {
  name: string;
  image: string;
}

export default function FanpoologUser({ name, image }: FanpoologUserProps) {
  const [imageSrc, setImageSrc] = useState(image);

  const handleImageError = () => {
    setImageSrc("/images/default_profile.png");
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
      <button className="flex items-center jusitify-center p-8pxr ml-auto">
        <IconRightArrow />
      </button>
    </div>
  );
}
