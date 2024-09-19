"use client";

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Map } from "react-kakao-maps-sdk";
import TapBar from "@/components/common/TapBar";
import InfinityLine from "@/components/common/InfinityLine";
import { Text } from "@/components/common/Text";
import { IconDefaultPin } from "@/public/icons";
import TravelogLocationCard from "@/components/card/TravelogLocationCard";
import Button from "@/components/common/Button";
import MemoBottomSheet from "@/components/fanpool-log/Create-log/MemoBottomSheet";
import DayBottomSheet from "@/components/fanpool-log/Create-log/DayBottomSheet";
import useKakaoLoader from "@/components/fanpool-log/FanpoologDetail/useKakaoLoader";
import TravelogAddCard from "@/components/card/TravelogAddCard";

function SortableItem({ id, children, isChangeMode }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // 드래그가 가능할 때만 적용되는 스타일
  const style = isChangeMode
    ? {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 200ms ease", // 부드러운 이동을 위한 전환
        opacity: isDragging ? 0.5 : 1, // 드래그 중일 때의 시각적 피드백
        zIndex: isDragging ? 999 : "auto", // 드래그 중에 해당 아이템을 맨 위에 보이게 함
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isChangeMode ? attributes : {})}
      {...(isChangeMode ? listeners : {})} // 드래그 가능할 때만 attributes와 listeners 적용
    >
      {children}
    </div>
  );
}

export default function Page() {
  useKakaoLoader();
  const [isMemoBottomSheetVisible, setIsMemoBottomSheetVisible] =
    useState<boolean>(false);
  const [isDayBottomSheetVisible, setIsDayBottomSheetVisible] =
    useState<boolean>(false);

  const [isMemoEditMode, setIsMemoEditMode] = useState<boolean>(false);
  const [isChangeMode, setIsChangeMode] = useState<boolean>(false);
  const [days, setDays] = useState(["Day 1"]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<
    number | null
  >(null);
  const [locations, setLocations] = useState<
    Array<{
      id: number;
      name: string;
      location: string;
      image: string;
      memo: { content: string; images: string[] };
    }>
  >([
    {
      id: 1,
      name: "잠실종합운동장 잠실야구장",
      location: "서울 송파구 올림픽로 25",
      image: "/images/doosan.png",
      memo: { content: "", images: [] },
    },
    {
      id: 2,
      name: "장소 2",
      location: "서울 송파구 올림픽로 25",
      image: "/images/kt.png",
      memo: { content: "", images: [] },
    },
    {
      id: 3,
      name: "장소 3",
      location: "서울 송파구 올림픽로 25",
      image: "/images/samsung.png",
      memo: { content: "", images: [] },
    },
    {
      id: 4,
      name: "장소 4",
      location: "서울 송파구 올림픽로 25",
      image: "/images/ssg.png",
      memo: { content: "", images: [] },
    },
  ]);

  const handleRemoveLocation = (index: number) => {
    setLocations((locations) =>
      locations.filter((location) => location.id !== index)
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLocations((locations) => {
        const oldIndex = locations.findIndex((item) => item.id === active.id);
        const newIndex = locations.findIndex((item) => item.id === over.id);
        return arrayMove(locations, oldIndex, newIndex);
      });
    }
  };

  const handleMemoOpen = (index: number) => {
    setSelectedLocationIndex(index);
    setIsMemoBottomSheetVisible(true);
    setIsMemoEditMode(true);
  };

  const handleMemoSave = (content: string, images: string[]) => {
    if (selectedLocationIndex !== null) {
      const updatedLocations = [...locations];
      updatedLocations[selectedLocationIndex].memo.content = content;
      updatedLocations[selectedLocationIndex].memo.images = images;
      setLocations(updatedLocations);
      setIsMemoBottomSheetVisible(false);
    }
  };

  const handleMemoDelete = () => {
    if (selectedLocationIndex !== null) {
      const updatedLocations = [...locations];
      updatedLocations[selectedLocationIndex].memo.content = "";
      updatedLocations[selectedLocationIndex].memo.images = [];
      setLocations(updatedLocations);
      setIsMemoBottomSheetVisible(false);
    }
  };

  return (
    <div className="fixed flex flex-col w-full h-screen">
      {/* 탭바 */}
      <div className="top-0 left-0 right-0 z-100 bg-white">
        <TapBar text="팬풀로그 만들기" type="mid" isNextButton={false} />
      </div>
      <div className="overflow-y-auto">
        <div className="mt-24pxr" />
        {/* 카카오맵 */}
        <Map
          id="map"
          center={{
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            width: "100%",
            height: "170px",
          }}
          level={3}
        />
        <div className="mt-45pxr" />
        <InfinityLine
          color="bg-gray-50"
          thickness="h-3pxr"
          marginTop="mt-20pxr"
          marginBottom="mb-32pxr"
        />
        {/* 장소 리스트 */}
        <div className="relative flex flex-col items-start px-20pxr">
          {days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="flex flex-col items-start justify-center w-full "
            >
              <Text fontSize={18} fontWeight={700} color="gray800">
                {day}
              </Text>
              <div className="mt-18pxr" />

              {/* 드래그 앤 드롭 기능은 isChangeMode가 true일 때만 활성화 */}
              {isChangeMode ? (
                <DndContext
                  modifiers={[restrictToWindowEdges]} // 드래그 중 윈도우 경계로 제한
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={locations}
                    strategy={verticalListSortingStrategy}
                  >
                    {locations.map((location, index) => (
                      <SortableItem
                        key={location.id}
                        id={location.id}
                        isChangeMode={isChangeMode}
                      >
                        <div className="relative flex items-center mb-16pxr w-full">
                          <div className="relative z-10">
                            <div className="flex items-center justify-center">
                              <IconDefaultPin />
                            </div>
                            <span className="absolute inset-0 flex items-center justify-center">
                              <Text
                                fontSize={12}
                                fontWeight={700}
                                color="white"
                              >
                                {index + 1}
                              </Text>
                            </span>
                          </div>
                          {/* 장소 카드 */}
                          <div className="ml-16pxr w-full">
                            {location.memo.content.length > 0 ? (
                              <TravelogAddCard
                                image={location.image}
                                name={location.name}
                                location={location.location}
                                description={location.memo.content}
                                userId={"myUserId"}
                                locationImage={location.memo.images}
                                onClick={() => handleMemoOpen(index)}
                                isEditing={isChangeMode}
                                onRemove={() =>
                                  handleRemoveLocation(location.id)
                                }
                              />
                            ) : (
                              <TravelogLocationCard
                                image={location.image}
                                name={location.name}
                                location={location.location}
                                isEditing={isChangeMode}
                                onClick={() => handleMemoOpen(index)}
                                onRemove={() =>
                                  handleRemoveLocation(location.id)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                /* 드래그 앤 드롭이 불가능할 때는 단순한 리스트만 렌더링 */
                locations.map((location, index) => (
                  <div
                    key={location.id}
                    className="relative flex items-center mb-16pxr w-full"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-center">
                        <IconDefaultPin />
                      </div>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Text fontSize={12} fontWeight={700} color="white">
                          {index + 1}
                        </Text>
                      </span>
                    </div>
                    {/* 장소 카드 */}
                    <div className="ml-16pxr w-full">
                      {location.memo.content.length > 0 ? (
                        <TravelogAddCard
                          image={location.image}
                          name={location.name}
                          location={location.location}
                          description={location.memo.content}
                          userId={"myUserId"}
                          locationImage={location.memo.images}
                          onClick={() => handleMemoOpen(index)}
                          onRemove={() => handleRemoveLocation(location.id)}
                          isEditing={isChangeMode}
                        />
                      ) : (
                        <TravelogLocationCard
                          image={location.image}
                          name={location.name}
                          location={location.location}
                          isEditing={isChangeMode}
                          onClick={() => handleMemoOpen(index)}
                          onRemove={() => handleRemoveLocation(location.id)}
                        />
                      )}
                    </div>
                  </div>
                ))
              )}

              {dayIndex < days.length - 1 && (
                <InfinityLine
                  color="bg-gray-50"
                  thickness="h-3pxr"
                  marginTop="mt-20pxr"
                  marginBottom="mb-32pxr"
                />
              )}
            </div>
          ))}
        </div>

        {/* 장소 리스트 끝 버튼 */}
        <div className="relative flex items-center px-20pxr">
          <IconDefaultPin />
          <div className="flex flex-col items-start gap-12pxr w-full p-12pxr">
            {!isChangeMode && (
              <div className="flex justify-center items-center gap-8pxr w-full">
                <Button
                  width="146px"
                  height="50px"
                  text={"장소 추가"}
                  borderRadius={8}
                  enabledTextColor={"text-primary"}
                  enabledBackgroundColor={"bg-gray050"}
                  disabledTextColor={"text-gray600"}
                  disabledBackgroundColor={"bg-gray050"}
                  onClick={() => {}}
                />
                <Button
                  width="146px"
                  height="50px"
                  text={"DAY 편집"}
                  borderRadius={8}
                  enabledTextColor={"text-primary"}
                  enabledBackgroundColor={"bg-gray050"}
                  disabledTextColor={"text-gray600"}
                  disabledBackgroundColor={"bg-gray050"}
                  onClick={() =>
                    setIsDayBottomSheetVisible(!isDayBottomSheetVisible)
                  }
                />
              </div>
            )}
            <Button
              height="50px"
              text={isChangeMode ? "편집으로 돌아가기" : "순서 바꾸기"}
              borderRadius={8}
              enabledTextColor={"text-kboBlue500"}
              enabledBackgroundColor={"bg-kboBlue0"}
              disabledTextColor={"text-gray600"}
              disabledBackgroundColor={"bg-gray050"}
              onClick={() => setIsChangeMode(!isChangeMode)}
            />
          </div>
        </div>
      </div>
      {/* 바텀 시트 */}
      <div className="mb-102pxr" />
      <div
        className={
          "fixed flex items-center justify-center inset-x-0 bottom-0 w-full bg-white rounded-t-20pxr p-20pxr pt-16pxr"
        }
        style={{ zIndex: 1, overflowY: "unset" }}
      >
        <Button
          height="50px"
          text={"완료"}
          borderRadius={8}
          enabledTextColor={"text-white"}
          enabledBackgroundColor={"bg-primary"}
          disabledTextColor={"text-[#5679A3]"}
          disabledBackgroundColor={"bg-primary"}
          disabled={isChangeMode}
          onClick={() => {}}
        />
      </div>

      {/* Memo BottomSheet */}
      <MemoBottomSheet
        isVisible={isMemoBottomSheetVisible}
        onClose={() => setIsMemoBottomSheetVisible(false)}
        isEditMode={isMemoEditMode}
        onSave={handleMemoSave}
        onDelete={handleMemoDelete}
        initialMemo={
          selectedLocationIndex !== null
            ? locations[selectedLocationIndex].memo.content
            : ""
        }
        initialImages={
          selectedLocationIndex !== null
            ? locations[selectedLocationIndex].memo.images
            : []
        }
      />

      {/* Day 편집 바텀 시트 */}
      <DayBottomSheet
        isVisible={isDayBottomSheetVisible}
        onClose={() => setIsDayBottomSheetVisible(false)}
        days={days}
        setDays={setDays}
      />
    </div>
  );
}
