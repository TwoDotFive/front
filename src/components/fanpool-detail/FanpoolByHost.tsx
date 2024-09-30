import { useEffect, useState } from 'react';
import { Text } from '../common/Text';
import { getFanpoolLogsByUser } from '@/api/fanpool-log/log/main';
import TravelogWideCard from '../card/TravelogWideCard';

interface FanpoolByHostProps {
	hostUserId: BigInt;
}

interface FanpoolLogResponse {
	items: {
		id: string;
		image: string;
		title: string;
		stadium: string;
		profile: {
			nickname: string;
			image: string;
		};
	}[];
}
export default function FanpoolByHost({ hostUserId }: FanpoolByHostProps) {
	const [fanpoolLogList, setFanpoolLogList] = useState<
		FanpoolLogResponse['items']
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (hostUserId) {
					const fanpoolLogResponse = await getFanpoolLogsByUser(hostUserId);
					setFanpoolLogList(fanpoolLogResponse.items);
				}
			} catch (error) {
				console.error('데이터를 불러오는 중 오류 발생:', error);
			}
		};

		fetchData();
	}, [hostUserId]);

	if (fanpoolLogList.length === 0) {
		return null;
	}

	return (
		<section className="px-20pxr">
			<div className="h-14pxr" />
			<Text fontSize={18} fontWeight={700} color="gray700">
				주최자가 등록한 팬풀로그에요!
			</Text>
			{/* 팬풀로그 화면들 구현 */}
			<div className="flex flex-col gap-12pxr mt-20pxr">
				{fanpoolLogList.map((fanpoolLog) => (
					<TravelogWideCard
						key={fanpoolLog.id}
						id={fanpoolLog.id}
						image={fanpoolLog.image}
						title={fanpoolLog.title}
						userName={fanpoolLog.profile.nickname}
					/>
				))}
			</div>
			<div className="h-100pxr" />
		</section>
	);
}
