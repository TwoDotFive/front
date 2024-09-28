import { format } from 'date-fns';
import Image from 'next/image';
import { Text } from '../common/Text';
import { TagFanPool } from '../common/tag/TagFanPool';
import { Game } from '@/types/types';

interface GameCardProps {
	game: Game; // Game 정보를 props로 전달받음
}

export default function GameCard({ game }: GameCardProps) {
	// 홈 팀과 원정 팀 정보
	const homeInfo = game.homeTeam;
	const awayInfo = game.awayTeam;

	// 경기 장소와 시간
	const placeName = game.stadium;
	const formattedDate = format(
		new Date(game.startDate),
		'M월 d일 aaa h:mm'
	).toUpperCase();

	return (
		<section className="w-full relative flex flex-col rounded-12pxr">
			<div className="absolute inset-0 bg-primary opacity-50 rounded-12pxr" />

			<div className="relative z-10 flex flex-col">
				{/**
				 * HOME VS AWAY
				 */}
				<section className="w-full py-19pxr">
					<section className="flex justify-center items-center gap-16pxr">
						<div className="flex flex-col gap-8pxr items-center">
							<div className="w-67pxr h-67pxr flex items-center justify-center bg-white rounded-full">
								<Image
									src={homeInfo.representativeImageUrl}
									alt={homeInfo.name}
									width={60}
									height={60}
								/>
							</div>
							<Text fontSize={14} fontWeight={700} color="white">
								{homeInfo.name}
							</Text>
						</div>
						<Text fontSize={14} fontWeight={700} color="white">
							VS
						</Text>
						<div className="flex flex-col gap-8pxr items-center">
							<div className="w-67pxr h-67pxr flex items-center justify-center bg-white rounded-full">
								<Image
									src={awayInfo.representativeImageUrl}
									alt={awayInfo.name}
									width={60}
									height={60}
								/>
							</div>
							<Text fontSize={14} fontWeight={700} color="white">
								{awayInfo.name}
							</Text>
						</div>
					</section>
				</section>
				<div className="h-8pxr" />
				{/**
				 * 위치,시간 정보
				 */}
				<section className="w-full pb-12pxr flex flex-col items-center gap-4pxr">
					<Text fontSize={14} fontWeight={500} color="white">
						{placeName}
					</Text>
					<div className="flex gap-4pxr items-center">
						<Text fontSize={14} fontWeight={500} color="white">
							{formattedDate}
						</Text>
						<TagFanPool type="AWAY" />
					</div>
				</section>
			</div>
		</section>
	);
}
