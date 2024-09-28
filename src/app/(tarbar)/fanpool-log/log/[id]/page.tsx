"use client";

import {
  addBookmark,
  deleteBookmark,
  deleteFanpoolLog,
  getBookmark,
  getFanpoolLog,
} from "@/api/fanpool-log/log/main";
import TravelogAddCard from "@/components/card/TravelogAddCard";
import TravelogLocationCard from "@/components/card/TravelogLocationCard";
import Button from "@/components/common/Button";
import InfinityLine from "@/components/common/InfinityLine";
import TapBar from "@/components/common/TapBar";
import { Text } from "@/components/common/Text";
import FanpoologUser from "@/components/fanpool-log/FanpoologDetail/FanpoologUser";
import useKakaoLoader from "@/components/fanpool-log/FanpoologDetail/useKakaoLoader";
import { stadiumMap } from "@/constants/stadium";
import {
  IconBookMark,
  IconBookMarkSelected,
  IconDefaultPin,
  IconLink,
  IconShare,
} from "@/public/icons";
import useFanpoologStore, { Schedule } from "@/store/fanpool-log/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface DetailPageProps {
  id: string;
  title: string;
  image: string | null;
  stadium: string;
  user: {
    nickname: string;
    image: string;
  };
  schedules: Schedule[];
}

export default function FanpoolLogDetailPage() {
  useKakaoLoader();
  const stadiumPosition = useFanpoologStore((state) => state.stadiumPosition);

  const [fanpoolLog, setFanpoolLog] = useState<DetailPageProps | null>(null);
  const [fanpoolLogUserId, setFanpoolLogUserId] = useState();
  const userId = localStorage.getItem("userId");

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isSelected, setIsSelected] = useState<boolean>(false);

  // 전역 상태 설정
  const setFanpoolLogId = useFanpoologStore((state) => state.setFanpoolLogId);
  const setTitle = useFanpoologStore((state) => state.setTitle);
  const setImage = useFanpoologStore((state) => state.setImage);
  const setStaidumId = useFanpoologStore((state) => state.setStadiumId);
  const setStadiumPosition = useFanpoologStore(
    (state) => state.setStadiumPosition
  );

  const handleBookMarkButton = () => {
    if (isSelected) {
      deleteBookmark(id.toString()).then((res) => {
        if (res.status === 200) {
          setIsSelected(!isSelected);
        }
      });
    } else {
      addBookmark(id.toString()).then((res) => {
        if (res.status === 200) {
          setIsSelected(!isSelected);
        }
      });
    }
  };

  const handleEditButton = () => {
    // 전역 상태 설정 후 페이지 이동
    setFanpoolLogId(id.toString());
    setTitle(fanpoolLog!.title);
    if (fanpoolLog!.image) setImage(fanpoolLog!.image);
    setStaidumId(stadiumMap.get(fanpoolLog!.stadium)!);
    setStadiumPosition({
      // schedule.place.contentType이 28인 것으로 설정
      x: fanpoolLog!.schedules.filter(
        (schedule) => schedule.place.contentType === "28"
      )[0].place.y,
      y: fanpoolLog!.schedules.filter(
        (schedule) => schedule.place.contentType === "28"
      )[0].place.x,
    });
    useFanpoologStore.setState({ schedules: fanpoolLog!.schedules });
    router.push(`/fanpool-log/create-log/step3`);
  };

  const handleDeleteButton = () => {
    deleteFanpoolLog(id.toString()).then((res) => {
      if (res.status === 200) {
        router.push("/fanpool-log");
      }
    });
  };

  useEffect(() => {
    getFanpoolLog(id.toString()).then((res) => {
      setFanpoolLog(res.data);
      setFanpoolLogUserId(res.data.user.id);
      setStadiumPosition({
        // schedule.place.contentType이 28인 것으로 설정
        x: res.data.schedules.filter(
          (schedule: any) => schedule.place.contentType === "28"
        )[0].place.y,
        y: res.data.schedules.filter(
          (schedule: any) => schedule.place.contentType === "28"
        )[0].place.x,
      });
    });
    getBookmark(id.toString()).then((res) => {
      if (res.status === 200) {
        setIsSelected(true);
      }
    });
  }, []);

  if (!fanpoolLog) return <div>Loading...</div>;

  return (
    <div className="w-full">
      {userId === fanpoolLogUserId ? (
        <TapBar
          text=""
          type="edit"
          isNextButton={true}
          onEdit={handleEditButton}
          onDelete={handleDeleteButton}
        />
      ) : (
        <TapBar text="" type="left" />
      )}
      {/* 팬풀 로그 타이틀 및 장소 */}
      <div className="w-full flex flex-col items-center gap-4pxr px-20pxr">
        {fanpoolLog.image && (
          <div className="w-85pxr h-85pxr">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={fanpoolLog.image}
              alt={"Representative Image"}
            />
          </div>
        )}

        <Text fontSize={20} fontWeight={700} color="gray700">
          {fanpoolLog.title}
        </Text>
        <Text fontSize={16} fontWeight={400} color="gray600">
          {fanpoolLog.stadium}
        </Text>
      </div>
      <div className="mt-18pxr" />
      {/* Kakao Map */}
      <Map
        id="map"
        center={{
          // 지도의 중심좌표
          lat: stadiumPosition!.x,
          lng: stadiumPosition!.y,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "170px",
        }}
        level={7}
      >
        {fanpoolLog.schedules.map((schedule, index) => (
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
      {/* 팬풀 등록자 */}
      <FanpoologUser
        name={fanpoolLog.user.nickname}
        image={
          fanpoolLog.user.image === ""
            ? "/images/default_profile.png"
            : fanpoolLog.user.image
        }
      />

      <InfinityLine
        color="bg-gray-50"
        thickness="h-3pxr"
        marginTop="mt-20pxr"
        marginBottom="mb-32pxr"
      />

      {/* 각 장소 카드*/}
      <div className="relative flex flex-col items-start px-20pxr">
        {Array.from(
          new Set(fanpoolLog.schedules.map((schedule) => schedule.day))
        ).map((day, dayIndex) => (
          <div key={dayIndex} className="w-full">
            <Text
              fontSize={18}
              fontWeight={700}
              color="gray800"
            >{`Day ${day}`}</Text>
            <div className="mt-18pxr" />

            {fanpoolLog.schedules
              .filter((schedule) => schedule.day === day)
              .map((schedule, index) => (
                <div
                  key={schedule.place.contentId}
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
                  <div className="ml-16pxr w-full">
                    {schedule.memo && schedule.memo.content ? (
                      <TravelogAddCard
                        image={schedule.place.thumbnail}
                        name={schedule.place.name}
                        location={schedule.place.address}
                        description={schedule.memo.content}
                        userId={"myUserId"}
                        locationImage={schedule.memo.images?.map(
                          (img) => img.url
                        )}
                        onClick={() => {}}
                        isEditing={true}
                      />
                    ) : (
                      <TravelogLocationCard
                        image={schedule.place.thumbnail}
                        name={schedule.place.name}
                        location={schedule.place.address}
                        isEditing={true}
                        onClick={() => {}}
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="mb-50pxr" />
      {/* 바텀 시트 */}
      <div
        className={
          "absolute inset-x-0 bottom-0 w-full bg-white rounded-t-20pxr p-20pxr pt-16pxr shadow-[0px_0px_34px_0px_rgba(0,37,97,0.10)]"
        }
        style={{
          zIndex: 1000,
          maxHeight: "calc(100vh - 300px)",
          overflowY: "auto",
        }}
      >
        <div className="flex justify-center items-center gap-8pxr">
          <Button
            width="170px"
            height="50px"
            text={"채팅방 공유"}
            borderRadius={8}
            enabledTextColor={"text-white"}
            enabledBackgroundColor={"bg-primary"}
            disabledTextColor={"text-[#5679A3]"}
            disabledBackgroundColor={"bg-primary"}
            onClick={() => {}}
          />
          <button className="flex items-center jusitify-center p-8pxr">
            <IconShare />
          </button>
          <button className="flex items-center jusitify-center p-8pxr">
            <IconLink />
          </button>
          <button
            className="flex items-center jusitify-center p-8pxr"
            onClick={handleBookMarkButton}
          >
            {isSelected ? <IconBookMarkSelected /> : <IconBookMark />}
          </button>
        </div>
      </div>
    </div>
  );
}
