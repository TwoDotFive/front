import TagLocation from "@/components/common/tag/TagLocation";
import { Text } from "@/components/common/Text";
import { PlaceContent } from "@/types/types";
import React, { useState } from "react";

interface CultureSpotProps {
  placeContent: PlaceContent;
  name: string;
  address: string;
}

export default function CultureSpot({
  placeContent,
  name,
  address,
}: CultureSpotProps) {
  // CONTENT_TYPE 12, 14

  return (
    <div className="flex flex-col pb-20pxr">
      {/* 장소 정보 태그 */}
      <div className="flex flex-col items-start self-stretch gap-16pxr">
        <TagLocation name="지역명소" />
        {/* 장소 기본 내용 (이름, 주소) */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={20} fontWeight={700} color="gray700">
            {name}
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {address}
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {/* infoCenter가 null 혹은 "" 인 경우 제공되지 않음. 으로 표기 */}
            {placeContent.infoCenter || "제공되지 않음"}
          </Text>
        </div>
        {/* 이용시간 */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={16} fontWeight={700}>
            이용시간
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {placeContent.openTime || "제공되지 않음"}
          </Text>
        </div>
        {/* 휴무 */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={16} fontWeight={700}>
            휴무
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {placeContent.restDate || "휴무 없음"}
          </Text>
        </div>
        {/* 입장료 */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={16} fontWeight={700}>
            입장료
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {placeContent.fee || "제공되지 않음"}
          </Text>
        </div>
        {/* 주차시설 */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={16} fontWeight={700}>
            주차시설
          </Text>
          <Text fontSize={14} fontWeight={400} color="gray600">
            {placeContent.parking || "제공되지 않음"}
          </Text>
        </div>
      </div>
    </div>
  );
}
