'use client';
import InfinityLine from '@/components/common/InfinityLine';
import FanpoolByHost from '@/components/fanpool-detail/FanpoolByHost';
import FanpoolDetail from '@/components/fanpool-detail/FanpoolDetail';
import FanpoolDetailBottomBar from '@/components/fanpool-detail/FanpoolDetailBottomBar';
import FanpoolHost from '@/components/fanpool-detail/FanpoolHost';
import GameInfo from '@/components/fanpool-detail/GameInfo';
import { useSearchParams } from 'next/navigation';

export default function page() {
	const fanpoolInformation = {
		id: 123,
		hostUserId: 789012,
		game: {
			id: 111,
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://~~',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://~~',
				stadiumName: '수원 위즈 파크',
				stadiumAliasName: '수원',
			},
			startDate: '2024-09-01T15:00:00',
			stadium: '수원 위즈 파크',
		},
		departAt: '2024-08-20T10:00:00',
		departFrom: {
			fullText: '서울 종로구 광화문광장로 123',
			zipNo: '12345',
			sido: '서울',
			sigungu: '종로구',
			dong: '대한동',
			dongCd: '12345678',
			x: '127.0331234',
			y: '37.523427',
		},
		fanpoolType: 'CAR_SHARE',
		fanpoolTypeKor: '차량공유',
		genderConstraint: '남성만',
		numberOfPeople: 4,
		currentNumberOfPeople: 2,
	};
	const searchParams = useSearchParams();
	return (
		<section className="relative">
			<GameInfo />
			<div className="h-24pxr" />
			<div className="px-20pxr">
				<FanpoolHost hostUserId={fanpoolInformation.hostUserId} />
				<div className="h-40pxr" />
				<FanpoolDetail fanpoolInformation={fanpoolInformation} />
			</div>
			<InfinityLine color="bg-gray100" thickness="h-6pxr" />
			<FanpoolByHost />
			<FanpoolDetailBottomBar />
		</section>
	);
}
