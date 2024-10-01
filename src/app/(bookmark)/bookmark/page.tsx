"use client";

import { getFanpoolLogBookmarkList } from "@/api/bookmark/getFanpoolLogBookmarkList";
import TravelogWideCard from "@/components/card/TravelogWideCard";
import TapBar from "@/components/common/TapBar";
import { FanpoolLogList } from "@/types/types";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import spinner from "@/public/lottie/spinner3.json";

interface BookmarkedFanpoolLog {
  id: string;
  tourLog: {
    id: string;
    image: string;
    title: string;
    stadium: string;
    profile: {
      nickname: string;
      image: string;
    };
  };
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<"fanpoolLog">("fanpoolLog");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fanpoolLogList, setFanpoolLogList] =
    useState<BookmarkedFanpoolLog[]>();

  useEffect(() => {
    getFanpoolLogBookmarkList().then((res) => {
      setFanpoolLogList(res.data.bookmarks);
      setIsLoading(false);
    });
  }, []);

  const renderFanpool = () => {
    return <></>;
  };

  const renderFanpoolLogList = () => {
    return fanpoolLogList && fanpoolLogList.length === 0 ? (
      <div className="text-center">관심 리스트가 없습니다.</div>
    ) : (
      fanpoolLogList!.map((fanpoolLog) => (
        <TravelogWideCard
          key={fanpoolLog.id}
          id={fanpoolLog.tourLog.id}
          image={
            fanpoolLog.tourLog.image ||
            `/images/fanpool_log_image_default_wide_${
              (Number(fanpoolLog.tourLog.id) % 5) + 1
            }.png`
          }
          title={fanpoolLog.tourLog.title}
          userName={fanpoolLog.tourLog.profile.nickname}
        />
      ))
    );
  };

  return (
    <div className="w-full">
      <TapBar text="관심 리스트" type="mid" />
      <div className="mt-24pxr" />
      {isLoading ? (
        <Lottie
          animationData={spinner}
          style={{ width: "50px", height: "50px", margin: "auto" }}
          loop
        />
      ) : (
        <>
          <div className="flex justify-start border-b mb-4">
            <button
              className={`px-48pxr py-12pxr ${
                activeTab === "fanpoolLog"
                  ? "font-bold border-b-2 border-black"
                  : ""
              }`}
            >
              팬풀로그 {fanpoolLogList!.length > 0 ? fanpoolLogList!.length : 0}
            </button>
          </div>
          {/* 탭에 맞는 리스트 */}
          <div className="flex flex-col items-start px-20pxr gap-12pxr">
            {renderFanpoolLogList()}
          </div>
        </>
      )}
    </div>
  );
}
