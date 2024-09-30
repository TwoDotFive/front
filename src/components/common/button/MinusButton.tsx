import { IconButtonMinus } from '@/public/icons';

type MinusButtonProps = {
	onClick: () => void;
};

export default function MinusButton({ onClick }: MinusButtonProps) {
	const handleDefaultClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onClick();
	};
	return (
		<button
			onClick={handleDefaultClick}
			className="w-48pxr h-48pxr bg-gray050 rounded-full flex items-center justify-center hover:brightness-75"
		>
			<IconButtonMinus />
		</button>
	);
}
