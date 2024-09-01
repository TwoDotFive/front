'use client';
import Button from "@/components/common/Button";
import HeaderBanner from "@/components/fanpool-log/HeaderBanner";
import RecentFanpoolLog from "@/components/fanpool-log/RecentFanpoolLog";
import TeamTravelog from "@/components/fanpool-log/TeamTravelog/TeamTravelog";
import { useRouter } from "next/navigation";

export default function page() {
	const router = useRouter();

	const handleFanpoologButton = () => {
		router.push('/fanpool-log/create-log/step1');
	}

	return (
		<div className="w-full flex flex-col">
			<HeaderBanner imageUrl="/images/fanpool-log_ex.png" title="비오는날 경기 대신 서울나들이 ..." description="최대 두줄까지만이라고 하려고 했는데 여기 들어가는 문구가 뭔지 정해지지 않은 것 같아 " nickname="네임드호빵" userImgUrl="/images/kt.png" />
			<div className="p-20pxr">
				<RecentFanpoolLog />
				<div className="m-60pxr"></div>
				<TeamTravelog team="KT위즈" />
				<div className="fixed bottom-88pxr left-1/2 transform -translate-x-1/2">
				<Button
						width="135px"
						height="46px"
						text={'+ 팬풀로그 작성'}
						borderRadius={30}
						enabledTextColor={'text-white'}
						enabledBackgroundColor={'bg-primary'}
						disabledTextColor={'text-[#5679A3]'}
						disabledBackgroundColor={'bg-primary'}
						onClick={handleFanpoologButton}
					/>
				</div>	
			</div>
		</div>
	);
}
