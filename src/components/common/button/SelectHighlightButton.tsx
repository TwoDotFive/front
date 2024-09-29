import React from 'react';
import { teams } from '@/constants/teams';
import { Text } from '../Text';
import Image from 'next/image';

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
			className={`w-full flex flex-col items-center justify-center rounded-8pxr px-16pxr py-16pxr gap-8pxr cursor-pointer ${
				isSelected ? 'bg-kboBlue100 border border-kboBlue400' : 'bg-gray050'
			}`}
			onClick={onClick}
		>
			<Image
				width={71}
				height={46}
				alt=""
				src={`/images/${
					text === '차량공유' ? 'image_carshare.png' : 'image_taxi.png'
				}`}
			/>
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
