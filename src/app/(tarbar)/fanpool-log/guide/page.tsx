"use client";

import TapBar from "@/components/common/TapBar";
import { Text } from "@/components/common/Text";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full">
      <TapBar text="" type="left" />
      <div className="mt-24pxr" />
      <div className="flex flex-col items-start gap-8pxr px-20pxr">
        <Text fontSize={18} fontWeight={700} color="gray800">
          경기의 감동과 여행의 추억,
          <br />
          직관 여행 팬풀로그 이용 가이드
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray700">
          팬풀로그를 통해 경기를 함께하느 팬들과의 소중한 추억, 그리고 여행의
          모든 순간을 기록하고 공유해보세요!
        </Text>
      </div>
      <div className="mt-24pxr" />
      <Image
        src="/images/fanpool_log_guide_1.png"
        width={399}
        height={0}
        alt={"fanpool log guide 1"}
      />
      <div className="mt-24pxr" />
      <div className="flex flex-col items-start gap-4pxr px-20pxr">
        <Text fontSize={16} fontWeight={700} color="gray800">
          팬풀로그란?
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray700">
          팬풀로그는 직관 여행기를 자유롭게 기록하고 다른 팬들과 공유할 수 있는
          공간이에요! 경기가 끝난 후, 열정 가득한 응원 경험, 생생한 경기장 순간,
          그리고 여행지에서의 특별한 이야기를 팬풀로그에 담아보세요.
        </Text>
      </div>
      <div className="mt-40pxr" />
      <Text fontSize={16} fontWeight={700} color="gray800" className="px-20pxr">
        팬풀로그 작성하기
      </Text>
      <div className="mt-24pxr" />
      <Image
        src="/images/fanpool_log_guide_2.png"
        width={399}
        height={0}
        alt={"fanpool log guide 2"}
      />
      <div className="mt-24pxr" />
      <div className="flex flex-col items-start gap-4pxr px-20pxr">
        <Text fontSize={16} fontWeight={700} color="kboBlue500">
          경기장과 주변 장소들을 검색해요
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray700">
          경기장을 선택하면, 해당 경기장에서 즐길 수 있는 다양한 장소들을 확인할
          수 있어요
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray400">
          장소를 클릭하면 이용과 관련된 세부정보들을 볼 수 있어요
        </Text>
      </div>
      <div className="mt-40pxr" />
      <Image
        src="/images/fanpool_log_guide_3.png"
        width={399}
        height={0}
        alt={"fanpool log guide 3"}
      />
      <div className="mt-24pxr" />
      <div className="flex flex-col items-start gap-4pxr px-20pxr">
        <Text fontSize={16} fontWeight={700} color="kboBlue500">
          기록과 사진으로 나만의 로그를 완성해요
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray700">
          팬풀로그에는 경기 후기, 경기장 내 맛집 후기, 경기장 주변 맛집 후기,
          숙소정보 등의 현장에서의 특별한 순간들을 담을 수 있어요.
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray400">
          작성한 팬풀로그는 언제 어디서든 수정할 수 있어요
        </Text>
      </div>
      <div className="mt-40pxr" />
      <Image
        src="/images/fanpool_log_guide_4.png"
        width={399}
        height={0}
        alt={"fanpool log guide 4"}
      />
      <div className="mt-24pxr" />
      <div className="flex flex-col items-start gap-4pxr px-20pxr">
        <Text fontSize={16} fontWeight={700} color="kboBlue500">
          다른 사람과 함께 팬풀로그를 공유해요
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray700">
          신규 업데이트 된 팬풀로그들을 살펴보고 경기장 별 팬풀로그들을 찾아볼
          수 있어요. 마음에 드는 팬풀로그가 있다면 “채팅방 공유”버튼을 통해
          친구와 공유해요.
        </Text>
        <Text fontSize={14} fontWeight={400} color="gray400">
          링크 공유를 통해 팬풀이용자가 아니더라도 팬풀로그를 전달할 수있어요
        </Text>
      </div>
    </div>
  );
}
