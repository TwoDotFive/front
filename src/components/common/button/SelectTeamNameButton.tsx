import React from 'react';
import { teams } from '@/constants/teams';
import { Text } from '../Text';
import { IconCheck } from '@/public/icons';

type SelectTeamNameButtonProps = {
	code: string;
	isSelected?: boolean;
	onClick?: () => void;
};

export default function SelectTeamNameButton({
	code,
	isSelected = false,
	onClick,
}: SelectTeamNameButtonProps) {
	const team = teams.find((team) => team.code === code);

	if (!team) {
		return (
			<div
				className={`relative w-fit h-fit flex justify-center items-center rounded-4pxr px-10pxr py-4pxr cursor-pointer ${
					isSelected
						? 'bg-kboBlue0 border border-kboBlue400'
						: 'bg-white border border-gray200'
				}`}
				onClick={onClick}
			>
				<Text
					fontSize={14}
					fontWeight={isSelected ? 700 : 400}
					color={isSelected ? 'kboBlue500' : 'gray600'}
					className="whitespace-nowrap text-center"
				>
					모든 팀
				</Text>
			</div>
		);
	}

	return (
		<div
			className={`relative w-fit h-fit flex flex-col items-center rounded-4pxr px-10pxr py-4pxr gap-2pxr cursor-pointer ${
				isSelected
					? 'bg-kboBlue0 border border-kboBlue400'
					: 'bg-white border border-gray200'
			}`}
			onClick={onClick}
		>
			<Text
				fontSize={14}
				fontWeight={600}
				color={isSelected ? 'kboBlue500' : 'gray600'}
				className="whitespace-nowrap"
			>
				{team.name}
			</Text>
		</div>
	);
}
