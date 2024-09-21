import TagLocation from "@/components/common/tag/TagLocation";
import { Text } from "@/components/common/Text";
import { PlaceContent } from "@/types/types";
import React, { useState } from "react";

interface AccomodationProps {
  placeContent: PlaceContent;
  name: string;
  address: string;
}

export default function Accommodation({
  placeContent,
  name,
  address,
}: AccomodationProps) {
  // CONTENT_TYPE 38

  return (
    <div className="flex flex-col pb-20pxr">
      {/* 장소 정보 태그 */}
      <div className="flex flex-col items-start self-stretch gap-16pxr">
        <TagLocation name="숙박" />
        {/* 장소 기본 내용 (이름, 주소) */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={20} fontWeight={700} color="gray700">
            {name}
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {address}
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {placeContent.infoCenter || "제공되지 않음"}
          </Text>
        </div>
        {/* 입실시간 */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={16} fontWeight={700}>
            입실시간
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {placeContent.checkInTime || "제공되지 않음"}
          </Text>
        </div>
        {/* 퇴실시간 */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={16} fontWeight={700}>
            퇴실시간
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {placeContent.checkOutTime || "제공되지 않음"}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4pxr">
        <Text fontSize={16} fontWeight={700}>
          주차시설
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray600">
          {placeContent.parking || "제공되지 않음"}
        </Text>
      </div>
      <div className="flex flex-col items-start gap-4pxr">
        <Text fontSize={16} fontWeight={700}>
          예약 안내 홈페이지
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray600">
          {placeContent.reservervationPageUrl || "제공되지 않음"}
        </Text>
      </div>
    </div>
  );
}
