import { format } from 'date-fns';
import { teams } from '@/constants/teams';
import { Text } from '../../common/Text';
import Image from 'next/image';
import { TagFanPool } from '../../common/tag/TagFanPool';
import { Game } from '@/types/types';
import { useUserStore } from '@/store/useUserStore';
import { IconRightArrow } from '@/public/icons';
import { useEffect, useState } from 'react';
import getGameFanpoolCount from '@/api/baseball/getGameFanpoolCount';
import { useSearchStore } from '@/store/useSearchStore';
import { useRouter } from 'next/navigation';

interface GameCardProps {
	game: Game;
}

export default function GameCard({ game }: GameCardProps) {
	const myTeam = useUserStore((state) => state.userProfile?.favoriteTeam.name);
	const setSelectedMatches = useSearchStore(
		(state) => state.setSelectedMatches
	);

	const router = useRouter();
	// 홈 팀과 원정 팀 정보
	const homeInfo = game.homeTeam;
	const awayInfo = game.awayTeam;

	// 경기 장소와 시간
	const placeName = homeInfo.stadiumName;
	const date = format(
		new Date(game.startDate),
		'yyyy. MM. dd aaa HH:mm'
	).toUpperCase();

	const handleCardClick = () => {
		setSelectedMatches([game.id]);
		router.push('fanpool-find');
	};
	const [fanpoolCount, setFanpoolCount] = useState<string>();
	useEffect(() => {
		const getFanpoolCount = async () => {
			const response = await getGameFanpoolCount(game.id);
			setFanpoolCount(response.id);
		};
		getFanpoolCount();
	}, []);
	return (
		<div
			className="w-full rounded-12pxr"
			style={{ boxShadow: '0px 0px 11px 0px rgba(0, 0, 0, 0.11)' }}
		>
			<section className="relative w-full flex flex-col rounded-t-12pxr overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
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
						<TagFanPool
							type={myTeam === game.homeTeam.name ? 'HOME' : 'AWAY'}
						/>
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
			<section
				className="flex justify-between items-center bg-white px-14pxr py-12pxr rounded-b-12pxr cursor-pointer"
				onClick={handleCardClick}
			>
				<div className="w-16pxr" />
				<Text fontSize={14} fontWeight={500} color="kboNavy">
					현재 팬풀{fanpoolCount}건
				</Text>
				<IconRightArrow />
			</section>
		</div>
	);
}
