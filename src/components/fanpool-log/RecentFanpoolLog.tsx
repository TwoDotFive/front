"use client";

import { useEffect, useState } from "react";
import TravelogCard from "../card/TravelogCard";
import Button from "../common/Button";
import { Text } from "../common/Text";
import { getFanpoologList } from "@/api/fanpool-log/main";

type RecentFanpoolLogProps = {
  hasButton?: boolean;
};

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

export default function RecentFanpoolLog({
  hasButton = true,
}: RecentFanpoolLogProps) {
  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (!token) {
      console.log("token is null");
    }
    getFanpoologList(token!).then((res) => {
      if (res) {
        const items = res.items;
        setTravelLogData(items);
      }
    });
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
            locations={travelLog.locations}
          />
        ))}
      </div>
      {hasButton && (
        <div className="mx-auto">
          <Button
            width="320px"
            height="50px"
            text={"더보기"}
            borderRadius={8}
            enabledTextColor={"text-gray700"}
            enabledBackgroundColor={"bg-gray100"}
            disabledTextColor={"text-gray300"}
            disabledBackgroundColor={"bg-primary"}
            onClick={() => {}}
          />
        </div>
      )}
    </section>
  );
}
