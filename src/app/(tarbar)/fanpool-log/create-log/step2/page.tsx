"use client";
import React, { useState, useEffect } from "react";
import TapBar from "@/components/common/TapBar";
import { Text } from "@/components/common/Text";
import Button from "@/components/common/Button";
import TagFilter from "@/components/fanpool-log/Create-log/TagFilter";
import LocationInfoSearchCard from "@/components/card/LocationInfoSearchCard";
import LocationDeleteButton from "@/components/common/button/LocationDeleteButton"; // Import LocationDeleteButton
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const tags = ["식당", "카페", "지역명소", "숙소", "쇼핑", "주차장"];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]); // 필터링된 아이템
  const [locationData, setLocationData] = useState<any[]>([]); // 더미 데이터 저장

  // 더미 데이터
  const dummyData = [
    {
      name: "피처캠프 신천점",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 25",
      category: "식당",
    },
    {
      name: "스타벅스 올림픽공원점",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 26",
      category: "카페",
    },
    {
      name: "올림픽공원",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 27",
      category: "지역명소",
    },
    {
      name: "올림픽파크텔",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 28",
      category: "숙소",
    },
    {
      name: "롯데월드몰",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 29",
      category: "쇼핑",
    },
    {
      name: "잠실종합운동장 주차장",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 30",
      category: "주차장",
    },
    {
      name: "피처캠프 신천점",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 25",
      category: "식당",
    },
    {
      name: "스타벅스 올림픽공원점",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 26",
      category: "카페",
    },
    {
      name: "올림픽공원",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 27",
      category: "지역명소",
    },
    {
      name: "올림픽파크텔",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 28",
      category: "숙소",
    },
    {
      name: "롯데월드몰",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 29",
      category: "쇼핑",
    },
    {
      name: "잠실종합운동장 주차장",
      image: "/images/fanpool-log_ex.png",
      location: "서울 송파구 올림픽로 30",
      category: "주차장",
    },
  ];

  useEffect(() => {
    // 더미 데이터로 대체
    setLocationData(dummyData);
  }, []);

  // 태그에 따라 아이템 필터링
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredItems(locationData); // 태그가 선택되지 않았을 때 전체 표시
    } else {
      setFilteredItems(
        locationData.filter((item) => selectedTags.includes(item.category))
      );
    }
  }, [selectedTags, locationData]);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleItemSelect = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleNextPage = () => {
    router.push("/fanpool-log/create-log/step3");
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed flex flex-col h-screen w-full"
    >
      {/* 탭바 */}
      <div className="top-0 left-0 right-0 z-100 bg-white">
        <TapBar text="팬풀로그 만들기" type="mid" isNextButton={false} />
      </div>
      <div className="mt-24pxr" />
      <div className="ml-20pxr">
        <Text fontSize={18} fontWeight={700} color="gray700">
          경기장 근처의 이런 곳은 어떠세요?
        </Text>
        {/* 태그 필터 */}
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
      </div>

      {/* 장소 리스트 */}
      <div className="flex flex-col gap-12pxr mt-24pxr px-20pxr overflow-y-scroll flex-grow">
        {filteredItems.map((item, index) => (
          <LocationInfoSearchCard
            key={index}
            image={item.image} // 더미 데이터에 따른 이미지
            name={item.name} // 더미 데이터에 따른 이름
            location={item.location} // 더미 데이터에 따른 위치
            onClick={() => handleItemSelect(item.name)} // 클릭 시 항목 선택
            isSelected={selectedItems.includes(item.name)} // 선택 상태 반영
          />
        ))}
      </div>

      {/* 바텀 시트 */}
      <div
        className={
          "fixed w-full flex flex-col items-center justify-center gap-32pxr inset-x-0 bottom-0 bg-white rounded-t-20pxr p-20pxr pt-16pxr"
        }
        style={{ zIndex: 1000, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
      >
        {selectedItems.length > 0 ? (
          <>
            <div className="w-full flex justify-start gap-12pxr overflow-x-auto pt-22pxr">
              {selectedItems.map((item, index) => (
                <LocationDeleteButton
                  key={index}
                  image={"/images/fanpool-log_ex.png"} // 이미지 정보 전달
                  name={item} // 이름 전달
                  onClick={() => handleItemSelect(item)} // 클릭 시 선택 해제
                />
              ))}
            </div>
            <Button
              height="50px"
              text={"로그 작성 시작하기"}
              borderRadius={8}
              enabledTextColor={"text-white"}
              enabledBackgroundColor={"bg-primary"}
              disabledTextColor={"text-[#5679A3]"}
              disabledBackgroundColor={"bg-primary"}
              onClick={handleNextPage}
            />
          </>
        ) : (
          <Button
            height="50px"
            text={"나중에 할래요"}
            borderRadius={8}
            enabledTextColor={"text-primary"}
            enabledBackgroundColor={"bg-[#CCD3DF]"}
            disabledTextColor={"text-[#5679A3]"}
            disabledBackgroundColor={"bg-primary"}
            onClick={handleNextPage}
          />
        )}
      </div>
    </motion.div>
  );
}
