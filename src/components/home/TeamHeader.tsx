'use client';
import { useState } from 'react';
import { teams } from '@/constants/teams';
import Image from 'next/image';
import { Text } from '../common/Text';
import { IconHamburger, IconPerson } from '@/public/icons';
import Drawer from './Drawer/Drawer';
import SelectTeamBottomSheet from './SelectTeamBottomSheet';
import { useUserStore } from '@/store/useUserStore';
import { UserProfileResponse } from '@/types/types';
import { useRouter } from 'next/navigation';

interface TeamHeaderProps {
	gameSchedule: { games: any[]; numberOfGame: number } | null;
	userProfile: UserProfileResponse;
}

export default function TeamHeader({
	gameSchedule,
	userProfile,
}: TeamHeaderProps) {
	const router = useRouter();
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);

	const toggleDrawer = () => {
		setIsDrawerVisible(!isDrawerVisible);
	};

	const team = teams.find((team) => team.id === userProfile?.favoriteTeam?.id);
	const name = team ? team.name : '응원하는 팀이 <br /> 아직 없어요!';
	const imageUrl = team
		? `/images/${team.code}_bg.png`
		: '/images/noteam_bg.png';
	const count = gameSchedule ? gameSchedule.numberOfGame : 0; // gameSchedule에서 경기 수 가져오기

	const handleButtonClick = () => {
		setIsSheetOpen(true);
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	return (
		<>
			<section className="relative w-full">
				<section>
					<div className="absolute top-55pxr left-20pxr cursor-pointer">
						<IconHamburger onClick={toggleDrawer} />
					</div>
					<div className="absolute top-55pxr right-20pxr cursor-pointer">
						<div onClick={() => router.push('/profile')}>
							<IconPerson />
						</div>
					</div>
				</section>
				<Image
					src={imageUrl}
					width={399}
					height={0}
					alt={name}
					className="w-full h-auto object-contain"
				/>
				<div
					className="absolute flex flex-col gap-[6vw]"
					style={{
						top: 'calc(50% + 40px)',
						left: '20px',
						transform: 'translateY(-50%)',
					}}
				>
					<span>
						<Text fontWeight={700} color="white" fontSize={24}>
							{name === '응원하는 팀이 <br /> 아직 없어요!' ? (
								<>
									응원하는 팀이 <br /> 아직 없어요!
								</>
							) : (
								name
							)}
						</Text>
						<Text fontWeight={500} color="white" fontSize={24}>
							{team ? `이번 주 경기 ${count}개` : ''}
						</Text>
					</span>
					<span>
						<Text
							fontWeight={400}
							color="white"
							fontSize={14}
							className="cursor-pointer"
							onClick={handleButtonClick}
						>
							{team ? '관심 팀 수정하기' : '응원 팀 등록하기'}
						</Text>
					</span>
				</div>
				<Drawer isVisible={isDrawerVisible} onClose={toggleDrawer} />
			</section>
			<SelectTeamBottomSheet isOpen={isSheetOpen} onClose={handleCloseSheet} />
		</>
	);
}
