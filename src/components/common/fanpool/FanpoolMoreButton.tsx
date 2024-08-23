import { Text } from '../Text';

interface FanpoolMoreButtonProps {
	handleClick: () => void;
}
export default function FanpoolMoreButton({
	handleClick,
}: FanpoolMoreButtonProps) {
	return (
		<section
			className="w-full h-50pxr flex items-center justify-center bg-gray100 rounded-8pxr cursor-pointer"
			onClick={handleClick}
		>
			<Text fontSize={16} fontWeight={700} color="gray700">
				더보기
			</Text>
		</section>
	);
}
