"use client";
import { useState, useEffect } from "react";
import TravelogWideCard from "@/components/card/TravelogWideCard";
import Button from "@/components/common/Button";
import { Text } from "@/components/common/Text";
import HeaderBanner from "@/components/fanpool-log/HeaderBanner";
import RecentFanpoolLog from "@/components/fanpool-log/RecentFanpoolLog";
import { useRouter } from "next/navigation";
import TagFilter from "@/components/fanpool-log/Create-log/TagFilter"; // TagFilter 컴포넌트 불러오기
import { getFanpoologList } from "@/api/fanpool-log/main";

export interface regionsType {
  code: string;
  name: string;
  area: string;
}

// 지역 데이터
export const regions: regionsType[] = [
  { code: "doosan", name: "두산 베어스", area: "잠실" },
  { code: "hanwha", name: "한화 이글스", area: "대전" },
  { code: "hanwha2", name: "한화 이글스", area: "청주" },
  { code: "kiwoom", name: "키움 히어로즈", area: "고척" },
  { code: "kia", name: "기아 타이거즈", area: "광주" },
  { code: "kt", name: "KT 위즈", area: "수원" },
  { code: "lotte", name: "롯데 자이언츠", area: "부산" },
  { code: "lotte2", name: "롯데 자이언츠", area: "울산" },
  { code: "nc", name: "NC 다이노스", area: "창원" },
  { code: "ssg", name: "SSG 랜더스", area: "인천" },
  { code: "samsung", name: "삼성 라이온즈", area: "대구" },
  { code: "samsung2", name: "삼성 라이온즈", area: "포항" },
];

interface FanpoolLogList {
  id: string;
  image: string;
  title: string;
  stadium: string;
  profile: {
    nickname: string;
    image: string;
  };
  locations: string[];
}

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
    const token = localStorage.getItem("userId");
    if (!token) {
      console.log("token is null");
    }
    getFanpoologList(token!).then((res) => {
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
      {/* 상단 배너 */}
      <HeaderBanner
        imageUrl="/images/fanpool-log_ex.png"
        title="비오는날 경기 대신 서울나들이 ..."
        description="최대 두줄까지만이라고 하려고 했는데 여기 들어가는 문구가 뭔지 정해지지 않은 것 같아"
        nickname="네임드호빵"
        userImgUrl="/images/kt.png"
      />
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
            tags={regions.map((region) => region.area)}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>

        {/* 경기장 별 팬풀로그 리스트 */}
        <div className="flex flex-col justify-between items-start gap-16pxr">
          {filteredData.map((travelog) => (
            <TravelogWideCard
              key={travelog.id}
              id={travelog.id}
              image={travelog.image}
              userName={travelog.profile.nickname}
              title={travelog.title}
              locations={travelog.locations}
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
