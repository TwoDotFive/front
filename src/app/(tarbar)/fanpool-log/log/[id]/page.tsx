"use client";

import {
  addBookmark,
  deleteBookmark,
  deleteFanpoolLog,
  getBookmark,
  getFanpoolLog,
} from "@/api/fanpool-log/log/main";
import TravelogAddCard from "@/components/card/TravelogAddCard";
import TravelogLocationCard from "@/components/card/TravelogLocationCard";
import Button from "@/components/common/Button";
import InfinityLine from "@/components/common/InfinityLine";
import TapBar from "@/components/common/TapBar";
import { Text } from "@/components/common/Text";
import ToastMessage from "@/components/common/ToastMessage";
import FanpoologUser from "@/components/fanpool-log/FanpoologDetail/FanpoologUser";
import useKakaoLoader from "@/components/fanpool-log/FanpoologDetail/useKakaoLoader";
import { stadiumMap } from "@/constants/stadium";
import {
  IconBookMark,
  IconBookMarkSelected,
  IconDefaultPin,
  IconKakao,
  IconLink,
  IconShare,
} from "@/public/icons";
import useFanpoologStore, { Schedule } from "@/store/fanpool-log/store";
import Lottie from "lottie-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import spinner from "@/public/lottie/spinner3.json";

interface DetailPageProps {
  id: string;
  title: string;
  image: string | null;
  stadium: string;
  user: {
    id: string;
    nickname: string;
    image: string;
  };
  schedules: Schedule[];
}

export default function FanpoolLogDetailPage() {
  useKakaoLoader();
  const stadiumPosition = useFanpoologStore((state) => state.stadiumPosition);

  const [fanpoolLog, setFanpoolLog] = useState<DetailPageProps | null>(null);
  const [fanpoolLogUserId, setFanpoolLogUserId] = useState();
  const userId = localStorage.getItem("userId");

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [hasToken, setHasToken] = useState<boolean>(false);

  // 전역 상태 설정
  const setFanpoolLogId = useFanpoologStore((state) => state.setFanpoolLogId);
  const setTitle = useFanpoologStore((state) => state.setTitle);
  const setImage = useFanpoologStore((state) => state.setImage);
  const setStaidumId = useFanpoologStore((state) => state.setStadiumId);
  const setStadiumPosition = useFanpoologStore(
    (state) => state.setStadiumPosition
  );

  const handleBookMarkButton = () => {
    if (isSelected) {
      deleteBookmark(id.toString()).then((res) => {
        if (res.status === 200) {
          setIsSelected(!isSelected);
        }
      });
    } else {
      addBookmark(id.toString()).then((res) => {
        if (res.status === 200) {
          setIsSelected(!isSelected);
        }
      });
    }
  };

  const handleEditButton = () => {
    // 전역 상태 설정 후 페이지 이동
    setFanpoolLogId(id.toString());
    setTitle(fanpoolLog!.title);
    if (fanpoolLog!.image) setImage(fanpoolLog!.image);
    setStaidumId(stadiumMap.get(fanpoolLog!.stadium)!);
    setStadiumPosition({
      // schedule.place.contentType이 28 또는 schedule.place.name이 "고척스카이돔"인 것으로 설정
      x: fanpoolLog!.schedules.filter(
        (schedule) =>
          schedule.place.contentType === "28" ||
          schedule.place.name === "고척스카이돔"
      )[0].place.x,
      y: fanpoolLog!.schedules.filter(
        (schedule) =>
          schedule.place.contentType === "28" ||
          schedule.place.name === "고척스카이돔"
      )[0].place.y,
    });
    useFanpoologStore.setState({ schedules: fanpoolLog!.schedules });
    router.push(`/fanpool-log/create-log/step3`);
  };

  const handleDeleteButton = () => {
    deleteFanpoolLog(id.toString()).then((res) => {
      if (res.status === 200) {
        router.replace("/fanpool-log");
      }
    });
  };

  const handleShareButton = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsToastOpen(true);
    });
  };

  const handleKakaoShareButton = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: fanpoolLog?.title,
        description: fanpoolLog?.stadium,
        imageUrl:
          fanpoolLog?.image ||
          `/images/fanpool_log_image_default_${
            (Number(fanpoolLog?.id) % 5) + 1
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

  const handleLogin = () => {
    router.replace("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setHasToken(true);
    else setHasToken(false);

    getFanpoolLog(id.toString()).then((res) => {
      setFanpoolLog(res.data);
      setFanpoolLogUserId(res.data.user.id);
      setStadiumPosition({
        // schedule.place.contentType이 28인 것으로 설정
        x: res.data.schedules.filter(
          (schedule: any) => schedule.place.contentType === "28"
        )[0].place.x,
        y: res.data.schedules.filter(
          (schedule: any) => schedule.place.contentType === "28"
        )[0].place.y,
      });
    });
    try {
      getBookmark(id.toString()).then((res) => {
        if (res.status === 200) {
          setIsSelected(true);
        }
      });
    } catch {}
  }, []);

  if (!fanpoolLog)
    return (
      <Lottie
        animationData={spinner}
        style={{ width: "50px", height: "50px", margin: "auto" }}
        loop
      />
    );

  return (
    <div className="w-full absolute flex flex-col h-screen">
      {hasToken ? (
        userId === fanpoolLogUserId ? (
          <div className="top-0 left-0 right-0 z-50">
            <TapBar
              text=""
              type="edit"
              isNextButton={true}
              onEdit={handleEditButton}
              onDelete={handleDeleteButton}
            />
          </div>
        ) : (
          <div className="top-0 left-0 right-0 z-50">
            <TapBar text="" type="left" />
          </div>
        )
      ) : (
        <div className="mt-49pxr" />
      )}

      {/* 팬풀 로그 타이틀 및 장소 */}
      <div className="overflow-y-auto h-[calc(100vh-49px)]">
        <div className="w-full flex flex-col items-center gap-4pxr px-20pxr">
          {fanpoolLog.image && (
            <div className="w-85pxr h-85pxr">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={fanpoolLog.image}
                alt={"Representative Image"}
              />
            </div>
          )}

          <Text fontSize={20} fontWeight={700} color="gray700">
            {fanpoolLog.title}
          </Text>
          <Text fontSize={16} fontWeight={400} color="gray600">
            {fanpoolLog.stadium}
          </Text>
        </div>
        <div className="mt-18pxr" />
        {/* Kakao Map */}
        <Map
          id="map"
          center={{
            // 지도의 중심좌표
            lat: stadiumPosition!.y,
            lng: stadiumPosition!.x,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "170px",
          }}
          level={7}
        >
          {fanpoolLog.schedules.map((schedule, index) => (
            <MapMarker
              key={index}
              position={{
                lat: schedule.place.y,
                lng: schedule.place.x,
              }}
              image={{
                src: "/icons/map/icon_default_pin.svg",
                size: { width: 28, height: 40 },
              }}
            />
          ))}
        </Map>
        {/* 팬풀 등록자 */}
        <FanpoologUser
          id={fanpoolLog.user.id}
          name={fanpoolLog.user.nickname}
          image={
            fanpoolLog.user.image === ""
              ? "/images/default_profile.png"
              : fanpoolLog.user.image
          }
        />

        <InfinityLine
          color="bg-gray-50"
          thickness="h-3pxr"
          marginTop="mt-20pxr"
          marginBottom="mb-32pxr"
        />

        {/* 각 장소 카드*/}
        <div className="relative flex flex-col items-start px-20pxr">
          {Array.from(
            new Set(fanpoolLog.schedules.map((schedule) => schedule.day))
          ).map((day, dayIndex) => (
            <div key={dayIndex} className="w-full">
              <Text
                fontSize={18}
                fontWeight={700}
                color="gray800"
              >{`Day ${day}`}</Text>
              <div className="mt-18pxr" />

              {fanpoolLog.schedules
                .filter((schedule) => schedule.day === day)
                .map((schedule, index) => (
                  <div
                    key={schedule.place.contentId}
                    className="relative flex items-center mb-16pxr w-full"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-center">
                        <IconDefaultPin />
                      </div>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Text fontSize={12} fontWeight={700} color="white">
                          {index + 1}
                        </Text>
                      </span>
                    </div>
                    <div className="ml-16pxr w-full">
                      {schedule.memo && schedule.memo.content ? (
                        <TravelogAddCard
                          type={schedule.place.contentType}
                          image={schedule.place.thumbnail}
                          name={schedule.place.name}
                          location={schedule.place.address}
                          description={schedule.memo.content}
                          userId={"myUserId"}
                          locationImage={schedule.memo.images?.map(
                            (img) => img.url
                          )}
                          onClick={() => {}}
                          isEditing={true}
                        />
                      ) : (
                        <TravelogLocationCard
                          type={schedule.place.contentType}
                          image={schedule.place.thumbnail}
                          name={schedule.place.name}
                          location={schedule.place.address}
                          isEditing={true}
                          onClick={() => {}}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        {hasToken ? (
          <div className="mb-100pxr" />
        ) : (
          <div className="mb-150pxr" />
        )}

        {/* 바텀 시트 */}
        <div
          className={
            "absolute inset-x-0 bottom-0 w-full bg-white rounded-t-20pxr p-20pxr pt-16pxr shadow-[0px_0px_34px_0px_rgba(0,37,97,0.10)]"
          }
          style={{
            zIndex: 1000,
            maxHeight: "calc(100vh - 300px)",
            overflowY: "auto",
          }}
        >
          {hasToken ? (
            <div className="flex justify-center items-center gap-8pxr">
              <Button
                width="170px"
                height="50px"
                text={"채팅방 공유"}
                borderRadius={8}
                enabledTextColor={"text-white"}
                enabledBackgroundColor={"bg-primary"}
                disabledTextColor={"text-[#5679A3]"}
                disabledBackgroundColor={"bg-primary"}
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
              <button
                className="flex items-center jusitify-center p-8pxr"
                onClick={handleBookMarkButton}
              >
                {isSelected ? <IconBookMarkSelected /> : <IconBookMark />}
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-11pxr">
              <Text fontSize={14} fontWeight={500} color="gray700">
                팬풀의 회원이 되면 더 많은 컨텐츠를 이용할 수 있어요.
              </Text>
              <button
                className="flex w-320pxr h-50pxr px-16pxr py-10pxr justify-center items-center gap-4pxr flex-shrink-0 rounded-12pxr bg-[#FEE500]"
                onClick={handleLogin}
              >
                <div className="flex justify-center items-cetner gap-4pxr">
                  <IconKakao />
                  <Text fontSize={14} fontWeight={500} color="black">
                    카카오톡으로 시작하기
                  </Text>
                </div>
              </button>
              <div>
                <Text fontSize={12} fontWeight={500} color="gray500">
                  이미 계정이 있으신가요?{" "}
                  <button className="text-primary" onClick={handleLogin}>
                    로그인하기
                  </button>
                </Text>
              </div>
            </div>
          )}
        </div>
        <ToastMessage
          message="링크가 복사되었어요!"
          show={isToastOpen}
          onClose={() => {
            setIsToastOpen(false);
          }}
        />
      </div>
    </div>
  );
}
