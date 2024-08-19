import { IconPlus } from '@/public/icons';
import { Text } from '../common/Text';

type FloatingMakeButtonProps = {
	onClick: () => void;
};
export const FloatingMakeButton = ({ onClick }: FloatingMakeButtonProps) => {
	return (
		<div
			className="w-fit h-fit p-12pxr flex items-center justify-center bg-[#2D67FF] rounded-30pxr"
			onClick={onClick}
		>
			<IconPlus />{' '}
			<Text fontSize={16} fontWeight={700} color="white">
				만들기
			</Text>
		</div>
	);
};
