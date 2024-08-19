import { Text } from '../common/Text';

type SelectButtonProps = {
	isSelected: boolean;
};

export default function SelectButton({ isSelected }: SelectButtonProps) {
	return (
		<div
			className={`w-fit h-fit rounded-44pxr px-10pxr py-4pxr hover:brightness-75 ${
				isSelected ? 'bg-kboNavy text-gray000' : 'bg-gray50 text-gray600'
			}`}
		>
			<Text fontSize={14} fontWeight={isSelected ? 700 : 400}>
				{isSelected ? '취소' : '선택'}
			</Text>
		</div>
	);
}
