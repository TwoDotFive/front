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
						width={0}
						height={0}
						alt=""
						sizes="100vw"
						src={'/images/image_carshare_big.png'}
						className="w-full h-auto"
					/>
				</div>
				<div className="h-14pxr" />
				<Text fontSize={18} fontWeight={700} color="kboBlue500">
					차량 공유
				</Text>
				<div className="h-2pxr" />
				<Text fontSize={16} fontWeight={400} color="gray700">
					차량을 제공하여 이동 비용을 절약할 수 있어요. 모집글에 함께하고 싶은
					팬에 대해 작성하고 원하는 카풀 방식(비용), 직관 빈도, 응원 스타일 등을
					공유하면 더 나와 맞는 팬들을 찾기 쉬워져요.
				</Text>
				<div className="h-60pxr" />
				<div className="flex justify-center">
					<Image
						width={0}
						height={0}
						alt=""
						sizes="100vw"
						src={'/images/image_taxi_big.png'}
						className="w-full h-auto"
					/>
				</div>
				<div className="h-14pxr" />
				<Text fontSize={18} fontWeight={700} color="kboBlue500">
					택시팟
				</Text>
				<div className="h-2pxr" />
				<Text fontSize={16} fontWeight={400} color="gray700">
					경기 지연으로 시간이 늦어지면, 경기 전후 함께 택시로 이동할 인원을
					모을 수 있어요. 목적지까지 방향이 비슷한 팬들을 모아 이동할 수 있어요.
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
				함께 응원할 갈 팬들을 찾아 즐거운 여정을 나눠보세요!
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
