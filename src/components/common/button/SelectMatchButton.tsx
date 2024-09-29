import React from 'react';
import { Text } from '../Text';
import { IconCheckNavy } from '@/public/icons';
import Image from 'next/image';
import { teams } from '@/constants/teams';

export interface teamsType {
	code: string;
	name: string;
	area: string;
}

type Team = {
	id: number;
	name: string;
	representativeImageUrl: string;
	stadiumName: string;
	stadiumAliasName: string;
};

type Game = {
	id: number;
	awayTeam: Team;
	homeTeam: Team;
	startDate: string;
	stadium: string;
};

type SelectMatchButtonProps = {
	game: Game;
	isSelected?: boolean;
	onClick?: () => void;
};

export default function SelectMatchButton({
	game,
	isSelected = false,
	onClick,
}: SelectMatchButtonProps) {
	const date = new Date(game.startDate);
	const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일 ${date
		.getHours()
		.toString()
		.padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

	const homeInfo = teams.find((team) => team.name === game.homeTeam.name);
	const awayInfo = teams.find((team) => team.name === game.awayTeam.name);

	return (
		<div
			className={`relative w-full flex flex-col items-start rounded-8pxr px-20pxr py-12pxr gap-6pxr cursor-pointer ${
				isSelected
					? 'bg-kboBlue0 border border-kboBlue400'
					: 'bg-white border border-gray200'
			}`}
			onClick={onClick}
		>
			<div className="flex gap-2pxr">
				<Text
					fontSize={14}
					fontWeight={700}
					color={isSelected ? 'gray700' : 'gray500'}
				>
					{formattedDate}
				</Text>
				<Text
					fontSize={14}
					fontWeight={500}
					color={isSelected ? 'gray700' : 'gray500'}
				>
					{game.stadium}
				</Text>
			</div>
			<div className="w-full flex items-center justify-between">
				<div className="flex gap-2pxr items-center">
					{homeInfo && (
						<Image
							src={`/images/${homeInfo.code}.png`}
							alt={homeInfo.name}
							width={28}
							height={28}
						/>
					)}
					<Text
						fontSize={14}
						fontWeight={700}
						color={isSelected ? 'gray700' : 'gray600'}
					>
						{game.homeTeam.name}
					</Text>
				</div>
				<Text fontSize={14} fontWeight={400} color="gray700">
					vs
				</Text>
				<div className="flex gap-2pxr items-center">
					<Text
						fontSize={14}
						fontWeight={700}
						color={isSelected ? 'gray700' : 'gray600'}
					>
						{game.awayTeam.name}
					</Text>
					{awayInfo && (
						<Image
							src={`/images/${awayInfo.code}.png`}
							alt={awayInfo.name}
							width={28}
							height={28}
						/>
					)}
				</div>
			</div>
			{isSelected && (
				<div className="absolute right-12pxr top-10pxr">
					<IconCheckNavy />
				</div>
			)}
		</div>
	);
}
