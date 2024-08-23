import { IconButtonPlus } from '@/public/icons';

type PlusButtonProps = {
	onClick: () => void;
};

export default function PlusButton({ onClick }: PlusButtonProps) {
	return (
		<button
			onClick={onClick}
			className="w-48pxr h-48pxr bg-gray050 rounded-full flex items-center justify-center hover:brightness-75"
		>
			<IconButtonPlus />
		</button>
	);
}
