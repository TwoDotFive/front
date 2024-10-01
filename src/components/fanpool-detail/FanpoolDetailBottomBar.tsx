import { IconLink, IconShare } from "@/public/icons";
import Button from "../common/Button";
import Bookmark from "../common/Bookmark";
import { FanpoolInformation } from "@/types/types";
import { useState } from "react";
import ToastMessage from "../common/ToastMessage";

interface FanpoolDetailBottomBarProps {
  fanpoolInformation: FanpoolInformation;
}

export default function FanpoolDetailBottomBar({
  fanpoolInformation,
}: FanpoolDetailBottomBarProps) {
  const isHost =
    fanpoolInformation.hostUserId.toString() == localStorage.getItem("userId");

  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const handleKakaoShareButton = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: fanpoolInformation?.title,
        description: fanpoolInformation?.memo,
        imageUrl: `/images/fanpool_log_image_default_${
          (Number(fanpoolInformation?.id) % 5) + 1
        }.png`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "팬풀로 이동하기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const handleShareButton = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsToastOpen(true);
    });
  };

  return (
    <section
      className="max-w-399pxr fixed bottom-0 w-full h-86pxr bg-white px-20pxr pt-16pxr pb-20pxr rounded-16pxr flex justify-center gap-8pxr"
      style={{ boxShadow: "0px 0px 34px 0px rgba(0, 37, 97, 0.10)" }}
    >
      <Button
        height="50px"
        text={isHost ? "모집 완료하기" : "채팅하기"}
        borderRadius={8}
        enabledTextColor={"text-white"}
        enabledBackgroundColor={"bg-primary"}
        disabledTextColor={"text-gray300"}
        disabledBackgroundColor={"bg-gray100"}
        onClick={() => {}}
      />
      <button
        className="flex items-center jusitify-center p-8pxr"
        onClick={handleKakaoShareButton}
      >
        <IconShare />
      </button>
      <button
        className="flex items-center jusitify-center p-8pxr"
        onClick={handleShareButton}
      >
        <IconLink />
      </button>
      <ToastMessage
        message="링크가 복사되었어요!"
        show={isToastOpen}
        onClose={() => {
          setIsToastOpen(false);
        }}
      />
    </section>
  );
}
