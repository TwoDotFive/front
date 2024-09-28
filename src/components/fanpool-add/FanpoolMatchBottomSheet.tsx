import React, { useState, useEffect, useRef } from 'react';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';

interface FanpoolMatchBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	onDateSelect: (date: Date) => void;
}

export const FanpoolMatchBottomSheet = ({
	isVisible,
	onClose,
	onDateSelect,
}: FanpoolMatchBottomSheetProps) => {
	return (
		<BottomSheet isVisible={isVisible} onClose={onClose}>
			<div className="-px-8pxr">
				<Text fontSize={16} fontWeight={700} color="gray700">
					경기(3)
				</Text>
			</div>
		</BottomSheet>
	);
};
