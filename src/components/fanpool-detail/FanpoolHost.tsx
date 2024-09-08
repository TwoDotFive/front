import { IconRightArrow } from '@/public/icons';
import { Text } from '../common/Text';

interface FanpoolHostProps {
	hostUserId: number;
}

export default function FanpoolHost({ hostUserId }: FanpoolHostProps) {
	return (
		<div>
			<section className="flex gap-4pxr w-full justify-between items-center">
				<div className="flex gap-8pxr">
					<div className="w-40pxr h-40pxr rounded-full bg-gray100" />
					<div className="flex flex-col justify-center">
						<Text fontSize={12} fontWeight={700} color="gray700">
							{'네임드호빵'}
						</Text>
						<Text fontSize={12} fontWeight={400} color="gray700">
							{3}개의 팬풀 | {4}개의 여행기
						</Text>
					</div>
				</div>
				<IconRightArrow />
			</section>
		</div>
	);
}
