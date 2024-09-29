import Image from 'next/image';
import { Text } from '../Text';

export default function TaxiCard() {
	return (
		<div className="w-full rounded-10pxr bg-gray050 flex gap-14pxr p-14pxr">
			<Image width={48} height={32} src={'/images/image_taxi.png'} alt={''} />
			<div className="flex-col flex">
				<Text fontSize={16} fontWeight={700} color="gray700">
					택시팟
				</Text>
				<Text fontSize={14} fontWeight={400} color="gray700">
					같이 택시탈 사람을 구하고 싶어요
				</Text>
			</div>
		</div>
	);
}
