import { useState } from 'react';
import Button from '../common/Button';
import { Text } from '../common/Text';
import Image from 'next/image';

interface FanpoolAddInitProps {
	handleNextStep: () => void;
}

export default function FanpoolAddInit({
	handleNextStep,
}: FanpoolAddInitProps) {
	const [cardIndex, setCardIndex] = useState(0);

	const renderCards = () => {
		return (
			<div className="w-full flex flex-col">
				<div className="flex justify-center">
					<Image
						width={191}
						height={191}
						alt=""
						src={'/images/image_carshare_big.png'}
						className="select-none"
					/>
				</div>
				<div className="h-14pxr" />
				<Text fontSize={18} fontWeight={700} color="kboBlue500">
					차량 공유
				</Text>
				<div className="h-2pxr" />
				<Text fontSize={16} fontWeight={400} color="gray700">
					차량을 제공하여 이동 비용을 절약할 수 있어요
				</Text>
				<div className="h-60pxr" />
				<div className="flex justify-center">
					<Image
						width={191}
						height={191}
						alt=""
						src={'/images/image_taxi_big.png'}
						className="select-none "
					/>
				</div>
				<div className="h-14pxr" />
				<Text fontSize={18} fontWeight={700} color="kboBlue500">
					택시팟
				</Text>
				<div className="h-2pxr" />
				<Text fontSize={16} fontWeight={400} color="gray700">
					택시비를 1/N으로 나눠 비용 부담을 줄일 수 있어요
				</Text>
			</div>
		);
	};

	const handleButtonClick = () => {
		handleNextStep();
	};

	return (
		<div className="flex flex-col relative mt-30pxr px-20pxr">
			<Text fontSize={20} fontWeight={700} color="gray700">
				팬풀이 뭔가요?
			</Text>
			<Text fontSize={16} fontWeight={400} color="gray700">
				다른 팬과 함께 직관까지 동행하는 것을 말해요. 보고 싶은 경기를 선택하고,
				함께 응원할 팬들을 만나 즐거운 여정을 나눠보세요!
			</Text>
			<div className="h-60pxr" />

			{/* 카드 영역 */}
			<section className="w-full h-full">
				<div className="w-full h-full flex justify-center items-center">
					{renderCards()}
				</div>
			</section>

			<div className="max-w-399pxr w-full fixed bottom-20pxr left-1/2 -translate-x-1/2 right-0 px-20pxr">
				<Button
					width="100%"
					height="50px"
					text={'확인했어요'}
					borderRadius={8}
					enabledTextColor={'text-white'}
					enabledBackgroundColor={'bg-primary'}
					disabledTextColor={'text-gray300'}
					disabledBackgroundColor={'bg-gray100'}
					onClick={handleButtonClick}
				/>
			</div>
		</div>
	);
}
