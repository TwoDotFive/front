"use client";
import { getStadiumList } from "@/api/fanpool-log/step1";
import Button from "@/components/common/Button";
import SelectAreaButton from "@/components/common/button/SelectAreaButton";
import TapBar from "@/components/common/TapBar";
import { Text } from "@/components/common/Text";
import useFanpoologStore from "@/store/fanpool-log/store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Stadium {
  id: number;
  shortenName: string;
  address: {
    fullText: string;
    x: number;
    y: number;
  };
}

export default function page() {
  const router = useRouter();

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedStadiumId, setSelectedStadiumId] = useState<number | null>(
    null
  );
  const setStadiumId = useFanpoologStore((state) => state.setStadiumId);
  const setStadiumPosition = useFanpoologStore(
    (state) => state.setStadiumPosition
  );
  const [stadiumList, setStadiumList] = useState<Stadium[]>([]);

  const handleTeamSelect = (id: number) => {
    setSelectedStadiumId(id);
    setIsSelected(true);
  };

  const handleNextPage = () => {
    if (selectedStadiumId) {
      setStadiumId(selectedStadiumId);
      setStadiumPosition({
        x: stadiumList.find((stadium) => stadium.id === selectedStadiumId)!
          .address.x,
        y: stadiumList.find((stadium) => stadium.id === selectedStadiumId)!
          .address.y,
      });
      router.push("/fanpool-log/create-log/step2");
    }
  };

  useEffect(() => {
    getStadiumList().then((res) => {
      setStadiumList(res.stadiums);
    });
  }, []);

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute flex flex-col items-start h-screen w-full"
    >
      {/* 탭바 */}
      <TapBar text="팬풀로그 만들기" type="mid" isNextButton={false} />
      <div className="mt-24pxr" />
      <div className="ml-20pxr">
        <Text fontSize={18} fontWeight={700} color="gray700">
          어느 경기장으로 직관 가시나요?
        </Text>
      </div>
      {/* 지역 선택 */}
      <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20pxr">
        <div className="grid grid-cols-3 gap-10pxr">
          {stadiumList.map((stadium) => (
            <SelectAreaButton
              key={stadium.id}
              area={stadium.shortenName}
              isSelected={selectedStadiumId === stadium.id}
              onClick={() => {
                handleTeamSelect(stadium.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* 바텀 시트 */}
      <div
        className={
          "max-w-399pxr fixed first-letter:fixed flex items-center justify-center inset-x-0 bottom-0 w-full bg-white rounded-t-20pxr p-20pxr pt-16pxr"
        }
        style={{
          zIndex: 1000,
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
          onClick={handleNextPage}
          disabled={!isSelected}
        />
      </div>
    </motion.div>
  );
}
