import { format } from 'date-fns';
import { teams } from '@/constants/teams';
import Image from 'next/image';
import { Game } from '@/types/types';
import { useUserStore } from '@/store/useUserStore';
import { IconRightArrow } from '@/public/icons';
import { Text } from '../common/Text';
import { TagFanPool } from '../common/tag/TagFanPool';

interface FanpoolMatchItemProps {
	game: Game;
}

export default function FanpoolMatchItem({ game }: FanpoolMatchItemProps) {
	const myTeam = useUserStore((state) => state.userProfile?.favoriteTeam.name);

	// 홈 팀과 원정 팀 정보
	const homeInfo = game.homeTeam;
	const awayInfo = game.awayTeam;

	// 경기 장소와 시간
	const placeName = homeInfo.stadiumName;
	const date = format(
		new Date(game.startDate),
		'yyyy. MM. dd aaa HH:mm'
	).toUpperCase();

	return (
		<div
			className="w-full rounded-12pxr"
			style={{ boxShadow: '0px 0px 11px 0px rgba(0, 0, 0, 0.11)' }}
		>
			<section className="relative w-full flex flex-col rounded-t-12pxr overflow-hidden py-16pxr px-12pxr">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-30"
					style={{ backgroundImage: 'url(/images/image_game_background.png)' }}
				/>

				{/**
				 * HOME VS AWAY
				 */}
				<section className="relative w-full">
					<section className="flex justify-center items-center gap-14pxr">
						<div className="flex gap-2pxr items-center">
							<Image
								src={homeInfo.representativeImageUrl}
								alt={homeInfo.name}
								width={28}
								height={28}
							/>
							<Text fontSize={18} fontWeight={700} color="kboNavy">
								{homeInfo.name}
							</Text>
						</div>
						<Text fontSize={14} fontWeight={500} color="kboNavy">
							VS
						</Text>
						<div className="flex gap-2pxr items-center">
							<Text fontSize={18} fontWeight={700} color="kboNavy">
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
			<section className="flex justify-between items-center bg-white p-12pxr rounded-b-12pxr cursor-pointer">
				{/**
				 * 위치, 시간 정보
				 */}
				<section className="relative w-full flex flex-col items-center">
					<Text fontSize={14} fontWeight={700} color="kboNavy">
						{date}
					</Text>
					<div className="flex gap-4pxr items-center">
						<Text fontSize={14} fontWeight={500} color="kboNavy">
							{placeName}
						</Text>
						<TagFanPool
							type={myTeam === game.homeTeam.name ? 'HOME' : 'AWAY'}
						/>
					</div>
				</section>
			</section>
		</div>
	);
}
