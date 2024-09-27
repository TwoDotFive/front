"use client";
import {
  IconLeftArrow,
  IconPencil,
  IconRightArrow,
  IconTrashCan,
  IconUpload,
} from "@/public/icons";
import { useRouter } from "next/navigation";
import { Text } from "./Text";
import useFanpoologStore from "@/store/fanpool-log/store";

type TapBarProps = {
  text: string;
  isNextButton?: boolean;
  type: "download" | "left" | "mid" | "edit" | "none";
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function TapBar({
  text,
  isNextButton = false,
  type,
  onEdit,
  onDelete,
}: TapBarProps) {
  const router = useRouter();
  const fanpoolLogId = useFanpoologStore((state) => state.fanpoolLogId);

  const handleBack = () => {
    if (fanpoolLogId) {
      // 편집모드인 경우, 스케줄 전역상태 초기화 후 페이지 이동
      useFanpoologStore.setState({
        schedules: [],
      });
    }
    router.back();
  };

  const handleNext = () => {
    router.forward();
  };

  const renderLeftSection = () => {
    if (type === "mid") {
      return (
        <>
          <IconLeftArrow className="cursor-pointer" onClick={handleBack} />
          <Text fontSize={18} fontWeight={500} color="gray700">
            {text}
          </Text>
        </>
      );
    }

    return (
      <div className="flex items-center">
        <IconLeftArrow className="cursor-pointer" onClick={handleBack} />
        <Text
          fontSize={type === "download" ? 16 : 18}
          fontWeight={type === "download" ? 700 : 500}
          color="gray700"
          className="ml-4pxr"
        >
          {text}
        </Text>
      </div>
    );
  };

  const renderRightSection: any = () => {
    if (type === "mid") {
      if (isNextButton)
        return (
          <IconRightArrow className="cursor-pointer" onClick={handleNext} />
        );
      else return <div className="w-25pxr" />;
    }
    if (type === "download") {
      return <IconUpload className="cursor-pointer" />;
    }
    if (type === "edit") {
      // 편집 버튼 생성 (누르면 팬풀로그 편집으로 이동)
      return (
        <div className="flex items-center gap-24pxr">
          <button onClick={onEdit}>
            <IconPencil />
          </button>
          <button onClick={onDelete}>
            <IconTrashCan />
          </button>
        </div>
      );
    }
    return null;
  };

  if (type === "none") {
    return (
      <Text fontSize={18} fontWeight={700} color="gray700" className="ml-12pxr">
        {text}
      </Text>
    );
  }

  return (
    <div
      className={`w-full h-49pxr flex items-center px-12pxr ${
        type !== "left" ? "justify-between" : ""
      }`}
    >
      {renderLeftSection()}
      {renderRightSection()}
    </div>
  );
}
