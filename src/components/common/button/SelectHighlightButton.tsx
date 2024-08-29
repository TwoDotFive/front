import React from 'react';
import { teams } from '@/constants/teams';
import { Text } from '../Text';

type SelectHighlightButtonProps = {
	text: string;
	isSelected?: boolean;
	onClick?: () => void;
};

export default function SelectHighlightButton({
	text,
	isSelected = false,
	onClick,
}: SelectHighlightButtonProps) {
	return (
		<div
			className={`w-full h-50pxr flex flex-col items-center justify-center rounded-8pxr px-16pxr py-11pxr gap-2pxr cursor-pointer ${
				isSelected ? 'bg-kboBlue100 border border-kboBlue400' : 'bg-gray050'
			}`}
			onClick={onClick}
		>
			<Text
				fontSize={16}
				fontWeight={500}
				color={isSelected ? 'kboBlue500' : 'gray700'}
				className="whitespace-nowrap"
			>
				{text}
			</Text>
		</div>
	);
}
