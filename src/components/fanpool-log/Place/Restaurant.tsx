import TagLocation from "@/components/common/tag/TagLocation";
import { Text } from "@/components/common/Text";
import { PlaceContent } from "@/types/types";
import React, { useState } from "react";

interface Menu {
  name: string;
  main: boolean;
}

interface RestaurantProps {
  placeContent: PlaceContent;
  name: string;
  address: string;
}

export default function Restaurant({
  placeContent,
  name,
  address,
}: RestaurantProps) {
  // CONTENT_TYPE 39

  const [visibleCnt, setVisibleCnt] = useState<number>(4);

  const createMenuObject = (
    firstMenu: string,
    treatMenu: string
  ): { [key: number]: Menu } => {
    const treatMenuArray = placeContent.treatMenu
      ? placeContent.treatMenu
          .split(" / ")
          .map((item, index, array) =>
            index === array.length - 1 ? item.replace(" 외", "") : item
          )
      : [];

    const menus: { [key: number]: Menu } = treatMenuArray.reduce(
      (acc, menuItem, index) => {
        acc[index + 1] = {
          name: menuItem,
          main: menuItem === firstMenu,
        };
        return acc;
      },
      {} as { [key: number]: Menu }
    );

    return menus;
  };

  const menus = createMenuObject(
    placeContent.firstMenu!,
    placeContent.treatMenu!
  );

  const handleShowMoreButton = () => {
    setVisibleCnt(Object.keys(menus).length);
  };
  return (
    <div className="flex flex-col pb-20pxr">
      {/* 장소 정보 태그 */}
      <div className="flex flex-col items-start self-stretch gap-16pxr">
        <TagLocation name="식당" />
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
        {/* 영업시간 */}
        <div className="flex flex-col items-start gap-4pxr">
          <Text fontSize={16} fontWeight={700}>
            영업시간
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
      </div>
      <div className="mt-40pxr" />
      <div className="flex flex-col items-start gap-8pxr self-stretch">
        <Text fontSize={16} fontWeight={700} color="gray800">
          메뉴
        </Text>
        {Object.keys(menus)
          .slice(0, visibleCnt)
          .map((key) => (
            <div key={key} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4pxr">
                <Text fontSize={14} fontWeight={500} color="gray700">
                  {menus[Number(key)].name}
                </Text>
                {menus[Number(key)].main && <TagLocation name="대표메뉴" />}
              </div>
            </div>
          ))}
        {visibleCnt < Object.keys(menus).length && (
          <div className="mx-auto">
            <button
              onClick={handleShowMoreButton}
              className="text-gray-500 mt-4"
            >
              <Text fontSize={14} fontWeight={500} color="gray300">
                더보기
              </Text>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
