import React from 'react';
import { IconRadioSelected, IconRadioDefault } from '@/public/icons';

type RadioButtonProps = {
	isSelected: boolean;
	onClick: () => void;
};

export const RadioButton = ({ isSelected, onClick }: RadioButtonProps) => {
	return (
		<div
			className="w-full h-full flex items-center cursor-pointer"
			onClick={onClick}
		>
			{isSelected ? (
				<IconRadioSelected className="w-16pxr h-16pxr" />
			) : (
				<IconRadioDefault className="w-16pxr h-16pxr" />
			)}
		</div>
	);
};
