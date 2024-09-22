'use client';
import { useState, useEffect } from 'react';
import FanpoolCard from '@/components/common/fanpool/FanpoolCard';
import FanpoolMoreButton from '@/components/common/fanpool/FanpoolMoreButton';
import { Text } from '../../common/Text';
import getFanpoolLatest, {
	FanpoolInformation,
} from '@/api/fanpool/getFanpoolLastest';
import { useRouter } from 'next/navigation';

export default function LiveFanPool() {
	const router = useRouter();
	const [fanpoolList, setFanpoolList] = useState<FanpoolInformation[]>([]);
	const [loading, setLoading] = useState(true);

	// 팬풀 최신 목록을 가져오는 함수
	const fetchFanpoolList = async () => {
		try {
			const data = await getFanpoolLatest();
			setFanpoolList(data.fanpoolInformation);
		} catch (error) {
			console.error('팬풀 데이터를 가져오는데 실패했습니다.', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFanpoolList();
	}, []);

	const handleMoreFanpool = () => {
		router.push('fanpool-find');
	};

	return (
		<section className="w-full flex flex-col">
			<Text fontSize={20} fontWeight={700} color="gray800">
				막 올라온 따끈따끈한 팬풀!
			</Text>
			<div className="h-16pxr" />

			{loading ? (
				<Text fontSize={16}>로딩 중...</Text>
			) : fanpoolList.length > 0 ? (
				fanpoolList.map((fanpool) => (
					<div key={fanpool.id}>
						<FanpoolCard fanpool={fanpool} />
						<div className="h-14pxr" />
					</div>
				))
			) : (
				<Text fontSize={16}>팬풀이 없습니다.</Text>
			)}
			<div className="h-14pxr" />
			<FanpoolMoreButton
				handleClick={() => {
					handleMoreFanpool();
				}}
			/>
		</section>
	);
}
