import React from 'react';
import GameCard from './GameCard';
import { IconLeftArrowWhite } from '@/public/icons';
import { useRouter } from 'next/navigation';
import { Game } from '@/types/types';

interface GameInfoProps {
	game: Game;
}

export default function GameInfo({ game }: GameInfoProps) {
	const router = useRouter();
	return (
		<section
			className="w-full relative bg-cover bg-center"
			style={{ backgroundImage: "url('/images/image_detail_background.png')" }}
		>
			<div className="w-full h-46pxr flex items-center px-12pxr justify-between">
				<IconLeftArrowWhite
					className="cursor-pointer"
					onClick={() => {
						router.back();
					}}
				/>
				<div className="w-25pxr h-24pxr" />
			</div>
			<div className="px-20pxr">
				<GameCard game={game} /> {/* GameCard에 게임 정보 전달 */}
			</div>
			<div className="h-24pxr" />
		</section>
	);
}
