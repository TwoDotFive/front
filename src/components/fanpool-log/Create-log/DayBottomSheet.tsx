import React from "react";
import { Text } from "@/components/common/Text";
import Button from "@/components/common/Button";
import { IconClose } from "@/public/icons";

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
  // Day 추가 핸들러
  const handleAddDay = () => {
    setDays((prevDays) => {
      const newDay = `Day ${prevDays.length + 1}`;
      return [...prevDays, newDay];
    });
  };

  // Day 삭제 핸들러
  const handleRemoveDay = (dayIndex: number) => {
    if (dayIndex === 0) return; // Day1은 삭제 불가
    setDays((prevDays) => prevDays.filter((_, index) => index !== dayIndex));
  };

  const bottomSheetClasses = isVisible ? "translate-y-0" : "translate-y-full";
  const overlayClasses = isVisible
    ? "opacity-50 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  return (
    <>
      <div
        className={`fixed inset-0 z-[998] bg-black transition-opacity duration-300 ease-in-out ${overlayClasses}`}
        onClick={onClose}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed bottom-0 left-0 z-[999] w-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${bottomSheetClasses} py-20pxr rounded-t-12pxr`}
      >
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
      </div>
    </>
  );
};

export default DayBottomSheet;
