"use client";

import React, { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import TapBar from "@/components/common/TapBar";
import InfinityLine from "@/components/common/InfinityLine";
import { Text } from "@/components/common/Text";
import { IconClose, IconDefaultPin, IconUpload } from "@/public/icons";
import TravelogLocationCard from "@/components/card/TravelogLocationCard";
import Button from "@/components/common/Button";
import { MemoBottomSheet } from "@/components/fanpool-log/Create-log/MemoBottomSheet";
import DayBottomSheet from "@/components/fanpool-log/Create-log/DayBottomSheet";
import useKakaoLoader from "@/components/fanpool-log/FanpoologDetail/useKakaoLoader";
import TravelogAddCard from "@/components/card/TravelogAddCard";
import useFanpoologStore, { Memo } from "@/store/fanpool-log/store";
import { useRouter } from "next/navigation";
import {
  editFanpoolLog,
  getPresignedUrl,
  postFanoolLog,
  uploadImageToS3,
} from "@/api/fanpool-log/create-log/step3";
import { reverseStadiumMap } from "@/constants/stadium";
import { useModalStore } from "@/store/modalStore";
import ToastMessage from "@/components/common/ToastMessage";

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

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [rImage, setRImage] = useState<File | string | null>(
    useFanpoologStore((state) => state.image)
  ); // 대표 이미지 상태
  const [title, setTitle] = useState<string>(
    useFanpoologStore((state) => state.title)
  ); // 로그 제목 상태

  const [isMemoBottomSheetVisible, setIsMemoBottomSheetVisible] =
    useState<boolean>(false); // 메모 편집 바텀 시트 상태
  const [isDayBottomSheetVisible, setIsDayBottomSheetVisible] =
    useState<boolean>(false); // Day 편집 바텀 시트 상태

  const [isMemoEditMode, setIsMemoEditMode] = useState<boolean>(false);
  const [isChangeMode, setIsChangeMode] = useState<boolean>(false);
  const [days, setDays] = useState(["Day 1"]);
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<
    number | null
  >(null); // 선택된 장소의 인덱스 (메모 추가할 때 사용)
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const stadiumId = useFanpoologStore((state) => state.stadiumId);
  const stadiumPosition = useFanpoologStore((state) => state.stadiumPosition);
  const schedules = useFanpoologStore((state) => state.schedules);
  const updateSchedule = useFanpoologStore((state) => state.updateSchedule);
  const removeSchedule = useFanpoologStore((state) => state.removeSchedule);
  const fanpoolLogId = useFanpoologStore((state) => state.fanpoolLogId);
  const { openModal } = useModalStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setRImage(file);
    }
  };

  const handleImageRemove = () => {
    setRImage(null);
  };

  const handleRemoveLocation = (index: number) => {
    if (selectedScheduleIndex === index) setSelectedScheduleIndex(null);
    removeSchedule(index);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeIndex = schedules.findIndex(
      (item) => item.place.contentId === active.id
    );
    const overIndex = schedules.findIndex(
      (item) => item.place.contentId === over.id
    );

    // 새로운 Day로 이동하는 경우 처리
    const activeSchedule = schedules[activeIndex];
    const overSchedule = schedules[overIndex];

    if (activeSchedule.day !== overSchedule.day) {
      const updatedSchedules = schedules.map((schedule) => {
        if (schedule.place.contentId === activeSchedule.place.contentId) {
          return { ...schedule, day: overSchedule.day };
        }
        return schedule;
      });
      useFanpoologStore.setState({ schedules: updatedSchedules });
    } else {
      const updatedSchedules = arrayMove(schedules, activeIndex, overIndex);
      useFanpoologStore.setState({ schedules: updatedSchedules });
    }
  };

  const handleMemoOpen = (index: number) => {
    setSelectedScheduleIndex(index);
    setIsMemoBottomSheetVisible(true);
    setIsMemoEditMode(true);
  };

  const handleMemoSave = (memo: Memo) => {
    if (selectedScheduleIndex !== null) {
      const updatedSchedule = {
        ...schedules[selectedScheduleIndex],
        memo,
      };
      updateSchedule(selectedScheduleIndex, updatedSchedule);
      setIsMemoBottomSheetVisible(false);
    }
  };

  const handleMemoDelete = () => {
    if (selectedScheduleIndex !== null) {
      const updatedSchedule = {
        ...schedules[selectedScheduleIndex],
        memo: { content: "", images: [] },
      };
      updateSchedule(selectedScheduleIndex, updatedSchedule);
      setIsMemoBottomSheetVisible(false);
    }
  };

  const handlePageBack = () => {
    router.push("/fanpool-log/create-log/step2");
  };

  const openTitleErrorModal = () => {
    openModal("error", {
      confirmText: "로그 제목을 입력해주세요",
    });
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      openTitleErrorModal();
    } else {
      // post 하기 전, 메모가 없는 것에는 memo:{content: "", images:[]} 를 추가
      const updatedSchedules = schedules.map((schedule) => {
        if (!schedule.memo) {
          return {
            ...schedule,
            memo: { content: "", images: [] },
          };
        }
        return schedule;
      });
      // API 호출
      try {
        let imageUrl = null;
        if (rImage && rImage instanceof File) {
          const presignedUrl = await getPresignedUrl();

          await uploadImageToS3(presignedUrl.toString(), rImage);

          imageUrl = presignedUrl.toString().split("?")[0];
        } else if (typeof rImage === "string") {
          imageUrl = rImage;
        }
        if (fanpoolLogId) {
          // 수정
          const res = await editFanpoolLog(
            fanpoolLogId,
            title,
            imageUrl,
            updatedSchedules
          );
          if (res.status === 200) {
            setIsToastOpen(true);
            setTimeout(() => {
              router.replace(`/fanpool-log/log/${fanpoolLogId}`);
            }, 2000);
          }
        } else {
          // 초기 생성
          const res = await postFanoolLog(
            title,
            imageUrl,
            stadiumId!,
            updatedSchedules
          );
          if (res.status === 200) {
            // 토스트 메시지가 사라지면 페이지 이동
            setIsToastOpen(true);
            setTimeout(() => {
              router.replace(`/fanpool-log/log/${res.data.id}`);
            }, 2000);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (!stadiumPosition || !stadiumId || !schedules) {
      router.replace("/fanpool-log/create-log/step1");
    } else {
      setIsLoading(false);
    }
    if (fanpoolLogId) {
      setTitle(useFanpoologStore.getState().title);
      setRImage(useFanpoologStore.getState().image);
    }
  }, []);

  useEffect(() => {
    console.log(schedules);
  }, [schedules]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="absolute flex flex-col w-full h-screen">
      {/* 탭바 */}
      <div className="top-0 left-0 right-0 z-100 bg-white">
        <TapBar text="팬풀로그 만들기" type="mid" isNextButton={false} />
      </div>
      <div className="overflow-y-auto">
        <div className="mt-24pxr" />
        <div className="flex flex-col items-start gap-24pxr px-20pxr w-full">
          <div className="flex flex-col items-start gap-8pxr w-full">
            <Text fontSize={14} fontWeight={500} color="gray600">
              대표 사진(선택)
            </Text>
            {rImage ? (
              <div className="relative w-60pxr h-60pxr">
                <button
                  onClick={handleImageRemove}
                  className="absolute top-0 right-0 bg-white rounded-full p-1"
                >
                  <IconClose />
                </button>
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={
                    rImage instanceof File
                      ? URL.createObjectURL(rImage)
                      : rImage
                  }
                  alt={"Representative Image"}
                />
              </div>
            ) : (
              <label className="w-70pxr h-70pxr rounded-4pxr border-1 bg-gray050 border-gray050 flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <IconUpload />
              </label>
            )}
          </div>
          <div className="flex flex-col items-start gap-8pxr w-full">
            <div className="flex items-center w-full">
              <Text fontSize={14} fontWeight={500} color="gray600">
                로그 제목
              </Text>
              <Text fontSize={14} fontWeight={500} color="fireRed400">
                *
              </Text>
            </div>
            <input
              type="text"
              placeholder="로그 제목을 입력해주세요"
              className="w-full h-24pxr focus:outline-none color-gray200 weight-700 text-20pxr"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                useFanpoologStore.setState({ title: e.target.value });
              }}
            ></input>
          </div>
          <div className="flex flex-col items-start gap-8pxr w-full">
            <Text fontSize={14} fontWeight={500} color="gray600">
              경기장
            </Text>
            <Text fontSize={16} fontWeight={700} color="gray700">
              {reverseStadiumMap.get(stadiumId!.toString())}
            </Text>
          </div>
        </div>
        <div className="mt-24pxr" />
        {/* 카카오맵 */}
        <Map
          id="map"
          center={{
            lat: stadiumPosition!.y || 37.5123,
            lng: stadiumPosition!.x || 127.0719,
          }}
          style={{
            width: "100%",
            height: "170px",
          }}
          level={7}
        >
          {/* 경기장 마커 */}
          {schedules.map((schedule, index) => (
            <MapMarker
              key={index}
              position={{
                lat: schedule.place.y,
                lng: schedule.place.x,
              }}
              image={{
                src: "/icons/map/icon_default_pin.svg",
                size: { width: 28, height: 40 },
              }}
            />
          ))}
        </Map>
        <div className="mt-45pxr" />
        <InfinityLine
          color="bg-gray-50"
          thickness="h-3pxr"
          marginTop="mt-20pxr"
          marginBottom="mb-32pxr"
        />
        {/* 장소 리스트 */}
        <div className="relative flex flex-col items-start px-20pxr">
          <DndContext
            modifiers={[restrictToWindowEdges]}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={schedules.map((schedule) => schedule.place.contentId)} // 전체를 하나의 컨텍스트로 처리
              strategy={verticalListSortingStrategy}
            >
              {days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="flex flex-col items-start justify-center w-full"
                >
                  <Text fontSize={18} fontWeight={700} color="gray800">
                    {`Day ${dayIndex + 1}`}
                  </Text>
                  <div className="mt-18pxr" />
                  {schedules
                    .filter((schedule) => schedule.day === dayIndex + 1)
                    .map((schedule, index) => (
                      <SortableItem
                        key={schedule.place.contentId}
                        id={schedule.place.contentId}
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
                          <div className="ml-16pxr w-full">
                            {schedule.memo &&
                            (schedule.memo.content ||
                              (schedule.memo.images &&
                                schedule.memo.images?.length > 0)) ? (
                              <TravelogAddCard
                                image={schedule.place.thumbnail}
                                name={schedule.place.name}
                                location={schedule.place.address}
                                description={schedule.memo.content || ""}
                                userId={"myUserId"}
                                locationImage={
                                  schedule.memo.images?.map((img) => img.url) ||
                                  []
                                }
                                onClick={() => handleMemoOpen(index)}
                                isEditing={isChangeMode}
                                onRemove={() => handleRemoveLocation(index)}
                              />
                            ) : (
                              <TravelogLocationCard
                                image={schedule.place.thumbnail}
                                name={schedule.place.name}
                                location={schedule.place.address}
                                isEditing={isChangeMode}
                                onClick={() => handleMemoOpen(index)}
                                onRemove={() => handleRemoveLocation(index)}
                              />
                            )}
                          </div>
                        </div>
                      </SortableItem>
                    ))}
                </div>
              ))}
            </SortableContext>
          </DndContext>
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
                  onClick={handlePageBack}
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
          "max-w-399pxr fixed flex items-center justify-center inset-x-0 bottom-0 w-full bg-white rounded-t-20pxr p-20pxr pt-16pxr"
        }
        style={{
          zIndex: 1,
          overflowY: "unset",
          left: "50%",
          transform: "translate(-50%)",
        }}
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
          onClick={handleSubmit}
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
          selectedScheduleIndex !== null
            ? schedules[selectedScheduleIndex].memo?.content
            : ""
        }
        initialImages={
          selectedScheduleIndex !== null
            ? schedules[selectedScheduleIndex].memo?.images?.map(
                (img) => img.url
              ) || []
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

      {/* 토스트 메시지 */}
      <ToastMessage
        message="내가 쓴 로그가 업로드 되었어요!"
        hasCheckBtn={true}
        show={isToastOpen}
        duration={2000}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
