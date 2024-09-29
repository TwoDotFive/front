'use client';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Tags } from '@/constants/tags';
import { TagFanPool } from '../tag/TagFanPool';
import { Text } from '../Text';
import { useRouter } from 'next/navigation';
import { FanpoolInformation } from '@/types/types';

interface FanpoolCardProps {
	fanpool: FanpoolInformation;
}

export default function FanpoolCard({ fanpool }: FanpoolCardProps) {
	const router = useRouter();
	if (!fanpool) {
		return null;
	}

	const formattedDepartAt = format(
		new Date(fanpool.departAt),
		'MM.dd(EEE) HH:mm',
		{
			locale: ko,
		}
	);

	const stadiumShort = fanpool.game.stadium.split(' ')[0];
	const awayTeamShort = fanpool.game.awayTeam.name.split(' ')[0];
	const homeTeamShort = fanpool.game.homeTeam.name.split(' ')[0];

	const isFinish = fanpool.currentNumberOfPeople === fanpool.numberOfPeople;
	const isTaxi = fanpool.fanpoolType === 'CAR_SHARE';
	const handleCardClick = () => {
		router.push(`/fanpool-detail/${fanpool.id}`);
	};
	const getPeopleString = () => {
		return `${fanpool.currentNumberOfPeople}/${fanpool.numberOfPeople}`;
	};
	const getImagePath = () => {
		if (isTaxi) {
			if (isFinish) {
				return '/images/image_taxi_off.png';
			} else {
				return '/images/image_taxi_on.png';
			}
		} else {
			if (isFinish) {
				return '/images/image_car_off.png';
			} else {
				return '/images/image_car_on.png';
			}
		}
	};
	return (
		<section
			className="w-full h-104pxr flex gap-12pxr cursor-pointer"
			onClick={handleCardClick}
		>
			<div className="relative w-82pxr h-full">
				<img
					src={getImagePath()}
					alt={`${fanpool.game.awayTeam.name} 이미지`}
					className="w-full h-full rounded-9pxr object-contain"
				/>
				<div
					className={`absolute top-7pxr left-7pxr px-6pxr py-2pxr rounded-4pxr ${
						isFinish ? 'bg-gray100' : 'bg-white'
					}`}
				>
					<Text
						fontSize={12}
						fontWeight={700}
						color={isFinish ? 'gray400' : 'gray700'}
					>
						{getPeopleString()}
					</Text>
				</div>
			</div>
			<div className="flex flex-col justify-between py-8pxr">
				<TagFanPool type={fanpool.fanpoolType as Tags} />
				<Text fontSize={16} fontWeight={600}>
					{fanpool.title}
				</Text>
				<Text fontSize={12} fontWeight={400}>
					{formattedDepartAt} {stadiumShort} | {awayTeamShort} VS{' '}
					{homeTeamShort}
				</Text>
				<Text fontSize={12} fontWeight={400}>
					{fanpool.departFrom.sigungu} 출발, {fanpool.numberOfPeople}명 모집
				</Text>
			</div>
		</section>
	);
}
