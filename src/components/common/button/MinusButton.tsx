import { IconButtonMinus } from '@/public/icons';

type MinusButtonProps = {
	onClick: () => void;
};

export default function MinusButton({ onClick }: MinusButtonProps) {
	return (
		<button
			onClick={onClick}
			className="w-48pxr h-48pxr bg-gray050 rounded-full flex items-center justify-center hover:brightness-75"
		>
			<IconButtonMinus />
		</button>
	);
}
