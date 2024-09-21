"use client";

import { getTourInfoDetail } from "@/api/fanpool-log/place/main";
import InfinityLine from "@/components/common/InfinityLine";
import TagLocation from "@/components/common/tag/TagLocation";
import TapBar from "@/components/common/TapBar";
import { Text } from "@/components/common/Text";
import Accommodation from "@/components/fanpool-log/Place/Accommodation";
import CultureSpot from "@/components/fanpool-log/Place/CultureSpot";
import Restaurant from "@/components/fanpool-log/Place/Restaurant";
import Shopping from "@/components/fanpool-log/Place/Shopping";
import RecentFanpoolLog from "@/components/fanpool-log/RecentFanpoolLog";
import { PlaceContent } from "@/types/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { id } = params;

  const contentType = searchParams.get("contentType");
  const name = searchParams.get("name");
  const address = searchParams.get("address");
  const thumbnail = searchParams.get("thumbnail");

  const [placeContent, setPlaceContent] = useState<PlaceContent>();

  useEffect(() => {
    if (!id || !contentType) {
      router.replace("/fanpool-log");
    } else {
      // API 호출
      getTourInfoDetail(id.toString(), contentType).then((res) => {
        setPlaceContent(res);
      });
    }
  }, []);

  const renderComponent = () => {
    if (!placeContent) return null;

    switch (contentType) {
      case "12":
      case "14":
        return (
          <CultureSpot
            placeContent={placeContent}
            name={name!}
            address={address!}
          />
        );
      case "32":
        return (
          <Accommodation
            placeContent={placeContent}
            name={name!}
            address={address!}
          />
        );
      case "38":
        return (
          <Shopping
            placeContent={placeContent}
            name={name!}
            address={address!}
          />
        );
      case "39":
        return (
          <Restaurant
            placeContent={placeContent}
            name={name!}
            address={address!}
          />
        );
      default:
        return <div>지원되지 않는 장소 유형입니다.</div>;
    }
  };
  return (
    <div>
      <div className="top-0 left-0 right-0 z-100 bg-white">
        <TapBar text={name || ""} type="mid" isNextButton={false} />
      </div>
      <img
        className="w-full h-full object-fill"
        src={thumbnail || ""}
        alt="thumbnail"
      />
      <section className="w-full">
        {/* 오버레이 */}
        <div
          className={
            "absolute inset-0 w-full transition-opacity duration-300 opacity-50"
          }
        />

        {/* 바텀 시트 */}
        <div
          className={
            "absolute inset-x-0 bottom-0 w-full bg-white rounded-t-20pxr pt-24pxr px-20pxr transition-transform transform duration-300 translate-y-0"
          }
          style={{
            zIndex: 1000,
            maxHeight: "calc(100vh - 300px)",
            overflowY: "auto",
          }}
        >
          {placeContent && renderComponent()}
          <InfinityLine
            color="bg-gray-50"
            thickness="h-3pxr"
            marginTop="mt-20pxr"
            marginBottom="mb-32pxr"
          />
          {/* 방문 여행 일정 (추후 변경 필요) */}
          <RecentFanpoolLog hasButton={false} />
        </div>
      </section>
    </div>
  );
}
