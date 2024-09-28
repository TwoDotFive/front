"use client";

import { useEffect, useState } from "react";
import TravelogCard from "../card/TravelogCard";
import { Text } from "../common/Text";
import { getFanpoologList } from "@/api/fanpool-log/main";
import { FanpoolLogList } from "@/types/types";
import { getFanpoolLogAboutPlace } from "@/api/fanpool-log/place/main";

type RecentFanpoolLogProps = {
  hasButton?: boolean;
  contentId?: string;
  contentType?: string;
};

export default function RecentFanpoolLog({
  hasButton = true,
  contentId,
  contentType,
}: RecentFanpoolLogProps) {
  useEffect(() => {
    if (hasButton) {
      getFanpoologList().then((res) => {
        if (res) {
          const items = res.items;
          setTravelLogData(items);
        }
      });
    } else {
      getFanpoolLogAboutPlace(contentId!, contentType!).then((res) => {
        setTravelLogData(res.data.items);
      });
    }
  }, []);

  const [travelLogData, setTravelLogData] = useState<FanpoolLogList[]>([]);

  return (
    <section className="w-full flex flex-col items-start">
      {hasButton ? (
        <Text fontWeight={700} fontSize={18} color="black">
          따끈따끈 갓 올라온 로그!
        </Text>
      ) : (
        <Text fontWeight={700} fontSize={18} color="black">
          이곳을 방문한 여행일정이에요
        </Text>
      )}
      <div className="w-full flex gap-12pxr overflow-x-auto whitespace-normal py-20pxr">
        {travelLogData.map((travelLog, index) => (
          <TravelogCard
            key={travelLog.id}
            id={travelLog.id}
            image={travelLog.image}
            userName={travelLog.profile.nickname}
            userImage={
              travelLog.profile.image === ""
                ? "/images/default_profile.png"
                : travelLog.profile.image
            }
            title={travelLog.title}
            locations={travelLog.places}
          />
        ))}
      </div>
    </section>
  );
}
