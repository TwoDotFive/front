import FanpoolCard from '@/components/common/fanpool/FanpoolCard';
import { Text } from '../../common/Text';
import { FanpoolInformation } from '@/types/types';
export default function LiveFanPool() {
	// 예시 데이터
	const exampleFanpool: FanpoolInformation = {
		id: 1,
		hostUserId: 789012,
		game: {
			id: 111,
			awayTeam: {
				id: 2,
				name: '키움 히어로즈',
				representativeImageUrl: 'https://example.com/kiwoom.png',
				stadiumName: '구로 고척 스카이돔',
				stadiumAliasName: '고척',
			},
			homeTeam: {
				id: 1,
				name: '삼성 라이온즈',
				representativeImageUrl: 'https://example.com/samsung.png',
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
		numberOfPeople: 4,
		currentNumberOfPeople: 2,
	};

	return (
		<section className="w-full flex flex-col">
			<Text fontSize={20} fontWeight={700} color="gray800">
				실시간 팬풀
			</Text>
			<div className="h-16pxr" />
			<FanpoolCard />
		</section>
	);
}
