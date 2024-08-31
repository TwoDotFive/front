'use client';

import { Text } from "../../common/Text";
import FanpoolCard from "./TeamFanpoolCard";

interface TeamTravelogProps {
    team: string;
}
// TODO: team props 받아오는 부분 수정 필요

export default function TeamTravelog({team}: TeamTravelogProps) {
    return(
        <section className="w-full flex flex-col items-start px-20pxr">
            <Text fontWeight={700} fontSize={18}>{team}를 응원하는</Text>
            <Text fontWeight={700} fontSize={18}>사람들이 방문했어요!</Text>
            <div className="flex flex-col items-start gap-16pxr mt-16pxr">
                <FanpoolCard image="/images/fanpool-log_ex.png" title="멸치집 본점" location="서울 송파구 백제고분로 15길 44" review={5.0} tagNames={['차량공유', '같은팀만']} />
                <FanpoolCard image="/images/fanpool-log_ex.png" title="멸치집 본점" location="서울 송파구 백제고분로 15길 44" review={5.0} tagNames={['차량공유', '같은팀만']} />
                <FanpoolCard image="/images/fanpool-log_ex.png" title="멸치집 본점" location="서울 송파구 백제고분로 15길 44" review={5.0} tagNames={['차량공유', '같은팀만']} />
            </div>
        </section>
    )
}