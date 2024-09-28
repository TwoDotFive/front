'use client';
import { IconCar } from '@/public/icons';
import { Text } from '../common/Text';
import { useRouter } from 'next/navigation';

export const FloatingFanpoolMakeButton = () => {
	const router = useRouter();
	const handleClick = () => {
		router.push('/fanpool-add');
	};
	return (
		<div
			className="z-50 sticky bottom-80pxr left-260pxr w-fit h-fit py-14pxr px-12pxr gap-6pxr flex items-center justify-center bg-kboNavy rounded-30pxr cursor-pointer hover:brightness-75"
			onClick={handleClick}
		>
			<IconCar />
			<Text fontSize={16} fontWeight={700} color="white">
				팬풀모집
			</Text>
		</div>
	);
};
