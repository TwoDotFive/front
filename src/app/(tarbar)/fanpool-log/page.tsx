"use client";

import { useState, useEffect } from "react";
import TravelogWideCard from "@/components/card/TravelogWideCard";
import Button from "@/components/common/Button";
import { Text } from "@/components/common/Text";
import HeaderBanner from "@/components/fanpool-log/HeaderBanner";
import RecentFanpoolLog from "@/components/fanpool-log/RecentFanpoolLog";
import { useRouter } from "next/navigation";
import TagFilter from "@/components/fanpool-log/Create-log/TagFilter";
import { getFanpoologList } from "@/api/fanpool-log/main";
import { FanpoolLogList } from "@/types/types";
import useFanpoologStore from "@/store/fanpool-log/store";

// 지역 데이터
const regions = [
  "잠실",
  "수원",
  "문학",
  "창원",
  "광주",
  "사직",
  "대구",
  "대전",
  "고척",
];

export default function Page() {
  const router = useRouter();

  const [travelogData, setTravelogData] = useState<FanpoolLogList[]>([]); // 전체 팬풀로그 데이터
  const [filteredData, setFilteredData] = useState<FanpoolLogList[]>([]); // 필터링된 데이터
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 지역
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    getFanpoologList().then((res) => {
      if (res) {
        const items = res.items;
        setTravelogData(items);
        setFilteredData(items);
      }
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
          localStorage.setItem("x", latitude.toString());
          localStorage.setItem("y", longitude.toString());
        },
        (error) => {
          console.error(error);
        }
      );
      // 팬풀로그 관련 전역상태 초기화
      useFanpoologStore.setState({
        title: "",
        image: "",
        schedules: [],
        stadiumId: null,
        stadiumPosition: null,
        fanpoolLogId: null,
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  });

  // 태그에 따라 필터링
  const handleTagSelect = (area: string) => {
    if (selectedTags.includes(area)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== area));
      setFilteredData(travelogData); // 선택 해제 시 전체 데이터 표시
    } else {
      setSelectedTags([area]); // 선택된 태그 저장
      const filtered = travelogData.filter((item) => item.stadium === area);
      setFilteredData(filtered); // 선택된 지역의 팬풀로그만 필터링
    }
  };

  const handleFanpoologButton = () => {
    router.push("/fanpool-log/create-log/step1");
  };

  return (
    <div className="w-full flex flex-col">
      {/* 상단 배너 변경 예정*/}
      <HeaderBanner imageUrl="/images/fanpool_log_guide.png" />
      <div className="p-20pxr">
        {/* 최근 팬풀로그 */}
        <RecentFanpoolLog />
        <div className="m-60pxr"></div>
        {/* 경기장 별 로그 */}
        <Text fontSize={18} fontWeight={700} color="black">
          경기장 별 로그
        </Text>

        {/* 지역 별 필터 */}
        <div className="w-full overflow-x-scroll no-scrollbar whitespace-nowrap mb-16pxr">
          <TagFilter
            tags={regions.map((region) => region)}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>

        {/* 경기장 별 팬풀로그 리스트 */}
        {filteredData.length === 0 && (
          <div className="rounded-8pxr flex items-center justify-center">
            <img src="/images/no_result.png" className="w-93pxr h-84pxr" />
          </div>
        )}
        <div className="flex flex-col justify-between items-start gap-16pxr">
          {filteredData.map((travelog) => (
            <TravelogWideCard
              key={travelog.id}
              id={travelog.id}
              image={
                travelog.image ||
                `/images/fanpool_log_image_default_wide_${
                  (Number(travelog.id) % 5) + 1
                }.png`
              }
              userName={travelog.profile.nickname}
              title={travelog.title}
              locations={travelog.places}
            />
          ))}
        </div>
        <div className="fixed bottom-88pxr left-1/2 transform -translate-x-1/2">
          <Button
            width="135px"
            height="46px"
            text={"+ 팬풀로그 작성"}
            borderRadius={30}
            enabledTextColor={"text-white"}
            enabledBackgroundColor={"bg-primary"}
            disabledTextColor={"text-[#5679A3]"}
            disabledBackgroundColor={"bg-primary"}
            onClick={handleFanpoologButton}
          />
        </div>
      </div>
    </div>
  );
}
