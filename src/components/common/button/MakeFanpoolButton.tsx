import { IconCar } from '@/public/icons';
import { Text } from '../Text';

interface MakeFanpoolButtonProps {
	onClick: () => void;
}

export default function MakeFanpoolButton({ onClick }: MakeFanpoolButtonProps) {
	return (
		<button
			onClick={onClick}
			className="flex gap-6pxr items-center bg-kboNavy text-white px-12pxr py-[14.5px] rounded-30pxr"
		>
			<IconCar />
			<Text fontSize={16} fontWeight={700} color="gray000">
				팬풀 모집
			</Text>
		</button>
	);
}
