import { IconChat } from '@/public/icons';
import FanpoolCard from '../common/fanpool/FanpoolCard';
import { Text } from '../common/Text';
export default function FindResult() {
	return (
		<section className="flex flex-col gap-12pxr">
			<FanpoolCard />
			<FanpoolCard />
			<FanpoolCard />
			<FanpoolCard />
			<FanpoolCard />
			{/*
			<div className="flex flex-col items-center gap-4pxr mt-150pxr">
				<IconChat />
				<Text fontSize={12} fontWeight={500} color="gray400">
					앗 결과가 없어요!
				</Text>
			</div>
			*/}
		</section>
	);
}
