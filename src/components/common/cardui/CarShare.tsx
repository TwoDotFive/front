import Image from 'next/image';
import { Text } from '../Text';

export default function CarShare() {
	return (
		<div className="w-full rounded-10pxr bg-gray050 flex gap-14pxr p-14pxr">
			<Image
				width={48}
				height={32}
				src={'/images/image_carshare.png'}
				alt={''}
			/>
			<div className="flex-col flex">
				<Text fontSize={16} fontWeight={700} color="gray700">
					차량공유
				</Text>
				<Text fontSize={14} fontWeight={400} color="gray700">
					차량을 공유하여 함께 이동할래요
				</Text>
			</div>
		</div>
	);
}
