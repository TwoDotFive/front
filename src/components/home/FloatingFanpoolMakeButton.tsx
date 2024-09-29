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
		<div className="fixed flex justify-end w-full max-w-399pxr z-50 bottom-80pxr pr-20pxr">
			<div
				className="w-fit h-fit py-14pxr px-12pxr gap-6pxr flex items-center justify-center bg-kboNavy rounded-30pxr cursor-pointer hover:brightness-75"
				onClick={handleClick}
			>
				<IconCar />
				<Text fontSize={16} fontWeight={700} color="white">
					팬풀모집
				</Text>
			</div>
		</div>
	);
};
