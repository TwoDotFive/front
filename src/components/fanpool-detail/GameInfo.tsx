import React, { useState } from 'react';
import GameCard from './GameCard';
import { IconLeftArrowWhite, IconMoreWhite } from '@/public/icons';
import { useRouter } from 'next/navigation';
import { FanpoolInformation } from '@/types/types';
import { FanpoolDetailBottomSheet } from './FanpoolDetailBottomSheet';

interface GameInfoProps {
	fanpoolInformation: FanpoolInformation;
}

export default function GameInfo({ fanpoolInformation }: GameInfoProps) {
	const isHost =
		fanpoolInformation.hostUserId.toString() == localStorage.getItem('userId');

	const router = useRouter();
	const [menuVisible, setMenuVisible] = useState(false);
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
				{isHost ? (
					<div
						className="w-25pxr cursor-pointer"
						onClick={() => {
							setMenuVisible(true);
						}}
					>
						<IconMoreWhite />
					</div>
				) : (
					<div className="w-25pxr h-24pxr" />
				)}
			</div>
			<div className="px-20pxr">
				<GameCard game={fanpoolInformation.game} />
				{/* GameCard에 게임 정보 전달 */}
			</div>
			<div className="h-24pxr" />
			<FanpoolDetailBottomSheet
				isVisible={menuVisible}
				onClose={() => setMenuVisible(false)}
				fanpoolId={fanpoolInformation.id}
			/>
		</section>
	);
}
