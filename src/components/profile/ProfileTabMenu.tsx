'use client';
import { useState, useEffect } from 'react';
import { Text } from '../common/Text';
import MakeFanpoolButton from '../common/button/MakeFanpoolButton';
import MakeFanpoolLogButton from '../common/button/MakeFanpoolLogButton';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import TravelogWideCard from '../card/TravelogWideCard';
import getFanpool from '@/api/fanpool/getFanpool';
import { getFanpoolLogsByUser } from '@/api/fanpool-log/log/main';
import { FanpoolInformation } from '@/types/types';
import FanpoolCard from '../common/fanpool/FanpoolCard';

interface ProfileTabMenuProps {
	id?: string | BigInt;
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

export default function ProfileTabMenu({ id }: ProfileTabMenuProps) {
	const { userProfile } = useUserStore();
	const searchId = id || userProfile?.id;
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');
	const [fanpoolList, setFanpoolList] = useState<FanpoolInformation[]>([]);
	const [fanpoolLogList, setFanpoolLogList] = useState<
		FanpoolLogResponse['items']
	>([]);
	const [fanpoolCount, setFanpoolCount] = useState(0);
	const [logCount, setLogCount] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (searchId) {
					// 팬풀 정보 가져오기
					const fanpoolResponse = await getFanpool({
						userId: searchId,
						page: 0,
						size: 10,
					});
					setFanpoolList(fanpoolResponse.fanpoolInformation);
					setFanpoolCount(fanpoolResponse.fanpoolInformation.length);

					// 팬풀 로그 정보 가져오기
					const fanpoolLogResponse = await getFanpoolLogsByUser(searchId);
					setFanpoolLogList(fanpoolLogResponse.items);
					setLogCount(fanpoolLogResponse.items.length);
				}
			} catch (error) {
				console.error('데이터를 불러오는 중 오류 발생:', error);
			} finally {
				setIsLoading(false);
			}
		};

		// 컴포넌트가 로드될 때 한 번만 실행
		fetchData();
	}, [searchId]);

	const handleTabClick = (tab: 'tab1' | 'tab2') => {
		setActiveTab(tab);
	};

	const handleClick = () => {
		router.push('/fanpool-add');
	};
	const handleAddLogClick = () => {
		router.push('/fanpool-add');
	};

	const renderFanpool = () => {
		return (
			<div>
				{fanpoolCount > 0 ? (
					<div>
						{fanpoolList.map((fanpool) => (
							<div key={fanpool.id}>
								<FanpoolCard fanpool={fanpool} />
								<div className="h-14pxr" />
							</div>
						))}
					</div>
				) : (
					<div className="mt-92pxr flex flex-col gap-14pxr items-center">
						<Text
							fontSize={12}
							fontWeight={500}
							color="gray500"
							className="text-center"
						>
							모집한 팬풀이 없어요!
							<br />
							새로운 팬풀을 모집해봐요!
						</Text>
						<MakeFanpoolButton onClick={handleClick} />
					</div>
				)}
			</div>
		);
	};

	const renderFanpoolLogList = () => {
		return fanpoolLogList.length === 0 ? (
			<div className="mt-92pxr flex flex-col gap-14pxr items-center">
				<Text
					fontSize={12}
					fontWeight={500}
					color="gray500"
					className="text-center"
				>
					등록된 로그가 없어요
					<br />
					지금 새 로그를 만들어 볼까요?
				</Text>
				<MakeFanpoolLogButton onClick={handleAddLogClick} />
			</div>
		) : (
			<div className="flex flex-col gap-12pxr">
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
		);
	};

	return (
		<section>
			{/* 메뉴 섹션 */}
			<div className="flex w-full">
				<div
					className={`flex-1 text-center cursor-pointer pb-12pxr ${
						activeTab === 'tab1' ? 'border-b-2 border-gray800' : ''
					}`}
					onClick={() => handleTabClick('tab1')}
				>
					<Text
						fontSize={16}
						fontWeight={activeTab === 'tab1' ? 700 : 400}
						color="gray700"
					>
						모집한 팬풀 {fanpoolCount}
					</Text>
				</div>
				<div
					className={`flex-1 text-center cursor-pointer pb-12pxr ${
						activeTab === 'tab2' ? 'border-b-2 border-gray800' : ''
					}`}
					onClick={() => handleTabClick('tab2')}
				>
					<Text
						fontSize={16}
						fontWeight={activeTab === 'tab2' ? 700 : 400}
						color="gray700"
					>
						팬풀로그 {logCount}
					</Text>
				</div>
			</div>

			<div className="h-30pxr" />
			{/* 탭에 따른 컨텐츠 영역 */}
			<div>
				{activeTab === 'tab1' && renderFanpool()}
				{activeTab === 'tab2' && <div>{renderFanpoolLogList()}</div>}
				<div className="h-100pxr" />
			</div>
		</section>
	);
}
