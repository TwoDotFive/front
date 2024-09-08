import { IconDefaultPin, IconShiftBottom } from '@/public/icons';
import { Text } from '../Text';

interface FanpoolMatchSelectButtonProps {
	matchCount: number;
}
export default function FanpoolMatchSelectButton({
	matchCount,
}: FanpoolMatchSelectButtonProps) {
	return (
		<div className="w-full h-40pxr flex justify-between px-8pxr items-center rounded rounded-8px bg-gray050">
			<Text fontSize={14} fontWeight={500} color="gray800">
				모든 경기({matchCount})
			</Text>
			<IconShiftBottom />
		</div>
	);
}
