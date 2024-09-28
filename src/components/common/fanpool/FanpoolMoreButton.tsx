import { Text } from '../Text';

interface FanpoolMoreButtonProps {
	handleClick: () => void;
}
export default function FanpoolMoreButton({
	handleClick,
}: FanpoolMoreButtonProps) {
	return (
		<section
			className="w-full h-50pxr flex items-center justify-center rounded-8pxr cursor-pointer"
			onClick={handleClick}
		>
			<Text fontSize={16} fontWeight={500} color="gray500">
				팬풀을 더 찾아볼까요?
			</Text>
		</section>
	);
}
