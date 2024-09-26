'use client';
import { useState } from 'react';
import { teams } from '@/constants/teams';
import Image from 'next/image';
import { Text } from '../common/Text';
import { IconHamburger, IconPerson } from '@/public/icons';
import Drawer from './Drawer/Drawer';
import SelectTeamBottomSheet from './SelectTeamBottomSheet';
import { useUserStore } from '@/store/useUserStore';

export default function TeamHeader() {
	const { userProfile } = useUserStore();
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);

	const toggleDrawer = () => {
		setIsDrawerVisible(!isDrawerVisible);
	};

	// userProfile이 업데이트되면 해당 팀 찾기
	const team = teams.find((team) => team.id === userProfile?.favoriteTeam?.id);
	const name = team ? team.name : '응원하는 팀이 <br /> 아직 없어요!';
	const imageUrl = team
		? `/images/${team.code}_bg.png`
		: '/images/noteam_bg.png';
	const count = team ? 2 : 0;

	const handleButtonClick = () => {
		setIsSheetOpen(true);
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	return (
		<>
			<section className="relative w-full">
				{/**
				 * Icon 영역
				 */}
				<section>
					<div className="absolute top-55pxr left-20pxr cursor-pointer">
						<IconHamburger onClick={toggleDrawer} />
					</div>
					<div className="absolute top-55pxr right-20pxr cursor-pointer">
						<IconPerson />
					</div>
				</section>
				{/**
				 * Info 영역
				 */}
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
