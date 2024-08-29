'use client';
import FanpoolCard from '@/components/common/fanpool/FanpoolCard';
import FanpoolMoreButton from '@/components/common/fanpool/FanpoolMoreButton';
import { Text } from '../../common/Text';
export default function LiveFanPool() {
	/**
	 * TODO: 팬풀카드 리스트로 구현 후 "더보기" 눌렀을 때 page처리
	 */
	const handleMoreFanpool = () => {};
	return (
		<section className="w-full flex flex-col">
			<Text fontSize={20} fontWeight={700} color="gray800">
				실시간 팬풀
			</Text>
			<div className="h-16pxr" />
			<FanpoolCard />
			<div className="h-14pxr" />
			<FanpoolMoreButton
				handleClick={() => {
					handleMoreFanpool();
				}}
			/>
		</section>
	);
}
