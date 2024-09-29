import { IconCar, IconFanpoolLog } from '@/public/icons';
import { Text } from '../Text';

interface MakeFanpoolLogButtonProps {
	onClick: () => void;
}

export default function MakeFanpoolLogButton({
	onClick,
}: MakeFanpoolLogButtonProps) {
	return (
		<button
			onClick={onClick}
			className="flex gap-6pxr items-center bg-kboBlue100 text-white px-12pxr py-[14.5px] rounded-30pxr"
		>
			<IconFanpoolLog />
			<Text fontSize={16} fontWeight={700} color="kboNavy">
				팬풀로그
			</Text>
		</button>
	);
}
