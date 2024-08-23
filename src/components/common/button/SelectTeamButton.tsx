import React from 'react';
import { teams } from '@/constants/teams';
import { Text } from '../Text';
import { IconCheck } from '@/public/icons';

type SelectTeamButtonProps = {
	code: string;
	isSelected?: boolean;
	onClick?: () => void;
};

export default function SelectTeamButton({
	code,
	isSelected = false,
	onClick,
}: SelectTeamButtonProps) {
	const team = teams.find((team) => team.code === code);

	if (!team) {
		return (
			<div
				className={`relative w-full h-102pxr flex justify-center items-center rounded-8pxr px-16pxr py-11pxr gap-2pxr cursor-pointer ${
					isSelected ? 'bg-kboBlue100' : 'bg-gray050'
				}`}
				onClick={onClick}
			>
				<Text
					fontSize={14}
					fontWeight={400}
					color={isSelected ? 'kboBlue900' : 'gray700'}
					className="whitespace-nowrap text-center"
				>
					아직 응원하는
					<br />
					팀이 없어요
				</Text>
				{isSelected && (
					<div className="absolute right-9pxr top-10pxr">
						<IconCheck />
					</div>
				)}
			</div>
		);
	}

	return (
		<div
			className={`relative w-full h-102pxr flex flex-col items-center rounded-8pxr px-16pxr py-11pxr gap-2pxr cursor-pointer ${
				isSelected ? 'bg-kboBlue100 border border-kboBlue400' : 'bg-gray050'
			}`}
			onClick={onClick}
		>
			<div className="flex items-center justify-center w-50pxr h-50pxr">
				<img src={`/images/${team.code}.png`} alt={team.name} />
			</div>
			<Text
				fontSize={14}
				fontWeight={600}
				color={isSelected ? 'kboBlue900' : 'gray700'}
				className="whitespace-nowrap"
			>
				{team.name}
			</Text>
			{isSelected && (
				<div className="absolute right-9pxr top-10pxr">
					<IconCheck />
				</div>
			)}
		</div>
	);
}
