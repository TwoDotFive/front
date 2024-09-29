import React from "react";
import { Text } from "@/components/common/Text";
import Button from "@/components/common/Button";
import { IconClose } from "@/public/icons";
import BottomSheet from "@/components/common/BottomSheet";
import useFanpoologStore from "@/store/fanpool-log/store";

interface DayBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  days: string[];
  setDays: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DayBottomSheet: React.FC<DayBottomSheetProps> = ({
  isVisible,
  onClose,
  days,
  setDays,
}) => {
  const schedules = useFanpoologStore((state) => state.schedules);
  // Day 추가 핸들러
  const handleAddDay = () => {
    setDays((prevDays) => {
      const newDay = `Day ${prevDays.length + 1}`;
      return [...prevDays, newDay];
    });
    // Day 추가 시 schedules의 마지막 요소의 Day를 prev.length + 1로 변경
    useFanpoologStore.setState((state) => ({
      schedules: state.schedules.map(
        (schedule, index) =>
          index === state.schedules.length - 1
            ? { ...schedule, day: days.length + 1, sequence: 1 } // 마지막 요소의 day만 업데이트
            : schedule // 나머지는 그대로 유지
      ),
    }));
  };

  // Day 삭제 핸들러
  const handleRemoveDay = (dayIndex: number) => {
    if (dayIndex === 0) return; // Day1은 삭제 불가
    setDays((prevDays) => prevDays.filter((_, index) => index !== dayIndex));
  };

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <div className="flex justify-between px-20pxr pb-16pxr">
        <Text fontSize={18} fontWeight={700} color="gray800">
          DAY 편집
        </Text>
        <button onClick={onClose}>
          <IconClose />
        </button>
      </div>

      <div className="px-20pxr">
        {/* Day 리스트 */}
        {days.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-12pxr mb-8pxr rounded-lg shadow-[0px_0px_34px_0px_rgba(0,37,97,0.10)]"
          >
            <Text fontSize={16} fontWeight={500} color="gray800">
              {day}
            </Text>
            {index !== 0 && (
              <button onClick={() => handleRemoveDay(index)}>
                <IconClose />
              </button>
            )}
          </div>
        ))}
        {/* Day 추가 */}
        <div
          className="flex items-center justify-between p-12pxr mb-8pxr rounded-lg bg-gray-50 shadow-[0px_0px_34px_0px_rgba(0,37,97,0.10)]"
          onClick={handleAddDay}
        >
          <Text fontSize={16} fontWeight={500} color="gray600">
            Day 추가
          </Text>
        </div>

        <Button
          height="50px"
          text={"완료"}
          borderRadius={8}
          enabledTextColor={"text-white"}
          enabledBackgroundColor={"bg-primary"}
          disabledTextColor={"text-[#5679A3]"}
          disabledBackgroundColor={"bg-primary"}
          onClick={onClose}
        />
      </div>
    </BottomSheet>
  );
};

export default DayBottomSheet;
