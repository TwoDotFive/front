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
import useFanpoologStore from "@/store/fanpool-log/store";
import { getTourInfo } from "@/api/fanpool-log/create-log/step2";

interface TourInfoList {
  name: string;
  address: string;
  thumbnail: string;
  distance: number;
  contentId: number;
  contentType: string;
  x: number;
  y: number;
}

export default function Page() {
  const router = useRouter();
  const tags = [
    { id: "12", name: "관광지" },
    { id: "14", name: "문화시설" },
    { id: "32", name: "숙소" },
    { id: "38", name: "쇼핑" },
    { id: "39", name: "식당" },
  ];

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<TourInfoList[]>([]);
  const [tourInfoList, setTourInfoList] = useState<TourInfoList[]>([]);

  const stadiumId = useFanpoologStore((state) => state.stadiumId);
  const stadiumPosition = useFanpoologStore((state) => state.stadiumPosition);
  const schedules = useFanpoologStore((state) => state.schedules);

  useEffect(() => {
    if (!stadiumPosition || !stadiumId) {
      router.replace("/fanpool-log/create-log/step1");
    } else {
      // API 호출
      getTourInfo(
        stadiumPosition!.y.toString(),
        stadiumPosition!.x.toString(),
        selectedTagId,
        1
      ).then((res) => {
        // TourInfoList 설정
        setTourInfoList(res);
      });
    }
  }, [selectedTagId]);

  useEffect(() => {
    setSelectedItems(schedules.map((schedule) => schedule.place));
  }, [schedules]);

  const handleTagSelect = (selectedTagName: string) => {
    const selectedTag = tags.find((tag) => tag.name === selectedTagName);
    if (selectedTagId === selectedTag?.id) {
      setSelectedTagId(null);
    } else {
      setSelectedTagId(selectedTag?.id || null);
    }
  };

  const handleItemSelect = (item: TourInfoList) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.contentId === item.contentId
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.contentId !== item.contentId
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleNextPage = () => {
    // 추후 경기장 정보도 추가해서 보내야함.
    const schedules = selectedItems.map((item, index) => ({
      place: {
        name: item.name,
        address: item.address,
        thumbnail: item.thumbnail,
        distance: item.distance,
        contentId: item.contentId,
        contentType: item.contentType,
        x: item.x,
        y: item.y,
      },
      day: 1,
      sequence: index + 1,
    }));

    useFanpoologStore.setState({ schedules });

    router.push("/fanpool-log/create-log/step3");
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute flex flex-col h-screen w-full"
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
          tags={tags.map((tag) => tag.name)}
          selectedTags={[
            tags.find((tag) => tag.id === selectedTagId)?.name || "",
          ]}
          onTagSelect={handleTagSelect}
        />
      </div>

      {/* 장소 리스트 */}
      <div className="flex flex-col gap-12pxr mt-24pxr px-20pxr overflow-y-scroll flex-grow">
        {tourInfoList.map((item, index) => (
          <LocationInfoSearchCard
            key={item.contentId}
            image={
              item.thumbnail === ""
                ? "/images/empty_image_place.png"
                : item.thumbnail
            }
            name={item.name}
            location={item.address}
            contentId={item.contentId}
            contentType={item.contentType}
            onClick={() => handleItemSelect(item)}
            isSelected={selectedItems.some(
              (selectedItem) => selectedItem.contentId === item.contentId
            )}
          />
        ))}
      </div>
      <div className="mb-102pxr" />
      {/* 바텀 시트 */}
      <div
        className={
          "max-w-399pxr fixed w-full flex flex-col items-center justify-center gap-32pxr inset-x-0 bottom-0 bg-white rounded-t-20pxr p-20pxr pt-16pxr"
        }
        style={{
          zIndex: 1000,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        {selectedItems.length > 0 ? (
          <>
            <div className="w-full flex justify-start gap-12pxr overflow-x-auto pt-22pxr">
              {selectedItems.map((item, index) => (
                <LocationDeleteButton
                  key={index}
                  image={item.thumbnail}
                  name={item.name}
                  onClick={() => handleItemSelect(item)}
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
