import { IconChat } from '@/public/icons';
import FanpoolCard from '../common/fanpool/FanpoolCard';
import { Text } from '../common/Text';
import { FanpoolInformation } from '@/types/types';
interface FindResultProps {
	fanpoolDatas: FanpoolInformation[];
}
export default function FindResult({ fanpoolDatas }: FindResultProps) {
	return (
		<section className="flex flex-col gap-12pxr">
			{fanpoolDatas.length !== 0 ? (
				fanpoolDatas.map((fanpoolData, index) => (
					<div key={index}>
						<FanpoolCard fanpool={fanpoolData} />
					</div>
				))
			) : (
				<div className="flex flex-col items-center gap-4pxr mt-150pxr">
					<IconChat />
					<Text fontSize={12} fontWeight={500} color="gray400">
						앗 결과가 없어요!
					</Text>
				</div>
			)}
			<div className="h-50pxr" />
		</section>
	);
}
