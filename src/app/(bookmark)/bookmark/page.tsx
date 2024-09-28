"use client";

import { getFanpoolLogBookmarkList } from "@/api/bookmark/getFanpoolLogBookmarkList";
import TravelogWideCard from "@/components/card/TravelogWideCard";
import TapBar from "@/components/common/TapBar";
import { FanpoolLogList } from "@/types/types";
import { useEffect, useState } from "react";

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
  const [activeTab, setActiveTab] = useState<"fanpool" | "fanpoolLog">(
    "fanpoolLog"
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fanpoolLogList, setFanpoolLogList] =
    useState<BookmarkedFanpoolLog[]>();

  const handleTabChange = (tab: "fanpool" | "fanpoolLog") => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getFanpoolLogBookmarkList().then((res) => {
      setFanpoolLogList(res.data.bookmarks);
      setIsLoading(false);
    });
  });

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
          image={fanpoolLog.tourLog.image}
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
        <div>로딩중...</div>
      ) : (
        <>
          <div className="flex justify-around border-b mb-4">
            <button
              className={`px-48pxr py-12pxr ${
                activeTab === "fanpool"
                  ? "font-bold border-b-2 border-black"
                  : ""
              }`}
              onClick={() => handleTabChange("fanpool")}
            >
              모집한 팬풀 3
            </button>
            <button
              className={`px-48pxr py-12pxr ${
                activeTab === "fanpoolLog"
                  ? "font-bold border-b-2 border-black"
                  : ""
              }`}
              onClick={() => handleTabChange("fanpoolLog")}
            >
              팬풀로그 {fanpoolLogList!.length > 0 ? fanpoolLogList!.length : 0}
            </button>
          </div>
          {/* 탭에 맞는 리스트 */}
          <div className="flex flex-col items-start px-20pxr gap-12pxr">
            {activeTab === "fanpool" ? renderFanpool() : renderFanpoolLogList()}
          </div>
        </>
      )}
    </div>
  );
}
