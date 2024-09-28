import { format } from 'date-fns';
import { teams } from '@/constants/teams';
import { Text } from '../../common/Text';
import Image from 'next/image';
import { TagFanPool } from '../../common/tag/TagFanPool';
import { Game } from '@/types/types';

interface GameCardProps {
	game: Game; // Game 객체를 props로 받음
}

export default function GameCard({ game }: GameCardProps) {
	// 홈 팀과 원정 팀 정보
	const homeInfo = game.homeTeam;
	const awayInfo = game.awayTeam;

	// 경기 장소와 시간
	const placeName = game.stadium;
	const date = format(
		new Date(game.startDate),
		'yyyy. MM. dd aaa HH:mm'
	).toUpperCase();

	return (
		<section className="relative w-full flex flex-col rounded-t-12pxr overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center opacity-30"
				style={{ backgroundImage: 'url(/images/image_game_background.png)' }}
			/>

			{/**
			 * 위치, 시간 정보
			 */}
			<section className="relative w-full flex flex-col items-center gap-4pxr pt-20pxr">
				<Text fontSize={14} fontWeight={700} color="kboNavy">
					{date}
				</Text>
				<div className="flex gap-4pxr items-center">
					<Text fontSize={14} fontWeight={500} color="kboNavy">
						{placeName}
					</Text>
					<TagFanPool type="AWAY" />
				</div>
			</section>
			<div className="h-12pxr" />

			{/**
			 * HOME VS AWAY
			 */}
			<section className="relative w-full pb-13pxr">
				<section className="flex justify-center items-center gap-14pxr">
					<div className="flex gap-2pxr items-center">
						<Image
							src={homeInfo.representativeImageUrl}
							alt={homeInfo.name}
							width={28}
							height={28}
						/>
						<Text fontSize={18} fontWeight={800} color="kboNavy">
							{homeInfo.name}
						</Text>
					</div>
					<Text fontSize={14} fontWeight={500} color="kboNavy">
						VS
					</Text>
					<div className="flex gap-2pxr items-center">
						<Text fontSize={18} fontWeight={800} color="kboNavy">
							{awayInfo.name}
						</Text>
						<Image
							src={awayInfo.representativeImageUrl}
							alt={awayInfo.name}
							width={28}
							height={28}
						/>
					</div>
				</section>
			</section>
		</section>
	);
}
