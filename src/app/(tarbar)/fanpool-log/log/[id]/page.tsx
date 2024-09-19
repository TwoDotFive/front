"use client";

import TravelogLocationCard from "@/components/card/TravelogLocationCard";
import Button from "@/components/common/Button";
import InfinityLine from "@/components/common/InfinityLine";
import TapBar from "@/components/common/TapBar";
import { Text } from "@/components/common/Text";
import FanpoologUser from "@/components/fanpool-log/FanpoologDetail/FanpoologUser";
import useKakaoLoader from "@/components/fanpool-log/FanpoologDetail/useKakaoLoader";
import {
  IconBookMark,
  IconBookMarkSelected,
  IconDefaultPin,
  IconLink,
  IconShare,
} from "@/public/icons";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

export default function FanpoolLogDetailPage() {
  useKakaoLoader();

  const [rImage, setRImage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const handleBookMarkButton = () => {
    setIsSelected(!isSelected);
  };

  const locations = [
    {
      id: 1,
      name: "잠실종합운동장 잠실야구장",
      location: "서울 송파구 올림픽로 25",
      image: "/images/doosan.png",
    },
    {
      id: 2,
      name: "장소 2",
      location: "서울 송파구 올림픽로 25",
      image: "/images/kt.png",
    },
    {
      id: 3,
      name: "장소 3",
      location: "서울 송파구 올림픽로 25",
      image: "/images/samsung.png",
    },
    {
      id: 4,
      name: "장소 4",
      location: "서울 송파구 올림픽로 25",
      image: "/images/ssg.png",
    },
  ];

  return (
    <div className="w-full">
      <TapBar text="" type="left" />
      {/* 팬풀 로그 타이틀 및 장소 */}
      <div className="w-full flex flex-col items-center gap-4pxr px-20pxr">
        {rImage && (
          <div className="w-85pxr h-85pxr">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={rImage}
              alt={"Representative Image"}
            />
          </div>
        )}

        <Text fontSize={20} fontWeight={700} color="gray700">
          비오는날 경기 대신 서울나들이
        </Text>
        <Text fontSize={16} fontWeight={400} color="gray600">
          잠실 야구장
        </Text>
      </div>
      <div className="mt-18pxr" />
      {/* Kakao Map */}
      <Map
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "170px",
        }}
        level={3}
      />
      {/* 팬풀 등록자 */}
      <FanpoologUser />

      <InfinityLine
        color="bg-gray-50"
        thickness="h-3pxr"
        marginTop="mt-20pxr"
        marginBottom="mb-32pxr"
      />

      {/* 각 장소 카드*/}
      <div className="relative flex flex-col items-start px-20pxr">
        <Text fontSize={18} fontWeight={700} color="gray800">
          Day 1
        </Text>
        <div className="mt-18pxr" />
        {locations.map((location, index) => (
          <div
            key={location.id}
            className="relative flex items-center mb-8 w-full"
          >
            {/* 마커 번호 */}
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
              <TravelogLocationCard
                image={location.image}
                name={location.name}
                location={location.location}
                onClick={() => {}}
                isEditing={false}
              />
            </div>
          </div>
        ))}
      </div>
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
