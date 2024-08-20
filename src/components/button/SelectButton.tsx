import { Text } from '../common/Text';

type SelectButtonProps = {
	isSelected: boolean;
	onClick: () => void;
};

export default function SelectButton({
	isSelected,
	onClick,
}: SelectButtonProps) {
	return (
		<div
			className={`w-fit h-fit rounded-44pxr px-10pxr py-4pxr hover:brightness-75 ${
				isSelected ? 'bg-kboNavy text-gray000' : 'bg-gray050 text-gray600'
			}`}
			onClick={onClick}
		>
			<Text fontSize={14} fontWeight={isSelected ? 700 : 400}>
				{isSelected ? '취소' : '선택'}
			</Text>
		</div>
	);
}
