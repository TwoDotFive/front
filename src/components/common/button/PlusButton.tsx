import { IconButtonPlus } from '@/public/icons';

type PlusButtonProps = {
	onClick: () => void;
};

export default function PlusButton({ onClick }: PlusButtonProps) {
	const handleDefaultClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onClick();
	};

	return (
		<button
			onClick={handleDefaultClick}
			className="w-48pxr h-48pxr bg-gray050 rounded-full flex items-center justify-center hover:brightness-75"
		>
			<IconButtonPlus />
		</button>
	);
}
