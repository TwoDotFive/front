'use client';

import TravelogCard from "../card/TravelogCard";
import Button from "../common/Button";
import { Text } from "../common/Text";

type RecentFanpoolLogProps = {
    hasButton?: boolean;
}

export default function RecentFanpoolLog({hasButton = true}: RecentFanpoolLogProps) {
    return(
        <section className="w-full flex flex-col items-start">
            {hasButton ?  <Text fontWeight={700} fontSize={18} color="black">따끈따끈 갓 올라온 로그!</Text> : <Text fontWeight={700} fontSize={18} color="black">이곳을 방문한 여행일정이에요</Text>}            
            <div className="w-full flex gap-12pxr overflow-x-auto whitespace-nowrap py-20pxr">
                <TravelogCard id={"1"} image='/images/kt.png' userName='네임드호빵' userImage='/images/kt.png' title='비오는날 경기 대신 서울 나들이' locations={['잠실야구장', '피처캠프 신천점', '새마을 전통시장','멸치집 본점']}  />
                <TravelogCard id={"2"} image='/images/kt.png' userName='네임드호빵' userImage='/images/kt.png' title='비오는날 경기 대신 서울 나들이' locations={['잠실야구장', '피처캠프 신천점', '새마을 전통시장','멸치집 본점']}  />
                <TravelogCard id={"3"} image='/images/kt.png' userName='네임드호빵' userImage='/images/kt.png' title='비오는날 경기 대신 서울 나들이' locations={['잠실야구장', '피처캠프 신천점', '새마을 전통시장','멸치집 본점']}  />
            </div>
            {hasButton && (
                <div className="mx-auto">
                    <Button
                        width="320px"
                        height="50px"
                        text={'더보기'}
                        borderRadius={8}
                        enabledTextColor={'text-gray700'}
                        enabledBackgroundColor={'bg-gray100'}
                        disabledTextColor={'text-gray300'}
                        disabledBackgroundColor={'bg-primary'}
                        onClick={() => {}}
                    />
                </div>
            )}
        </section>
    );

}
